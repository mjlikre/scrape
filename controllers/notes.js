const note = require('../models/notes');
const makeDate = require('../scripts/date');

module.exports = {
    get: (data, cb)=>{
        note.find({
            _headlineId: data._id
        }, cb);
    },
    save: (data, cb)=>{
        const newNote = {
            _headlineId: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        note.create(newNote, (err, doc)=>{
            if (err){
                console.log(err)
            }else{
                console.log(doc);
                cb(doc);
            }
        });
       
    },
    delete: (data, cb)=>{
        note.remove({
            _id: data._id
        }, cb);
    }

};