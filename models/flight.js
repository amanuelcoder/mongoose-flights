const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const destinationSchema = new Schema ({
    airport: {
        type: String,
        enum: ['DFW', 'AUS', 'DEN', 'LAX'] 
    },

    arrival: {
        type: Date
    }
});

const flightSchema = new Schema({
    airline: {
       type: String,
       enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['DFW', 'AUS', 'DEN', 'LAX'], 
        default: 'AUS'
    },
    flightNo: {
     type: Number,
     min: 10,
     max: 9999,
    },
    departs: {
        type: Date,
        default: Date.now()
        
    },
    destinations: [destinationSchema]
});


module.exports = mongoose.model('Flight', flightSchema);