const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://admin:pass@localhost:27017/?authSource=admin';
const dbName = 'useraccount';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-profile', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    const user = await db.collection('users').findOne({ userid: 1 });
    res.json(user || {});
    client.close();
  } catch (err) {
    res.status(500).send("Failed to get profile");
  }
});

app.post('/update-profile', async (req, res) => {
  const userData = req.body;
  userData.userid = 1;

  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    await db.collection('users').updateOne(
      { userid: 1 },
      { $set: userData },
      { upsert: true }
    );
    res.json(userData);
    client.close();
  } catch (err) {
    res.status(500).send("Failed to update profile");
  }
});

app.post('/add-profile', async (req, res) => {
  const newUser = req.body;

  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db(dbName);
    await db.collection('users').insertOne(newUser);
    res.json(newUser);
    client.close();
  } catch (err) {
    res.status(500).send("Failed to add profile");
  }
});

const PORT = 3000;   
   
app.listen(PORT, '0.0.0.0', () => {  
  console.log(`Server running on port ${PORT}`);  
  console.log(`Access it using the public IP or DNS of your EC2 instance: http://<EC2-PUBLIC-IP>:${PORT}`);  
});  