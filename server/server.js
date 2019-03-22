//dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const request = require('request');
const fs = require('file-system');
const app = express();
const analyzer = require('./analyzer');

const clientPath = __dirname + '/../client';
console.log('!!!Serving static from ' + __dirname + '/../client');
app.use(express.static(__dirname + '/../client'));


//creating local server
app.set('view engine', 'ejs');
const server = http.createServer(app);
server.listen(8080, () => {
	console.log('Starting server on localhost:8080');
});


analyzer.analyze('');


var vid_timestamps = [];
var timestamps = [];
//Microsoft Azure API access
'use strict';

// Replace <Subscription Key> with your valid subscription key.
var subscriptionKey = "44e9358a43ad440492b8f84c13dc2b2e";

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/analyze';

const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';

// Request parameters.
const params = {
    'visualFeatures': 'Categories,Description,Color',
    'details': '',
    'language': 'en'
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

	arr =["mask", "gun", "knife"];
//

Timestamp.create({
	video_name: 'Testing123566',
	file_path: "testing1231232133",
	min: 9,
	sec: 2,
	sus_objects: arr
}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
			// console.log("ADDING NEW")
			// console.log(vid);
	}
});


Timestamp.create({
video_name: 'Testing123566',
file_path: "dragon1231232133",
min: 5,
sec: 3,
sus_objects: arr
}, function(err, vid) {
if(err) {
		console.log(err);
} else {
		// console.log("ADDING NEW")
		// console.log(vid);
}
});

Timestamp.create({
video_name: 'Testing123566',
file_path: "a[[;es1231232133",
min: 1,
sec: 43,
sus_objects: arr
}, function(err, vid) {
if(err) {
		console.log(err);
} else {
		// console.log("ADDING NEW")
		// console.log(vid);
}
});

Timestamp.create({
video_name: 'Testing123566',
file_path: "localdir//:s1231232133",
min: 8,
sec: 9,
sus_objects: arr
}, function(err, vid) {
if(err) {
		console.log(err);
} else {
}
});

	Timestamp.create({
		video_name: 'Testing123566',
		file_path: "testing1231232133",
		min: 9,
		sec: 2,
		sus_objects: arr
	}, function(err, vid) {
    if(err) {
        console.log(err);
    } else {
        // console.log("ADDING NEW")
        // console.log(vid);
    }
});


Timestamp.create({
	video_name: 'Testing123566',
	file_path: "dragon1231232133",
	min: 5,
	sec: 3,
	sus_objects: arr
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
			// console.log("ADDING NEW")
			// console.log(vid);
	}
});

Timestamp.create({
	video_name: 'Testing123566',
	file_path: "a[[;es1231232133",
	min: 1,
	sec: 43,
	sus_objects: arr
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
			// console.log("ADDING NEW")
			// console.log(vid);
	}
});

Timestamp.create({
	video_name: 'Testing123566',
	file_path: "localdir//:s1231232133",
	min: 8,
	sec: 9,
	sus_objects: arr
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});


Video.create({
	video_name: 'Back Home Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://www.w3schools.com/CSS/img_5terre.jpg',
	date: '09/01/2018'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Front Home Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://www.w3schools.com/CSS/img_mountains.jpg',
	date: '03/01/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Garage Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://www.w3schools.com/CSS/img_forest.jpg',
	date: '01/01/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Store Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://www.w3schools.com/CSS/img_lights.jpg',
	// thumbnail_path: '/img/Shaki_waterfall.jpg',
	date: '02/21/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});


});



function parseJSON(string_object) {
	let jsonResponse = JSON.stringify(JSON.parse(string_object), null, '  ');
	var object = parseJSON(JSON.parse(body));

	var arr = object["description"]["tags"];
}

//create suspecious_videos db inside mongodb
mongoose.connect('mongodb://localhost/video_repo');


//schema setup
var timestampSchema = new mongoose.Schema({
	video_name: String,
  file_path: String,
	min: Number,
	sec: Number,
	sus_objects: Array
});

var videoSchema = new mongoose.Schema({
	video_name: String,
  file_path: String,
	thumbnail_path: String,
	date: String
});


//Creating model of schema
var Timestamp = mongoose.model("Timestamp", timestampSchema);
var Video = mongoose.model("Video", videoSchema);

Video.deleteMany({}, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});

Timestamp.deleteMany({}, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});


//landing page
app.get('/', function(req, res) {
	Video.find({}, function(err, vids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        console.log("All the videos...");
				var videos = vids.map(function(model) {
					return model.toObject();
				});
				console.log(videos);
				res.render('../client/views/index',{videos:videos});
	    }
	});
	// res.sendFile('/computerVision.html');

});


app.get('/analysis', function(req, res) {
	Timestamp.find({video_name: 'Testing123566'}, function(err, vids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        console.log("All the timestamps...");
				var timestamps = vids.map(function(model) {
					return model.toObject();
				});
				console.log(timestamps);
				res.render('../client/views/analysis',{timestamps:timestamps});
	    }
	});

});
