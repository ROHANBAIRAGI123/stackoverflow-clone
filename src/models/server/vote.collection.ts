import { Permission, Role } from "node-appwrite";
import { db, voteCollection } from "../name";
import { tablesDB } from "./config";

export default async function createVoteCollection() {
    // Creating Table (Collection)
    await tablesDB.createTable({
        databaseId: db,
        tableId: voteCollection,
        name: voteCollection,
        permissions: [
            Permission.create(Role.users()),
            Permission.read(Role.any()),
            Permission.read(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]
    });
    console.log("Vote Table Created");

    // Creating Columns (Attributes)
    await Promise.all([
        tablesDB.createEnumColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "type",
            elements: ["question", "answer"],
            required: true,
        }),
        tablesDB.createStringColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "typeId",
            size: 50,
            required: true,
        }),
        tablesDB.createEnumColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "voteStatus",
            elements: ["upvoted", "downvoted"],
            required: true,
        }),
        tablesDB.createStringColumn({
            databaseId: db,
            tableId: voteCollection,
            key: "votedById",
            size: 50,
            required: true,
        }),
    ]);
    console.log("Vote Columns Created");
}
