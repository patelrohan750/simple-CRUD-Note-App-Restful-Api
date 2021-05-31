const Note = require('../models/note.model');

// Create and Save a new Note
module.exports.create = (req, res) => {
	const { title, content } = req.body;

	if (!content) {
		return res.status(400).send({ message: 'Note content can not be empty' });
	}
	const note = new Note({
		title: title ? title : 'Untitled Note',
		content
	});
	console.log(note);
	note.save().then((data) => res.send({ data })).catch((e) => {
		res.status(500);
		console.log(e);
	});
};

// Retrieve and return all notes from the database.
module.exports.findAll = (req, res) => {
	Note.find()
		.then((data) => {
			res.send({ data });
		})
		.catch((e) => {
			res.status(500);
			console.log(e);
		});
};

// Find a single note with a noteId
module.exports.findOne = (req, res) => {
	const id = req.params.noteId;
	Note.findById(id)
		.then((data) => {
			console.log(data);
			if (!data) {
				return res.status(404).send({ error: 'Not Found' });
			}
			res.send({ data });
		})
		.catch((e) => {
			res.status(500);
			console.log(e);
		});
};

// Update a note identified by the noteId in the request
module.exports.update = (req, res) => {
	const id = req.params.noteId;
	const { title, content } = req.body;
	if (!content) {
		return res.status(400).send({ message: 'Note content can not be empty' });
	}
	Note.findByIdAndUpdate(
		id,
		{
			title: title ? title : 'Untitled Note',
			content
		},
		{ new: true }
	)
		.then((note) => {
			if (!note) {
				return res.status(404).send({ error: `Note not found with id: ${id} ` });
			}
			res.send({ note });
		})
		.catch((e) => {
			res.status(500);
			console.log(e);
		});
};

// Delete a note with the specified noteId in the request
module.exports.delete = (req, res) => {
	const id = req.params.noteId;
	Note.findByIdAndRemove(id)
		.then((note) => {
			if (!note) {
				return res.status(404).send({
					message: 'Note not found with id '
				});
			}
			res.send({ message: 'Note deleted successfully!' });
		})
		.catch((e) => {
			res.status(500);
			console.log(e);
		});
};
