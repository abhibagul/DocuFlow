import express from 'express';
import path from 'path';
import { routes } from './routes/index.js';
import { initializeDbConnection } from './db.js';
import fs from 'fs';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../build')))
// app.use(express.bodyParser({ limit: '50mb' }));

app.get(/^(?!\/api).+/, (req, res) => {

    console.log(req.originalUrl);
    //if image file exist
    if (fs.existsSync(path.join(__dirname, '../' + req.originalUrl)) && req.originalUrl.startsWith('/img/')) {
        res.sendFile(path.join(__dirname, '../' + req.originalUrl))
        return;
    }

    res.sendFile(path.join(__dirname, '../build/index.html'))
    // res.status(200).json({ message: "Project under development" });

})

// app.get(/(?!\/img).+/, (req, res) => {
//     console.log(req);
//     res.sendFile(path.join(__dirname, '../img/'))

// })

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });