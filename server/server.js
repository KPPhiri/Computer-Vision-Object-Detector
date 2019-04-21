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


app.get('/03/01/2018', function(req, res) {
	let timestamps = [];
	Timestamp.find({video_name: 'Store Camera'}, function(err, tvids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        // console.log("All the timestamps...");
				 timestamps = tvids.map(function(model) {
					return model.toObject();
				});
				// console.log(timestamps);


				Video.find({video_name: 'Store Camera'}, function(err, vids) {
				    if(err) {
				        console.log("OH NO, ERROR");
				        console.log(err);
				    } else {
			        // console.log("All the timestamps...");
							var vid = vids.map(function(model) {
								return model.toObject();
							});
							vid = vid[0];
							console.log("VIDEO IS: ", vid);
							console.log(vid);
							res.render('../client/views/analysis',{vid:vid, timestamps:timestamps});
				    }
				});
	    }
	});
});


app.get('/05/01/2018', function(req, res) {
	let timestamps = [];
	Timestamp.find({video_name: 'Jewely Store Front Camera'}, function(err, tvids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        // console.log("All the timestamps...");
					timestamps = tvids.map(function(model) {
					return model.toObject();
				});
				// console.log(timestamps);


				Video.find({video_name: 'Jewely Store Front Camera'}, function(err, vids) {
				    if(err) {
				        console.log("OH NO, ERROR");
				        console.log(err);
				    } else {
			        // console.log("All the timestamps...");
							var vid = vids.map(function(model) {
								return model.toObject();
							});
							vid = vid[0];
							console.log("VIDEO IS: ", vid);
							console.log(vid);
							res.render('../client/views/analysis',{vid:vid, timestamps:timestamps});
				    }
				});
	    }
	});
});

app.get('/09/01/2018', function(req, res) {
	let timestamps = [];
	Timestamp.find({video_name: 'Back Home Camera'}, function(err, tvids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        // console.log("All the timestamps...");
				 timestamps = tvids.map(function(model) {
					return model.toObject();
				});
				// console.log(timestamps);


				Video.find({video_name: 'Back Home Camera'}, function(err, vids) {
				    if(err) {
				        console.log("OH NO, ERROR");
				        console.log(err);
				    } else {
			        console.log("All the timestamps...");
							let vid = vids.map(function(model) {
								return model.toObject();
							});
							vid = vid[0];
							console.log("VIDEO IS: ", vid);
							console.log(vid);
							res.render('../client/views/analysis',{vid:vid, timestamps:timestamps});
				    }
				});
	    }
	});
});






app.get('/01/01/2019', function(req, res) {
	let timestamps = [];
	Timestamp.find({video_name: 'Porch Front Camera'}, function(err, tvids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
        // console.log("All the timestamps...");
					timestamps = tvids.map(function(model) {
					return model.toObject();
				});
				// console.log(timestamps);


				Video.find({video_name: 'Porch Front Camera'}, function(err, vids) {
				    if(err) {
				        console.log("OH NO, ERROR");
				        console.log(err);
				    } else {
			        // console.log("All the timestamps...");
							var vid = vids.map(function(model) {
								return model.toObject();
							});
							vid = vid[0];
							console.log("VIDEO IS: ", vid);
							console.log(vid);
							res.render('../client/views/analysis',{vid:vid, timestamps:timestamps});
				    }
				});
	    }
	});
});

app.get('/04/01/2019', function(req, res) {
	let timestamps = [];
	let vid = [];
	Timestamp.find({video_name: 'Inside Home Camera'}, function(err, tvids) {
	    if(err) {
	        console.log("OH NO, ERROR");
	        console.log(err);
	    } else {
				  timestamps = tvids.map(function(model) {
						console.log("TIMESTAMPS IS: ", timestamps);
					return model.toObject();
				});



				Video.find({video_name: 'Inside Home Camera'}, function(err, vids) {
				    if(err) {
				        console.log("OH NO, ERROR");
				        console.log(err);
				    } else {
			        // console.log("All the timestamps...");
							 vid = vids.map(function(model) {
								return model.toObject();
							});
							vid = vid[0];
							console.log("VIDEO IS: ", vid);
							res.render('../client/views/analysis',{vid:vid, timestamps:timestamps});


				    }
				});
	    }
	});
});

//
// app.get('/04/01/2019', function(req, res) {
// 	Timestamp.find({video_name: 'Inside Home Camera'}, function(err, vids) {
// 	    if(err) {
// 	        console.log("OH NO, ERROR");
// 	        console.log(err);
// 	    } else {
//         console.log("All the timestamps...");
// 				var timestamps = vids.map(function(model) {
// 					return model.toObject();
// 				});
// 				console.log(timestamps);
// 				res.render('../client/views/analysis',{timestamps:timestamps});
// 	    }
// 	});
//
// });
//






