import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import path from 'path';
import { getDbConnection } from '../db.js';
import { ObjectId } from 'mongodb';
import { fileURLToPath } from 'url';

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const tabChange = {
    path: '/api/tabChange/',
    method: 'post',
    handler: async (req, res) => {
        let reszieImg = null;
        const { authorization } = req.headers;
        const { docuId } = req.body;

        const __filename__path = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename__path);

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
                let __filename = "";
                let saveData = { ...req.body };

                if (req.body.data && req.body.data.hasOwnProperty("img")) {
                    __filename = `img/${_id}-${docuId}-${makeid(20)}.jpg`;
                    let __saveName = path.join(__dirname, `../../` + __filename);
                    reszieImg = "executed";
                    let imgUri = req.body.data.img.split(';base64,').pop();
                    reszieImg = await sharp(Buffer.from(imgUri, 'base64')).resize({ width: 1200 }).toFormat('jpeg').jpeg({
                        quality: 90,
                        force: true,
                    }).toFile(__saveName, function (err, info) {

                    });
                    delete saveData["data"]["img"];
                }

                const db = getDbConnection(process.env.API_DB_NAME);

                const result = await db.collection("documentations").findOneAndUpdate(
                    {
                        "_id": ObjectId(docuId),
                        "authorId": _id
                    },
                    { $push: { steps: { img: __filename, ...saveData } } },
                    { returnOriginal: false }
                );


                res.status(200).json({ message: "saved" })
            })
    }
}