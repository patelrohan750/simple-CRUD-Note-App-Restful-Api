const mongoose = require('mongoose');
mongoose
	.connect('mongodb://localhost:27017/Notes', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('connection sucessfull');
	})
	.catch((e) => {
		console.log('No connection');
	});
