import { Permission } from "node-appwrite";
import { COMMENT_COLLECTION, DB } from "../name";
import { databases } from "./config";

export default async function createCOMMENT_COLLECTION() {
  // Creating Collection
  await databases.createCollection(DB, COMMENT_COLLECTION, COMMENT_COLLECTION, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Comment Collection Created");

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(
      DB,
      COMMENT_COLLECTION,
      "content",
      10000,
      true
    ),
    databases.createEnumAttribute(
      DB,
      COMMENT_COLLECTION,
      "type",
      ["answer", "question"],
      true
    ),
    databases.createStringAttribute(DB, COMMENT_COLLECTION, "typeId", 50, true),
    databases.createStringAttribute(
      DB,
      COMMENT_COLLECTION,
      "authorId",
      50,
      true
    ),
  ]);
  console.log("Comment Attributes Created");
}
