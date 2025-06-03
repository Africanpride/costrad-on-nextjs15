// lib/seedCollection.ts
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

export async function seedCollection(collectionName: string) {
  // Construct the path to the JSON file (e.g., data/institutes_mongo.json)
  const dataPath = path.join(process.cwd(), "data", `${collectionName}_mongo.json`);

  // Check if the file exists
  if (!fs.existsSync(dataPath)) {
    throw new Error(`Data file for ${collectionName} not found.`);
  }

  // Read and parse the JSON file
  let data;
  try {
    const fileContent = fs.readFileSync(dataPath, "utf8");
    data = JSON.parse(fileContent);
  } catch (err) {
    const errorMessage =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : String(err);
    throw new Error(`Error reading or parsing data file for ${collectionName}: ${errorMessage}`);
  }

  // Connect to MongoDB
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection(collectionName);

    // Check if the collection is empty
    const count = await collection.countDocuments();
    if (count === 0) {
      // Remove _id fields to let MongoDB generate new ObjectIds
      const documentsToInsert = (data as Array<{ _id?: any; [key: string]: any }>).map(({ _id, ...rest }) => rest);
      await collection.insertMany(documentsToInsert);
      console.log(`${collectionName} seeded.`);
    } else {
      console.log(`${collectionName} already exists.`);
    }
  } finally {
    // Ensure the client is closed even if an error occurs
    await client.close();
  }
}