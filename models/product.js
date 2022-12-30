/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
const mongodb = require('mongodb');
const { getDb } = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      /** updateOne the product
       * https://www.geeksforgeeks.org/mongodb-updateone-method-db-collection-updateone/
       * {Selection_Criteria}, {$set:{Update_data}},
       * db.student.updateOne({name: "Annu"}, {$set:{age:25}})  */
      dbOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      /**
       * https://www.geeksforgeeks.org/mongodb-insertone-method-db-collection-insertone/
       */
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then((result) => {
        return result;
      }).catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
    /**
     * https://www.geeksforgeeks.org/mongodb-db-collection-find-method/?ref=gcse
     */
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log('Deleted', result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
