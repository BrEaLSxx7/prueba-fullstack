const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./../config");
const client = new MongoClient(config.uri);

class Conector{
    async get(collection,query,options) {
        
        await client.connect();
        const database = client.db("sample_mflix");
        const movies = database.collection(collection);
        const cursor =  movies.find(query,{projection:options.projection})
                        .sort({_id:-1})
                        .skip(parseInt(options.skip))
                        .limit(parseInt(options.limit));
        var data = [];
        if ((await movies.countDocuments(query)) != 0) {
        for await (const doc of cursor) {
            data.push(doc)
        }
        }
        
        await client.close();
        return data;
    }
}

module.exports = new Conector();