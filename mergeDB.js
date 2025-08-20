const { MongoClient } = require("mongodb");

async function mergeDBs() {
  const uri = "mongodb://localhost:27017"; // change if your MongoDB URI is different
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const sourceDB = client.db("waGrpsAuto1");
    const targetDB = client.db("waGrpsAuto");

    const collections = await sourceDB.listCollections().toArray();

    for (const { name } of collections) {
      console.log(`🔄 Processing collection: ${name}`);

      const sourceColl = sourceDB.collection(name);
      const targetColl = targetDB.collection(name);

      // Fetch all documents from source
      const docs = await sourceColl.find().toArray();

      if (docs.length === 0) {
        console.log(`⚠️ No docs in ${name}, skipping...`);
        continue;
      }

      try {
        // Insert with "ordered:false" to continue even if some docs fail (due to duplicate keys)
        await targetColl.insertMany(docs, { ordered: false });
        console.log(`✅ Merged ${docs.length} docs into ${name}`);
      } catch (err) {
        if (err.code === 11000) {
          console.warn(
            `⚠️ Duplicate key error while inserting into ${name}, skipped duplicates`
          );
        } else {
          console.error(`❌ Error inserting into ${name}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("❌ Failed to merge DBs:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed.");
  }
}

mergeDBs();
