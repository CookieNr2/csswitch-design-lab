// Loads the catalogue the configurator needs, colours and switch parts, into the
// database named by MONGODB_URI. A collection that already holds documents is
// left untouched, so running it twice is harmless.
//
//   npm run seed                                   uses MONGODB_URI from .env.local
//   MONGODB_URI="mongodb+srv://..." npm run seed   any other database
import { readFile } from "node:fs/promises";
import mongoose from "mongoose";

// Collection names used by the models in lib/server/models.
const COLLECTIONS = [
  { name: "colors", file: "colors.json" },
  { name: "switchparts", file: "switchparts.json" },
];

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Add it to .env.local or pass it inline.");
  process.exit(1);
}

await mongoose.connect(uri);

try {
  const db = mongoose.connection.db;

  for (const { name, file } of COLLECTIONS) {
    const collection = db.collection(name);

    if ((await collection.countDocuments({}, { limit: 1 })) > 0) {
      console.log(`${name}: already has documents, skipped`);
      continue;
    }

    // MongoDB Extended JSON, as Compass exports it: { "$oid": ... } becomes an ObjectId.
    const text = await readFile(new URL(`../data/${file}`, import.meta.url), "utf8");
    const documents = mongoose.mongo.BSON.EJSON.parse(text);
    await collection.insertMany(documents);
    console.log(`${name}: inserted ${documents.length} documents`);
  }
} finally {
  await mongoose.disconnect();
}
