import { getDbConnection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
export const createProject = {
    path: '/api/create-documentation/',
    method: 'post',
    handler: async (req, res) => {

        //get auth header from client
        const { authorization } = req.headers;

        const getNewWebsite = ({
            pages,
            websiteName
        }) => ({
            pages,
            websiteName,
            author: id,
            prevImgUri: "",
            published: false
        });

        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]

        //initial index page
        const indexPage = {
            authorId: null,
            projectName: "New Documentation - " + yourDate,
            documentCreated: new Date(),
            published: false,
            steps: []
        }



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

                indexPage.authorId = _id;

                const db = getDbConnection(process.env.API_DB_NAME);
                const result = await db.collection("documentations").insertOne(indexPage);

                //now add above page to the new website project
                const { insertedId: docuId } = result;

                // console.log(updateWebId, pageId, webId, checkdata, webId.toString())

                res.status(200).json({ message: "Documentation created", docuId })

            }
        )


    }
}