Video.create({
	video_name: 'Store Camera',
  file_path: '/vid/vid1.mp4',
	thumbnail_path: './img/thumbnail1.png',
	date: '03/01/2018'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});


Video.create({
	video_name: 'Jewely Store Front Camera',
  file_path: '/vid/vid2.mp4',
	thumbnail_path: './img/thumbnail2.png',
	date: '05/01/2018'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Back Home Camera',
  file_path: '/vid/vid3.mp4',
	thumbnail_path: './img/thumbnail3.png',
	date: '09/01/2018'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Porch Front Camera',
  file_path: '/vid/vid4.mp4',
	thumbnail_path: './img/thumbnail4.png',
	date: '01/01/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});

Video.create({
	video_name: 'Inside Home Camera',
  file_path: '/vid/vid5.mp4',
	thumbnail_path: './img/thumbnail5.png',
	date: '04/01/2019'
	}, function(err, vid) {
	if(err) {
			console.log(err);
	} else {
	}
});




let vid1_arr = [['indoor', 'table', 'desk', 'office', 'refrigerator', 'computer', 'cluttered', 'covered', 'sitting', 'man', 'filled', 'different', 'various', 'toy', 'food', 'truck', 'young', 'counter', 'several', 'kitchen', 'many', 'standing', 'room', 'group', 'snow', 'white', 'laying', 'people'],
['indoor', 'table', 'person', 'computer', 'office', 'desk', 'refrigerator', 'sitting', 'man', 'cluttered', 'laptop', 'young', 'covered', 'paper', 'food', 'filled', 'kitchen', 'group', 'black', 'counter', 'woman', 'keyboard', 'many', 'standing', 'room', 'people', 'desktop', 'store', 'snow', 'white'],
['indoor', 'table', 'desk', 'office', 'photo', 'computer', 'covered', 'different', 'snow', 'skiing', 'food', 'cluttered', 'sitting', 'various', 'young', 'filled', 'standing', 'man', 'refrigerator', 'many', 'woman', 'group', 'people', 'room'],
['indoor', 'table', 'desk', 'office', 'computer', 'cluttered', 'man', 'covered', 'sitting', 'filled', 'food', 'refrigerator', 'young', 'standing', 'laying', 'black', 'laptop', 'snow', 'woman', 'group', 'keyboard', 'room', 'birthday', 'people', 'kitchen', 'bed', 'playing'],
['indoor', 'toy', 'table', 'covered', 'refrigerator', 'man', 'snow', 'skiing', 'filled', 'sitting', 'standing', 'young', 'different', 'desk', 'black', 'computer', 'woman', 'holding', 'group', 'people', 'laying'],
['indoor', 'table', 'toy', 'desk', 'covered', 'office', 'food', 'different', 'counter', 'items', 'various', 'computer', 'sitting', 'man', 'filled', 'cluttered', 'refrigerator', 'snow', 'skiing', 'young', 'birthday', 'kitchen', 'standing', 'store', 'group', 'room'],
['indoor', 'table', 'office', 'refrigerator', 'desk', 'sitting', 'items', 'cluttered', 'equipment', 'filled', 'covered', 'food', 'different', 'various', 'counter', 'computer', 'kitchen', 'young', 'man', 'standing', 'many', 'room', 'snow', 'group', 'skiing', 'laying'],
['indoor', 'table', 'refrigerator', 'sitting', 'items', 'office', 'gun', 'cluttered', 'equipment', 'desk', 'food', 'man', 'filled', 'computer', 'truck', 'covered', 'standing', 'counter', 'black', 'kitchen', 'different', 'skiing', 'large', 'young', 'holding', 'woman', 'snow', 'room', 'board', 'group'],
['indoor', 'table', 'food', 'items', 'equipment', 'office', 'sitting', 'box', 'gun', 'desk', 'skiing', 'filled', 'covered', 'standing', 'man', 'truck', 'snow', 'computer', 'different', 'toy', 'counter', 'refrigerator', 'young', 'holding', 'kitchen', 'large', 'board', 'woman', 'group', 'display', 'room', 'people'],
['indoor', 'table', 'desk', 'equipment', 'sitting', 'office', 'cap', 'skiing', 'computer', 'food', 'standing', 'covered', 'snow', 'board', 'counter', 'man', 'black', 'refrigerator', 'young', 'kitchen', 'holding', 'group', 'display', 'people', 'room']];

let vid2_arr = [['boat'],
['sitting', 'table', 'glass', 'computer', 'room', 'laying'],
['table', 'computer'],
['table', 'window', 'sitting', 'desk', 'computer', 'hanging', 'keyboard', 'clock', 'mirror', 'white', 'man'],
['sitting', 'table', 'building', 'glass', 'room', 'store', 'display'],
['indoor', 'table', 'glass', 'sitting', 'large', 'white', 'display', 'clear', 'statue', 'cake', 'man', 'room', 'standing', 'plate'],
['table'],
['building', 'room'],
['indoor', 'table', 'sitting', 'window', 'room', 'large', 'covered', 'man', 'glass', 'living', 'shop', 'standing', 'display', 'store', 'white', 'people'],
['indoor', 'table', 'sitting', 'computer', 'desk', 'laptop', 'piano', 'keyboard', 'pair', 'wooden', 'man', 'cutting', 'large', 'board', 'boat', 'mouse', 'room', 'white']];

let vid3_arr = [['sitting', 'black', 'white', 'standing', 'room', 'man'],
['person', 'man', 'young', 'board', 'building', 'cap', 'gun', 'riding', 'doing', 'standing', 'umbrella'],
['sitting', 'black', 'street', 'refrigerator', 'computer', 'white', 'cat', 'room', 'standing'],
['sitting', 'black', 'street', 'white', 'cat', 'room', 'refrigerator', 'fire', 'sign'],
['person', 'young', 'building', 'boy', 'man', 'little', 'standing'],
['man', 'wearing', 'hat', 'standing', 'holding', 'room'],
['young', 'standing', 'small', 'man', 'gun', 'little', 'sitting', 'holding', 'wearing', 'black', 'woman', 'board', 'girl', 'room', 'white']];

let vid4_arr = [['building', 'table', 'sitting', 'man', 'snow', 'large', 'riding', 'room', 'fire', 'driving', 'street', 'stop', 'train', 'smoke', 'bus', 'standing'],
['building', 'indoor', 'sitting', 'man', 'front', 'gun', 'table', 'standing', 'mirror', 'room', 'white'],
['indoor', 'building', 'sitting', 'large', 'mirror', 'man', 'room', 'table', 'fire', 'white', 'fireplace', 'snow'],
['indoor', 'building', 'sitting', 'large', 'fire', 'room', 'table', 'man', 'old', 'white', 'mirror', 'oven', 'kitchen', 'snow', 'sink', 'engine'],
['building', 'indoor', 'sitting', 'large', 'mirror', 'bridge', 'fire', 'brick', 'table', 'man', 'room', 'old', 'snow', 'white'],
['building', 'sitting', 'table', 'large', 'man', 'snow', 'fire', 'room', 'brick', 'old', 'bridge', 'white', 'street', 'standing', 'kitchen', 'oven'],
['building', 'window', 'sitting', 'room', 'table', 'fire', 'white', 'man', 'large', 'bench', 'old', 'mirror', 'snow', 'brick', 'living', 'street', 'bridge', 'kitchen', 'oven', 'standing', 'train', 'city'],
['building', 'fire', 'sitting', 'table', 'man', 'large', 'room', 'brick', 'bridge', 'white', 'snow', 'train', 'city', 'standing', 'street', 'riding'],
['building', 'table', 'sitting', 'man', 'fire', 'large', 'snow', 'brick', 'riding', 'room', 'bridge', 'white', 'train', 'kitchen'],
['building', 'sitting', 'man', 'fire', 'snow', 'table', 'large', 'bridge', 'room', 'riding', 'brick', 'ramp', 'white', 'oven', 'bus', 'train']];

let vid5_arr = [['indoor', 'room', 'living', 'television', 'mirror', 'white', 'large', 'bedroom', 'furniture', 'door', 'table', 'refrigerator', 'bed'],
['indoor', 'room', 'living', 'television', 'window', 'table', 'furniture', 'view', 'white', 'large', 'bedroom', 'screen', 'sitting', 'filled', 'water', 'mirror', 'refrigerator', 'bed'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'furniture', 'large', 'white', 'screen', 'bedroom', 'sitting', 'mirror', 'filled', 'water', 'refrigerator', 'bed'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'white', 'furniture', 'large', 'sitting', 'bedroom', 'screen', 'mirror', 'filled', 'water', 'bed', 'refrigerator'],
['indoor', 'room', 'living', 'window', 'television', 'view', 'table', 'furniture', 'screen', 'large', 'white', 'mirror', 'sitting', 'bedroom', 'filled', 'water', 'door', 'refrigerator', 'bed'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'furniture', 'white', 'large', 'sitting', 'screen', 'bedroom', 'mirror', 'filled', 'water', 'door', 'refrigerator', 'bed'],
['indoor', 'room', 'living', 'window', 'table', 'television', 'view', 'furniture', 'large', 'mirror', 'fire', 'sitting', 'screen', 'white', 'bedroom', 'filled', 'monitor', 'water', 'refrigerator', 'bed', 'boat'],
['indoor', 'room', 'window', 'living', 'table', 'television', 'view', 'mirror', 'photo', 'fire', 'furniture', 'large', 'sitting', 'screen', 'box', 'white', 'bedroom', 'filled', 'monitor', 'water', 'refrigerator', 'bed', 'boat'],
['indoor', 'room', 'living', 'window', 'table', 'television', 'view', 'furniture', 'large', 'sitting', 'white', 'mirror', 'fire', 'bedroom', 'screen', 'filled', 'monitor', 'water', 'refrigerator', 'bed', 'boat', 'standing'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'furniture', 'large', 'screen', 'sitting', 'white', 'monitor', 'bedroom', 'mirror', 'water', 'refrigerator', 'bed', 'boat'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'mirror', 'large', 'screen', 'fire', 'white', 'sitting', 'furniture', 'monitor', 'filled', 'bedroom', 'bed', 'water', 'refrigerator'],
['indoor', 'room', 'living', 'window', 'view', 'television', 'table', 'mirror', 'fire', 'furniture', 'sitting', 'screen', 'large', 'white', 'filled', 'monitor', 'bedroom', 'refrigerator', 'water', 'bed', 'boat'],
['indoor', 'room', 'window', 'living', 'view', 'television', 'table', 'mirror', 'photo', 'monitor', 'large', 'screen', 'white', 'sitting', 'furniture', 'bedroom', 'filled', 'refrigerator', 'water', 'bed'],
['indoor', 'room', 'living', 'television', 'mirror', 'table', 'screen', 'large', 'white', 'monitor', 'furniture', 'bed', 'refrigerator', 'bedroom', 'standing', 'man'],
['indoor', 'room', 'living', 'window', 'view', 'television', 'table', 'monitor', 'furniture', 'mirror', 'screen', 'fire', 'white', 'filled', 'large', 'bedroom', 'water', 'refrigerator', 'boat', 'man', 'bed', 'bus'],
['indoor', 'room', 'view', 'car', 'sitting', 'photo', 'television', 'mirror', 'living', 'monitor', 'table', 'fire', 'white', 'filled', 'bedroom', 'furniture', 'refrigerator', 'bus', 'seat', 'screen', 'large', 'water', 'bed', 'boat', 'man', 'cat', 'plane'],
['indoor', 'photo', 'television', 'window', 'mirror', 'view', 'room', 'monitor', 'sitting', 'screen', 'fire', 'table', 'man', 'living', 'white', 'water', 'bedroom', 'seat', 'large', 'boat', 'holding', 'bus', 'phone', 'bed', 'standing'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'monitor', 'view', 'photo', 'fire', 'sitting', 'white', 'furniture', 'screen', 'mirror', 'filled', 'bedroom', 'refrigerator', 'large', 'water', 'man', 'bed', 'boat', 'standing', 'bus'],
['indoor', 'room', 'window', 'living', 'table', 'television', 'view', 'photo', 'monitor', 'mirror', 'sitting', 'fire', 'furniture', 'bedroom', 'large', 'white', 'screen', 'filled', 'refrigerator', 'water', 'bed', 'man', 'boat', 'standing', 'bus'],
['indoor', 'room', 'living', 'window', 'television', 'table', 'view', 'monitor', 'mirror', 'furniture', 'sitting', 'fire', 'bedroom', 'white', 'screen', 'large', 'filled', 'refrigerator', 'bed', 'water', 'bus', 'man', 'boat']];



let vid_names =['Store Camera', 'Jewely Store Front Camera', 'Back Home Camera', 'Porch Front Camera', 'Inside Home Camera'];
let vid_arr = [vid1_arr, vid2_arr, vid3_arr, vid4_arr, vid5_arr];


for(let j = 0; j < vid_arr.length; j++) {
	for(let i = 0; i < vid1_arr.length; i++) {
		Timestamp.create({
			video_name: vid_names[j],
			min: 0,
			sec: i * 3,
			sus_objects: vid_arr[j][i]
			}, function(err, vid) {
			if(err) {
					console.log(err);
			} else {
					console.log("ADDEDD TIMESTAMPSSS video_name: " + vid_names[j]);
			}
		});
	}
}
