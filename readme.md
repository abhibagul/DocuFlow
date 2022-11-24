# DocuFlow : Convertes any process into a step-by-step guide

![DocuFlow](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUYQfD1TyUx0YjMHQXmWhZIE9F5XOFy0jS1PsE8t41HQMYKL6IPvyu5YyAgdtzsxujpfsJkhpCGQZMvyV2R_JHRmwLCY6w_zJjL4Lt52FR28kQ8UE1qC3aSBLbDVUtlubK02afcd_Efb407KX3uUt3HrPYJDXYlxWezJIRYuSyTq4esmJUdS0nBlKs/s1600/homepage.JPG)
React website along with chrome plugin to help you easily make the documentations. It records your process, clicks, copy paste navigation etc and creates a step by step documentation to follow.

## Demo: https://docuflow.onrender.com/

### Creates step-by-step guide Like this,

![DocuFlowDocument](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoUhvMVXMmVvV4_VA5NjE-G4mPO5QB6ulgub5e8blYw3zplVoNUxs4Ag694yrHS8CISSmpyHpTfEfO3fZ2Spez1e7I0jwmHt3IkO0S-3WGweB-8pPi-S2tcwFfbiJRmqbMz-MuCMlpoRrNk8mLWh9RgnB14YsDF3C5AoHFF-MYJplJQ3mY4pcIdfX3/s400/Capture.JPG)

## Features

- Records various actions and convert it into step by step documentation.
- Provides click position and (link on which it has been clicked on.)
- Edit the steps
- Publish documentation to make it public
- Sharable links are different then preview link
- Records copy, cut and paste actions.

## How to use

## Chrome plugin

- As the plugin is not sent to chrome store, you will need to manually install it.
- For that follow the link below:
  https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/

### Frontend

1. `npm install -y` to install the required dependecies.
2. `npm run build` to create a build version of the front-end.
3. (If you want to modify the frontend you can`npm start` the frontend and `npm run dev` for the backend)

### Backend

1. Copy the build folder generated into the backend folder.
2. `cd backend/` go in the backend folder.
3. `npm install -y` to install the dependencies
4. Create the `.env` file in the directory with the following details.<br/>
   ` JWT_SECRET=" [RANDOM STRING USED TO CREATE JWT TOKEN ]"`<br/>
   `PORT=8000`<br/>
   `API_DB_NAME="[ DB NAME ]"`<br/>
   `API_LOGIN_PERIOD="2d"`<br/>
   `API_MONGO_URI="[ add the uri for the mongo db ]"`<br/>
   `API_MONGO_PASS="[ NO NEED REMOVED ]"`<br/>
   `API_MONGO_USER="[ NO NEED REMOVED ]"`<br/>
5. `npm run dev` to run on a local machine. For deployment use `node ./src/server.js`
6. It should be available on the port 8000.
