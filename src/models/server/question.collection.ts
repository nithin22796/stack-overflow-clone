import { IndexType, Permission } from "node-appwrite";
import { DB, QUESTION_COLLECTION } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
  // Creating collection
  await databases.createCollection(
    DB,
    QUESTION_COLLECTION,
    QUESTION_COLLECTION,
    [
      Permission.read("any"),
      Permission.read("users"),
      Permission.create("users"),
      Permission.update("users"),
      Permission.delete("users"),
    ]
  );
  console.log("Question collection created!!");

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(
      DB,
      QUESTION_COLLECTION,
      "title",
      100,
      true,
      "Default Title"
    ),
    databases.createStringAttribute(
      DB,
      QUESTION_COLLECTION,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(
      DB,
      QUESTION_COLLECTION,
      "authorId",
      50,
      true
    ),
    databases.createStringAttribute(
      DB,
      QUESTION_COLLECTION,
      "tags",
      50,
      true,
      undefined,
      true
    ),
    databases.createStringAttribute(
      DB,
      QUESTION_COLLECTION,
      "attachementId",
      50,
      false
    ),
  ]);

  console.log("Question Attributes created!!");

  // Create Indexes
  await Promise.all([
    databases.createIndex(
      DB,
      QUESTION_COLLECTION,
      "title",
      IndexType.Fulltext,
      ["title"],
      ["asc"]
    ),
    databases.createIndex(
      DB,
      QUESTION_COLLECTION,
      "content",
      IndexType.Fulltext,
      ["content"],
      ["asc"]
    ),
  ]);
}
