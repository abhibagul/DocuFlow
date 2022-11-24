import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export const deleteDocum = {
    path: '/api/delete/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;
        const { id, documentId } = req.body;

        if (!authorization) {
            return res.status(401).json({ message: "No Authorization header sent." })
        }

        // bearer [Token] <=== need this
        const token = authorization.split(" ")[1];

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: "Unable to verify user" });

                const { id: _id } = decoded;

                if (req.body.id != _id) {
                    res.status(401).json({ message: "Unauthorized user" });
                    return;
                }

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("documentations").deleteOne(
                    {
                        "_id": ObjectId(documentId),
                        "authorId": _id
                    }
                );

                // console.log(updateWebId, pageId, webId, checkdata, webId.toString())

                res.status(200).json({ message: "Documentation Deleted", data: result })

            }
        )


    }
}