var Jimp = require('jimp');
 
// open a file called "lenna.png"
Jimp.read('H:/ScreenShots/1579533097859.png', (err, lenna) => {
  if (err) throw err;
  lenna
    .resize(2000, 2000) // resize
    .write('H:/ScreenShots/abc.png'); // save
});