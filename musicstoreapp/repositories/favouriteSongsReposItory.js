const {ObjectId} = require("mongodb");

module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favourite_songs",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    },
    addFavourite: async function (favourite) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouriteSongsCollection = database.collection(this.collectionName);
            const result = await favouriteSongsCollection.insertOne(favourite);
            return result.insertedId;
        } catch (error) {
            throw (error);
        }
    },
    listFavourites: async function () {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouriteSongsCollection = database.collection(this.collectionName);
            const favourites = await favouriteSongsCollection.find({}).toArray();
            return favourites;
        } catch (error) {
            throw (error);
        }
    },
    deleteFavourite: async function (favouriteId) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favouriteSongsCollection = database.collection(this.collectionName);
            const result = await favouriteSongsCollection.deleteOne({ _id: new ObjectId(favouriteId) });
            return result.deletedCount;
        } catch (error) {
            throw (error);
        }
    }
};