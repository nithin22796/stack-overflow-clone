import { IndexType, Permission } from "node-appwrite";
import { ANSWER_COLLECTION, DB } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  // Creating Collection
  await databases.createCollection(DB, ANSWER_COLLECTION, ANSWER_COLLECTION, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Answer Collection Created");

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(
      DB,
      ANSWER_COLLECTION,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      DB,
      ANSWER_COLLECTION,
      "questionId",
      50,
      true
    ),
    databases.createStringAttribute(
      DB,
      ANSWER_COLLECTION,
      "authorId",
      50,
      true
    ),
  ]);
  console.log("Answer Attributes Created");
}
