import { db } from "../name";
import { tablesDB } from "./config";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

let dbInitialized = false;

export default async function getOrCreateDB() {
    // Return early if already initialized
    if (dbInitialized) {
        return db;
    }

    //check if database exists
    try {
        await tablesDB.get({ databaseId: db });
        console.log(`Database ${db} connected`);
        dbInitialized = true;
    }
    catch (error) {
        //create database
        try {
            await tablesDB.create({
                databaseId: db,
                name: db,
            });
            console.log(`Database ${db} created`);

            // Create all collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ]);

            console.log("All tables and storage created");
            dbInitialized = true;
        } catch (error) {
            console.error("Error creating database:", error);
        }
    }
    return db;
}