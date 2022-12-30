/* eslint-disable no-console */
/* eslint-disable no-throw-literal */
const { MongoClient, ServerApiVersion } = require('mongodb');

const USERNAME = 'root';
const PASSWORD = 'jan2022%40Nua361';

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@oumuamua-nodejs-zero-to.kjztxqp.mongodb.net/shop?retryWrites=true&w=majority`;

// eslint-disable-next-line no-underscore-dangle
let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  }).then((client) => {
    console.log('Connected');
    _db = client.db();
    cb();
  }).catch((err) => {
    console.error(new Error(err));
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database connection available';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
