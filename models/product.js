const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const p = path.join(
    rootDir,
    "data",
    "products.json"
);

const getProductFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent))
        }
    });
}

module.exports = class Product {
    constructor(title, image, description, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            })
        })
    }

    static fetchAll(cb) {
        getProductFromFile(cb)
    }
}
