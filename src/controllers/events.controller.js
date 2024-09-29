const { default: mongoose } = require("mongoose");
const { EventModel } = require("../models/event.model");
const { UserModel } = require("../models/user.model");



const getEvents = async ( req, res ) => {

    try {

        const events = await EventModel.find()
            .populate('user', 'username'); // ? Populate, popula la información a la que hace referencia el id del user. Es decir, traerá el username y el id del user al consultar

        res.status(200).json({
            ok: true,
            events,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }


}

const createEvent = async ( req, res ) => {

    const { id } = req.user;

    try {

        const dbUser = await UserModel.findById( id );
        if( !dbUser ) res.status(404).json({ ok: false, msg: 'User not found' });

        const newEvent = new EventModel( req.body );

        newEvent.user = id

        await newEvent.save();

        res.status(201).json({ ok: true, msg: 'Event succesfully created', newEvent });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }


}
const updateEvent = async ( req, res ) => {

    const { id } = req.params;
    const user = req.user;

    if( !mongoose.Types.ObjectId.isValid( id ) ) res.status(404).json({ ok: false, msg: 'Event not found' });

    try {

        const dbEvent = await EventModel.findById( id );
        if( !dbEvent ) res.status(404).json({ ok: false, msg: 'Event not found' });

        // ? user id del header no coincide cono el user id del event
        if( dbEvent.user.toString() !== user.id ) res.status(401).json({ ok: false, msg: 'User cannot update this event' });

        const updatedEvent = {
            ...req.body,
            user: user.id,
        };

        const result = await EventModel.findByIdAndUpdate( id, updatedEvent, { new: true } );


        res.status(201).json({
            ok: true,
            msg: 'Event succesfully updated',
            updatedEvent: result,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }


}
const deleteEvent = async ( req, res ) => {

    const { id } = req.params;
    const user = req.user;

    if( !mongoose.Types.ObjectId.isValid( id ) ) res.status(404).json({ ok: false, msg: 'Event not found' });

    try {

        const dbEvent = await EventModel.findById( id );
        if( !dbEvent ) res.status(404).json({ ok: false, msg: 'Event not found' });

        // ? user id del header no coincide cono el user id del event
        if( dbEvent.user.toString() !== user.id ) res.status(401).json({ ok: false, msg: 'User cannot update this event' });

        const result = await EventModel.findByIdAndDelete( id );

        res.status(201).json({
            ok: true,
            msg: 'Event succesfully deleted',
            deletedEvent: result,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }

}


module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent,
}
