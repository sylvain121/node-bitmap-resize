var fs = require('fs');
var jpg = require('jpeg-turbo');

var resize = require('../index.js');
var chat = fs.readFileSync(__dirname + "/chat.rgba");

var width = 1280;
var height = 960;

var image = {
  data: chat,
  width: width,
  height: height,
  destwidth: 800,
  destheight: 600
};

var date = new Date();
var resizedImage = resize.resizeSync(image);
console.log(new Date() - date);


var options = {
    format: jpg.FORMAT_RGBA,
    width: image.destwidth,
    height: image.destheight,
    subsampling: jpg.SAMP_444,

}
 
var preallocated = new Buffer(jpg.bufferSize(options))
 
var encoded = jpg.compressSync(resizedImage, preallocated, options)
fs.writeFileSync("out.jpg", encoded);
