const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const rootDir = require('../utils/path');
const p = path.join(
    rootDir,
    "data",
    "products.json"
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Product {
    constructor(id, title, image, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = uuidv4();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }

      static deleteById(id) {
        getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id);
          const updatedProducts = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              Cart.deleteProduct(id, product.price);
            }
          });
        });
      }
    
      static fetchAll(cb) {
        getProductsFromFile(cb);
      }
    
      static findById(id, cb) {
        getProductsFromFile(products => {
          const product = products.find(p => p.id === id);
          cb(product);
        });
      }
}
