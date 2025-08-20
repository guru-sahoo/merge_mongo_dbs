# merge_mongo_dbs

🚀 Node.js script to merge data between MongoDB databases.  
It copies all collections and documents from one database into another **without replacing existing data**.  
Duplicate `_id` records are automatically skipped, ensuring safe merging.

---

## ✨ Features

- Merge all collections from **source DB** into **target DB**.
- Skips duplicate `_id` documents automatically.
- Works with **local or remote MongoDB URIs**.
- Easy to customize and extend.

---

## ⚙️ Setup & Usage

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/merge_mongo_dbs.git
   cd merge_mongo_dbs

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Edit the database names and URI inside mergeDBs.js:

   ```bash
   const uri = "mongodb://localhost:27017"; // MongoDB connection URI
   const sourceDB = client.db("waGrpAuto1"); // Source DB
   const targetDB = client.db("waGrpAuto");  // Target DB

   ```

4. Run the script:
   ```bash
   node app.js
   ```

## 🛠 Example Output

    ```bash
    Processing collection: users
    Merged 152 docs into users
    Processing collection: messages
    Merged 320 docs into messages
    MongoDB connection closed.

## mongodb commands

    ```bash
    mongodump --db=waGrpsAuto --out=C:\dbBckups
    mongorestore --db waGrpsAuto C:\dbBckups\db
