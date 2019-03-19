//dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const request = require('request');
const fs = require('file-system');
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

//Microsoft Azure API access
var subscriptionKey = "44e9358a43ad440492b8f84c13dc2b2e";

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/' +
    'Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png';

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});







//create suspecious_videos db inside mongodb
mongoose.connect('mongodb://localhost/video_repo');


//schema setup
var videoSchema = new mongoose.Schema({
	video_name: String,
  file_path: String,
	sus_objects: [{
			 name: String,
			 values: mongoose.Schema.Types.Mixed
	 }]
});

//Creating model of schema
var Video = mongoose.model("Video", videoSchema);
Video.deleteMany({ video_name: 'File Name: Testing123' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});



// //adding video to model
Video.create({
  video_name: "File Name: Testing123",
	file_path: "File Path: http:/local/temp.img",
	sus_objects:[{
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
				vids.forEach(function(doc, index) {
					console.log(index + " key: " + doc.uid)
			});

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
