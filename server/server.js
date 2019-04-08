//dependencies
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const request = require('request');
const fs = require('file-system');
const app = express();
// const analyze = require('./analyzer')
var myPythonScriptPath = './server/analyze-local-image.py';

const clientPath = __dirname + '/../client';
console.log('!!!Serving static from ' + __dirname + '/../client');
app.use(express.static(__dirname + '/../client'));


//creating local server
app.set('view engine', 'ejs');
const server = http.createServer(app);
server.listen(8080, () => {
	console.log('Starting server on localhost:8080');
});


// analyze.analyze('fsklsf');
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







//
//
// //python script
/*
const {PythonShell} = require("python-shell");
var pyshell = new PythonShell(myPythonScriptPath);

var output = "";
pyshell.on('message', function (message) {
	 // received a message sent from the Python script (a simple "print" statement)
	 output = message;
	 console.log("!!! testing: " + message);

});

// end the input stream and allow the process to exit
pyshell.end(function (err) {
	 if (err){
			 throw err;
	 };
	 console.log("OUTPUT " + output);
	 parseJSONsendDatabase(output);
	 console.log('finished');
});



*/



//adding to database
function parseJSONsendDatabase(string_object) {
	string_object = string_object.replace(/'/g, '"');
	// let json_string = JSON.stringify(JSON.parse(string_object), null, '  ');
	console.log("jsonResponse string_object" + string_object);
	let object = JSON.parse(string_object);
	console.log("jsonResponse " + object);
	console.log("jsonResponse object[description][tags]" + object["tags"]);
	Timestamp.create({
		video_name: object["video_name"],
	  file_path: object["file_path"],
		min: parseInt(object["min"]),
		sec: parseInt(object["sec"]),
		sus_objects: object["tags"]
	});

}




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


var arr =["mask", "gun", "knife"];

Video.create({
	video_name: 'Backk Home Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://images.tmz.com/2018/09/28/092818-xxx-murder-video-kal-v2-1080x608.jpg',
	date: '03/01/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});


Video.create({
	video_name: 'Back Home Camera',
  file_path: 'testing1111',
	thumbnail_path: 'https://images.tmz.com/2018/09/28/092818-xxx-murder-video-kal-v2-1080x608.jpg',
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
	thumbnail_path: 'https://images.tmz.com/2018/09/28/092818-xxx-murder-video-kal-v2-1080x608.jpg',
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
	thumbnail_path: 'https://images.tmz.com/2018/09/28/092818-xxx-murder-video-kal-v2-1080x608.jpg',
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
	thumbnail_path: 'https://images.tmz.com/2018/09/28/092818-xxx-murder-video-kal-v2-1080x608.jpg',
	// thumbnail_path: '/img/Shaki_waterfall.jpg',
	date: '02/21/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
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
