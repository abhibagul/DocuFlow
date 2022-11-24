import { getDbConnection } from '../db.js';
import { ObjectId } from 'mongodb';

export const guide = {
    path: '/api/guide/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { documentId } = req.body;

        const db = getDbConnection(process.env.API_DB_NAME);
        const result = await db.collection("documentations").findOne({ _id: ObjectId(documentId), published: true });

        res.status(200).json({ message: "Documentation fetched", data: result })

    }
}