const fs = require('fs');
const path = require('path');

const DB_FOLDER_PATH = './database/';
const DB_PREFIX = '.db';
const DEV_DB_PREFIX = '_dev.db';

function createDevDB() {
    console.log('> Creating dev database...');
    const content = fs.readdirSync(DB_FOLDER_PATH);

    if (isDevDBExist(content)) {
        console.log('> Dev database already exist.');
    } else {
        if (content && content.length > 0) {
            content.forEach(file => {
                if (file.endsWith(DB_PREFIX)) {
                    let fileName = file.split('.');
                    fileName = `${fileName[0]}${DEV_DB_PREFIX}`;
                    fs.copyFile(path.join(DB_FOLDER_PATH, file), path.join(DB_FOLDER_PATH, fileName), error => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log('> Dev database was created.')
                        }
                    });
                }
            })
        }
    }
}

function isDevDBExist(content) {
    let result = false;
    content.forEach(file => {
        if (file.endsWith(DEV_DB_PREFIX)) {
            result = true;
        }
    });
    return result;
}

createDevDB();
