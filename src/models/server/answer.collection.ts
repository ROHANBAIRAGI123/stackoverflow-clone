import { Permission, Role } from "node-appwrite";
import { answerCollection, db } from "../name";
import { tablesDB } from "./config";

export default async function createAnswerCollection() {
    // Creating Table (Collection)
    await tablesDB.createTable({
        databaseId: db,
        tableId: answerCollection,
        name: answerCollection,
        permissions: [
            Permission.create(Role.users()),
            Permission.read(Role.any()),
            Permission.read(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]
    });
    console.log("Answer Table Created");

    // Creating Columns (Attributes)
    await Promise.all([
        tablesDB.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "content",
            size: 10000,
            required: true,
        }),
        tablesDB.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "questionId",
            size: 50,
            required: true,
        }),
        tablesDB.createStringColumn({
            databaseId: db,
            tableId: answerCollection,
            key: "authorId",
            size: 50,
            required: true,
        }),
    ]);
    console.log("Answer Columns Created");
}
