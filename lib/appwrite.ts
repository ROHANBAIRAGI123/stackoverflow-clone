// lib/appwrite.ts

import { Client, Account, TablesDB, Avatars,Storage,Databases } from "appwrite";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const avatars = new Avatars(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

console.log("Appwrite Client Configured:");
export { ID } from "appwrite";
export { client };