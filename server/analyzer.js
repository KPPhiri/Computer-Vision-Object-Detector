var myPythonScriptPath = './server/analyze-local-image.py';
var fs = require('fs');

// Use python shell
const {PythonShell} = require("python-shell");
var pyshell = new PythonShell(myPythonScriptPath);


// 
// module.exports = {
//   analyze: function (dirname) {
//     console.log("STARINTGKSDFJFLS");
//     var output = "";
//      pyshell.on('message', function (message) {
//         // received a message sent from the Python script (a simple "print" statement)
//         console.log(message);
//         output = message;
//     });
//
//     // end the input stream and allow the process to exit
//     pyshell.end(function (err) {
//         if (err){
//             throw err;
//         };
//         console.log('finished');
//         return;
//     });
//
//   }
//
// };

function sleep(time) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
}
