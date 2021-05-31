const express = require('express');
require('./db/conn');
const app = express();
const port = 8000;
const NoteRouter = require('./routers/note.router');

app.use(express.json());
app.use(NoteRouter);

app.listen(port, () => {
	console.log(`connection suceesfull at port ${port}`);
});
