var myPythonScriptPath = './server/analyze-local-image.py';
var fs = require('fs');

// Use python shell
const {PythonShell} = require("python-shell");
var pyshell = new PythonShell(myPythonScriptPath);



module.exports = {
  analyze: function (dirname) {
    var options = {
      mode: 'text',
      pythonPath: './Python/Python37-32/python.exe',
      pythonOptions: ['-u'],
      scriptPath: './server/',
      args: ['value1', 'value2', 'value3']
    };

    PythonShell.run('analyze-local-image.py', options, function (err, results) {
      if (err) 
        throw err;
      // Results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
  }
};


