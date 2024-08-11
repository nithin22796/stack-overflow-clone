import { Permission } from "node-appwrite";
import { DB, VOTE_COLLECTION } from "../name";
import { databases } from "./config";

export default async function createVOTE_COLLECTION() {
  // Creating Collection
  await databases.createCollection(DB, VOTE_COLLECTION, VOTE_COLLECTION, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Vote Collection Created");

  // Creating Attributes
  await Promise.all([
    databases.createEnumAttribute(
      DB,
      VOTE_COLLECTION,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(DB, VOTE_COLLECTION, "typeId", 50, true),
    databases.createEnumAttribute(
      DB,
      VOTE_COLLECTION,
      "voteStatus",
      ["upvoted", "downvoted"],
      true
    ),
    databases.createStringAttribute(DB, VOTE_COLLECTION, "voteDById", 50, true),
  ]);
  console.log("Vote Attributes Created");
}
