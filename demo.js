const { createWorker } = require('tesseract.js');
const testFolder = 'H:/ScreenShots';
const fs = require('fs');
var fileName = './ScreenshotData.json';
var file = require(fileName);

const worker = createWorker();
z = 0;
fs.readdirSync(testFolder).forEach(file => {
  path = testFolder + "/" + file;
  abc = fs.statSync(path);
  if (abc.size == z) {
    console.log("Dup Found");
    fs.unlinkSync(path);
  } else {
  }
  z = abc.size;
});

let valueArray = [];

fs.readdirSync(testFolder).forEach(file => {
  path = testFolder + "/" + file;
  console.log(file);
  valueArray.push(path);
});

console.log(file.ScreenshotData[0].Path);
console.log(valueArray[0]);

(async () => {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  for (let i = 0; valueArray.length; i++) {
    if (file.ScreenshotData[i].Path == valueArray[i]){
     console.log("record already exist");
    } else {
      const { data: { text } } = await worker.recognize(valueArray[i]);
      console.log(text);
      file.ScreenshotData.push({ Path: valueArray[i], Text: text });
      fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) return console.log(err);
      });
    }
  };
  await worker.terminate();
})();


