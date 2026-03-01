
const { MongoClient } = require('mongodb');
const { CallTracker } = require('assert/strict');

const uri = 'mongodb+srv://zhizhi:p09oi8@patuadb.8o6zlho.mongodb.net/?appName=PatuaDB';
const client = new MongoClient(uri);

const myDbName = 'laporan';
const colName = 'daily_data';

const database = client.db(myDbName);
const collections = database.collection(colName);

module.exports = {client, collections};