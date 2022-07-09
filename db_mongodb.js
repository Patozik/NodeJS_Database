const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'node-kurs';

const client = new MongoClient(url);

async function main() {
    await client.connect();
    console.log('Połączenie udane');

    const db = client.db(dbName);

    // Tworzenie
    // await db
    //     .collection('users')
    //     .insertOne({ name: 'Janek', email: 'janek@gmail.com' });

    // Pobieranie wartosci
    // const res = await db.collection('users').findOne({ name: 'Janek' });
    // console.log(res);

    const res2 = await db.collection('users').find({ _id: ObjectId('62c6f2cc9478a06b6c3d8d0f') }).toArray();
    console.log(res2);

    // Usuwanie
    // const collection = db.collection('users');
    // await collection.deleteOne({ name: 'Janek' });

}

main()
    .catch(ex => console.log('Coś poszło nie tak'))
    .finally(() => client.close());