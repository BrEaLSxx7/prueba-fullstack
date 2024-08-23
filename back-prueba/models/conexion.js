const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./../config");

class Conector {
    constructor() {
        this.client = new MongoClient(config.uri, {
            serverApi: ServerApiVersion.v1,
            useUnifiedTopology: true,
        });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
        this.database = this.client.db("sample_mflix");
    }

    async get(collection, query, options = {}) {
        await this.connect();
        const rows = this.database.collection(collection);

        const cursor = rows.find(query)
            .sort({ poster: -1 })
            .skip(parseInt(options.skip, 10))
            .limit(parseInt(options.limit, 10));

        const data = await cursor.toArray();
        return data;
    }

    async count(collection, query = {}) {
        await this.connect();
        const rows = this.database.collection(collection);
        const count = await rows.countDocuments(query);
        return count;
    }

    async close() {
        await this.client.close();
    }
}
module.exports = new Conector();