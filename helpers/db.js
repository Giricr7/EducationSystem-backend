const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;
// connecting url
const mongoUrl = 'mongodb+srv://giriprasath:giri%40123@cluster0.tjcum.mongodb.net/EducationSystem?retryWrites=true&w=majority';

exports.initDb = async cb => {
	if (_db) return cb(null, _db);

	try {
		const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
		_db = client.db();
		cb(null, client);
	} catch (error) {
		cb(error, null);
	}
};

exports.getDb = () => {
	if (!_db) throw 'Not Connected...';

	return _db;
};
