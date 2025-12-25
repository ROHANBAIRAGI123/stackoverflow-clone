import { Client, Account, TablesDB } from "appwrite";

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
console.log("Appwrite Client Configured:", 
    account.get());
export { ID } from "appwrite";
export { client };