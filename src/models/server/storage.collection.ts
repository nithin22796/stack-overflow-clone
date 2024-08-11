import { Permission } from "node-appwrite";
import { ATTACHMENT_BUCKET } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(ATTACHMENT_BUCKET);
    console.log("Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        ATTACHMENT_BUCKET,
        ATTACHMENT_BUCKET,
        [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );

      console.log("Storage Created");
      console.log("Storage Connected");
    } catch (error) {
      console.error("Error creating storage:", error);
    }
  }
}
