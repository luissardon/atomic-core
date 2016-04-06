'use strict';

let fs = require("fs");
let browserify = require("browserify");

browserify({
    entries: 'script.js',
    basedir: __dirname + '/source',
    extensions: ['.js'],
    debug: true
  })
  .on("error", function (err) { console.log("Error: " + err.message); })
  .transform("babelify", {
      presets: ["es2015"]
  })
  .bundle()
  .on("error", function (err) { console.log("Error: " + err.message); })
  .pipe(fs.createWriteStream(__dirname + "/public/bundle.js"));
