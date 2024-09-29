const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

eventSchema.set( 'toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
    }
})

module.exports = {
    EventModel: mongoose.model( 'Event', eventSchema ),
}
