async function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient(
    'mongodb+srv://aktreboja:e5UWp2bBdU78R6yK@feedme-cluster.pttbgxy.mongodb.net/',
  );

  try {
    const mongo = await client.connect();
    const db = await mongo.db('FeedMe');
    const users = await db.collection('Users');

    // const user = await users.findOne({ email: email })
    console.log('user: ', email);
    return callback(user);
  } catch (error) {
    return callback(error);
  }

  //client.connect(function (err) {
  //   if (err) return callback(err);

  //   const db = client.db('FeedMe');
  //   const users = db.collection('Users');

  // users.findOne({ email: email }, function (err, user) {
  //if (err || !user) {
  //client.close();
  //return callback(err || new WrongUsernameOrPasswordError(email));
  //} else return callback('hell ye')

  //bcrypt.compare(password, user.password, function (err, isValid) {
  //client.close();

  //if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

  //return callback(null, {
  //  user_id: user._id.toString(),
  //nickname: user.nickname,
  // email: user.email
  //});
  //});
  //});
  //});
}
