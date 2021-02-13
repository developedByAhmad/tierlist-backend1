const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        required: true,
        validate: [checkUsernameLength, 'Username must be atleast 3 cahracters long']

    },
    password: {
        type: String,
        required: true,
        validate: [checkPasswordLength, 'Password must be atleast 8 cahracters long']
        
    },
    role:{
        type:String,
        // required:true
    }



},
    );


   function checkUsernameLength (val) {

        if (val.toString().length >= 3) {
            return true;
        }
        else {
            return false;
        }
    }

    function checkPasswordLength (val) {

        if (val.toString().length >= 8) {
            return true;
        }
        else {
            return false;
        }
    }

module.exports = mongoose.model('Auth', authSchema);