import {Client,Avatars,Storage,Databases, Users, TablesDB} from 'node-appwrite';

let client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!) // Your secret API key
;

const databases = new Databases(client);
const tablesDB = new TablesDB(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const users = new Users(client);

console.log("Appwrite Server SDK Configured");

export {client, databases, tablesDB, avatars, storage, users};