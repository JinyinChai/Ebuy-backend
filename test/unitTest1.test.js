const {MongoClient} =require('mongodb');
const {Db} = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

describe('insert', () => {
    const uri = process.env.MONGO_URL;
    let connection = MongoClient;
    let db = Db;

    beforeAll(async () => {
        // @ts-ignore
        connection = await MongoClient.connect(uri, {
            // @ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });

    it('should insert a new user into collection', async () => {
        const users = db.collection('users');

        const mockUser = {_id: 'some-user-id', firstname: 'John', lastname: "Lee", email:"teste@g.com", password:"test", username:"some-user-name"};
        // @ts-ignore
        await users.insertOne(mockUser);

        const insertedUser = await users.findOne({_id: 'some-user-id'});

        expect(insertedUser).toEqual(mockUser);
    });


    it('should insert a new order into collection', async () => {
        const orders = db.collection('orders');

        const mockOrder = {_id: 'some-user-id', userId: "userId", product: {productId: 'productId', quantity: "1"}, amount:"1", address:"address"};
        // @ts-ignore
        await orders.insertOne(mockOrder);

        const insertedOrder = await orders.findOne({_id: 'some-user-id'});

        expect(insertedOrder).toEqual(mockOrder);
    });

});