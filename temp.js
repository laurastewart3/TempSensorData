//project dependencies

var five = require("johnny-five");
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connect to the database called Temperature and if it doesn't exist it will be created automatically
mongoose.connect('mongodb://user:password@ds123725.mlab.com:23725/temperatures');

//assign db variable to our connection
var db = mongoose.connection;

//check is the database is open
db.once('open', function(){
    
    //create collection table
    var TempSchema = mongoose.Schema({
        temperature: Number, 
        date: {type: Date, default: Date.now}
    });
    
//create model and assign it to the schema
    var Temperature = mongoose.model('Collection1', TempSchema);
    
    //board initialization
    five.Board().on("ready", function() {
        var temperature = new five.Thermometer({
        controller: "TMP36", //name of temperature sensor used
        pin: "A0", // where sensor middle leg is connected
        freq: 1000 // the rate in milliseconds to emit data event
  });
        temperature.on("change", function() {
            //create an instance of model and asssign temporary property to the value returned by our thermometer in fahrenheit
            var Temp_rec = new Temperature({temperature: this.fahrenheit});
            
            //save data to database and throw any errors if they occur
            Temp_rec.save(function (err, Temp_rec){
                if (err) return console.error(err);
            });
            
            //also log recorded temperature to the console
    console.log(this.fahrenheit);
    });
  });
});
