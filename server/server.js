//dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const app = express();

const clientPath = './../client';
console.log('!!!Serving static from ' + clientPath);
app.use(express.static(clientPath));

//creating local server
app.set('view engine', 'ejs');
const server = http.createServer(app);
server.listen(8080, () => {
	console.log('Starting server on localhost:8080');
});

//create suspecious_videos db inside mongodb
mongoose.connect('mongodb://localhost/video_repo');

//schema setup
var videoSchema = new mongoose.Schema({
	video_name: String,
  file_path: String,
	groups: [{
			 name: String,
			 values: mongoose.Schema.Types.Mixed
	 }]
});

//Creating model of schema
var Video = mongoose.model("Video", videoSchema);


//adding video to model
Video.create({
  video_name: "File Name: Testing123",
	file_path: "File Path: http:/local/temp.img",
	groups:[{
            name: "Gun",
            values: {
                "value1": "...",
                "value2": "..."
            }
        },
        {
            name: "Knife",
            values: {
                "value3": "..."
            }
        },
        {
            name: "Mask",
            values: {
                "value4": "...",
                "value5": "..."
            }
        }]
}, function(err, vid) {
  if(err) {
    console.log(err);
  } else {
    console.log("Successfully added: ");
    console.log(vid);
  }
});


Video.find({}, function(err, vids) {
    if(err) {
        console.log("OH NO, ERROR");
        console.log(err);
    } else {
        console.log("ALL THE Videos.....");
        console.log(vids);
    }
});



//landing page
app.get('/', function(req, res) {
  // res.render('../client/views/index');
	res.sendFile(__dirname + '/computerVision.html');
  // res.send('this will be the landing page');

});
