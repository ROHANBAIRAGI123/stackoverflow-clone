import { db } from "../name";
import { tablesDB } from "./config";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import getOrCreateStorage from "./storage.collection";

export default async function getOrCreateDB() {
    //check if database exists
    try {
        await tablesDB.get({ databaseId: db });
        console.log(`Database ${db} already exists`);
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
                getOrCreateStorage(),
            ]);

            console.log("All tables and storage created");
        } catch (error) {
            console.error("Error creating database:", error);
        }
    }
    return db;
}