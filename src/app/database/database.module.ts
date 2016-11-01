const app = require('electron').remote.app;

const Datastore = require('nedb');
const path = require('path');

let dbs = ['cards'];
export const db = dbs.reduce((result: any, db_name: string) => {
    result[db_name] = new Datastore({ filename: path.join(app.getPath("appData"), app.getName(), `${db_name}.db`), autoload: true });
    return result;
}, {});