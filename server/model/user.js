//created this page for creating databse and schema

const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    tel: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    usertype: {
        type: String,
        
        required: true     
    },

    district: {
        type: String,

        required: true        
    },

    block: {
        type: String,

        required: true
    },

    panchayat: {
        type: String,

        required: true
    },
     
    password: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },
     
    createdAt: {
        type: String,
        default: Date.now()
    },

    updatedAt: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('User',UserSchema);
