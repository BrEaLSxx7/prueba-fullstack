const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./../config");
const client = new MongoClient(config.uri);

class Conector{
    async get(collection,query,options) {
        
        await client.connect();
        const database = client.db("sample_mflix");
        const rows = database.collection(collection);
        const cursor =  rows.find(query,{projection:options.projection})
                        .sort({poster:-1})
                        .skip(parseInt(options.skip))
                        .limit(parseInt(options.limit));
        var data = [];
        if ((await rows.countDocuments(query)) != 0) {
        for await (const doc of cursor) {
            data.push(doc)
        }
        }
        await client.close();
        return data;
    }
    async count(collection){
        await client.connect();
        const database = client.db("sample_mflix");
        const rows = database.collection(collection);
        let count = await rows.countDocuments({});
        
        await client.close();
        return count;
    }
}

module.exports = new Conector();