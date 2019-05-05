## To build for development

- **in a terminal window** -> npm start  

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window whitch can edit data in database. 
The Angular component contains an example of Electron, TypeORM and NodeJS native lib import.
If you need to add additional dependencies you shoud put it to `extra-webpack.config.js`.
You can desactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.
