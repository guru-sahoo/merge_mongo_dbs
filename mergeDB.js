require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

async function mergeDBs(sourceDbName, targetDbName) {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const sourceDB = client.db(sourceDbName);
    const targetDB = client.db(targetDbName);

    const collections = await sourceDB.listCollections().toArray();

    for (const { name } of collections) {
      console.log(`Processing collection: ${name}`);

      const sourceColl = sourceDB.collection(name);
      const targetColl = targetDB.collection(name);

      const docs = await sourceColl.find().toArray();

      if (docs.length === 0) {
        console.log(`⚠️ No docs in ${name}, skipping...`);
        continue;
      }

      try {
        await targetColl.insertMany(docs, { ordered: false });
        console.log(`Merged ${docs.length} docs into ${name}`);
      } catch (err) {
        err.code === 11000
          ? console.warn(
              `Duplicate key error while inserting into ${name}, skipped duplicates`
            )
          : console.error(`Error inserting into ${name}:`, err);
      }
    }
  } catch (err) {
    console.error("Failed to merge DBs:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

module.exports = mergeDBs;
