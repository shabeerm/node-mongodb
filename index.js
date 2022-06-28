require('./config.js');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = `mongodb+srv://conFusion:${DB_PASS}@confusion.lnvgz.mongodb.net/?retryWrites=true&w=majority`
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection("dishes");
    collection.insertOne({ "name": "Uthappizza", "description": "test" },
        (err, result) => {
            assert.equal(err, null);

            console.log("After Insert:\n");
            console.log(result);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);

                console.log("Found:\n");
                console.log(docs);

                db.dropCollection("dishes", (err, result) => {
                    assert.equal(err, null);

                    client.close();
                });
            });
        });

});