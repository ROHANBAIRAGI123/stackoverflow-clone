import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

let storageInitialized = false;

export default async function getOrCreateStorage() {
    // Return early if already initialized
    if (storageInitialized) {
        return;
    }

    try {
        await storage.getBucket({ bucketId: questionAttachmentBucket });
        console.log("Storage Connected");
        storageInitialized = true;
    } catch (error) {
        try {
            await storage.createBucket({
                bucketId: questionAttachmentBucket,
                name: questionAttachmentBucket,
                permissions: [
                    Permission.create("users"),
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                fileSecurity: false,
                enabled: true,
                maximumFileSize: undefined,
                allowedFileExtensions: ["jpg", "png", "gif", "jpeg", "webp", "heic"],
                compression: undefined,
                encryption: true,
                antivirus: true,
            });

            console.log("Storage Created");
            console.log("Storage Connected");
            storageInitialized = true;
        } catch (error) {
            console.error("Error creating storage:", error);
        }
    }
}
