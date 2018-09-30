const db = require('./db.json');
const {writeFile} = require('fs');

const get = ()=> db;

const set = (data, callback)=> 
    writeFile(`${__dirname}/db.json`, JSON.stringify(data), 'utf8', callback);

module.exports = {get, set};
