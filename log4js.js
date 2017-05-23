var log4js = require('log4js');
var fs = require('fs');
var path = require('path');
var appRoot = path.join(require('app-root-dir').get());
var logDirectory = appRoot + '/node/logs'
console.log(" :: logDirectory" + logDirectory);
// ensure log directory exists
if(fs.existsSync(logDirectory) === true){
  console.log("Folder exists");
} else{
   fs.mkdirSync(logDirectory);
  }

/*Log4js.Level  Description
OFF   =>   nothing is logged
FATAL => fatal errors are logged
ERROR => errors are logged
WARN  => warnings are logged
INFO  =>  infos are logged
DEBUG => debug infos are logged
TRACE => traces are logged
ALL   =>  everything is logged*/

function createLog(filename){
  log4js.configure({
        appenders: [{                 
                "type": "dateFile", 
                "filename":logDirectory + '/access.log',
                "alwaysIncludePattern": true


               }
        
    ]
    
  });

  var logger = log4js.getLogger(filename);
      return logger;
}

module.exports = createLog;