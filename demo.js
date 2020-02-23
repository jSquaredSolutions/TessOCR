const { createWorker } = require('tesseract.js');
const testFolder = 'C:/Screenshots';
const fs = require('fs');
var fileName = './ScreenshotData.json';
var file2 = require(fileName);

const worker = createWorker();
z = 0;

console.log("Removing Duplicates");
/*
fs.readdirSync(testFolder).forEach(file => {
  path = testFolder + "/" + file;
  abc = fs.statSync(path);
  if (abc.size == z) {
    console.log("Dup Found");
    fs.unlinkSync(path);
  } else {
  }
  z = abc.size;
}); */

console.log("Done Removing Duplicates");
console.log("Put values in array");
let valueArray = [];

fs.readdirSync(testFolder).forEach(file => {
  path = testFolder + "/" + file;
  valueArray.push(path);
});

console.log(valueArray.length);
console.log("Done putting values in array");

/* check the DB form ID that match what is in this array. If it finds a match then that image
has already been assessed. Remove it from this array if a match is found */


for (var property in file2) {
 delete valueArray[valueArray.findIndex(element => element === file2[property].Path)];
};

console.log('Done deleting duplicates from array');
console.log(valueArray.length);

valueArray = valueArray.filter(function (el) {
  return el != null;
});

console.log(valueArray.length);

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  for (let i = 0; valueArray.length; i++) {
      const { data: { text } } = await worker.recognize(valueArray[i]);
      file2.push({ Path: valueArray[i], Text: text });
      console.log(i);
      fs.writeFile(fileName, JSON.stringify(file2), function (err) {
        if (err) return console.log(err);
      });
    };
  await worker.terminate();
})();

