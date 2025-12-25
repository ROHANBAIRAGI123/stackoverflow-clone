import {db,questionCollection} from '../name';
import { tablesDB } from './config';
import {IndexType, Permission, Role} from "node-appwrite"

export default async function createQuestionCollection() {
    //create table (collection)

    await tablesDB.createTable({
        databaseId: db,
        tableId: questionCollection,
        name: questionCollection,
        permissions: [
            Permission.read(Role.any()),
            Permission.read(Role.users()),
            Permission.create(Role.users()),
            Permission.update(Role.users()),
            Permission.delete(Role.users()),
        ]
    });
   console.log(`Table ${questionCollection} created`);
    
   await Promise.all([
       tablesDB.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: 'title',
            size: 255,
            required: true,
            array: false,
        }),
    
         tablesDB.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: 'content',
            size: 5000,
            required: true,
            array: false,
        }),
    
         tablesDB.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: 'authorId',
            size: 255,
            required: true,
            array: false,
        }),
    
          tablesDB.createStringColumn({
            databaseId: db,
            tableId: questionCollection,
            key: 'tags',
            size: 255,
            required: true,
            array: true,
        }),
        
         tablesDB.createStringColumn({
           databaseId: db,
           tableId: questionCollection,
           key: 'attachmentId',
           size: 255,
           required: false,
           array: false,
       })
   ]);
    console.log(`Column content created in ${questionCollection} table`);

    await Promise.all([
        tablesDB.createIndex({
            databaseId: db,
            tableId: questionCollection,
            key: 'title',
            type:IndexType.Fulltext,
            columns: ['title'],
        }),
        tablesDB.createIndex({
            databaseId: db,
            tableId: questionCollection,
            key: 'content',
            type: IndexType.Fulltext,
            columns: ['content'],
        }),
    ]);
    console.log(`Indexes created in ${questionCollection} table`);  
}