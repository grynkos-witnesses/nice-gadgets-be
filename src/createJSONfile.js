const fs = require('fs');
const path = require('path');

const files = [];

const theDirectory = path.resolve('mockup_data', 'phones');

const directory = fs.readdirSync(theDirectory);

directory.forEach((file) => {
  const data = fs.readFileSync(`${theDirectory}/${file}`);

  const s = data.toString();

  fs.appendFileSync('result.json', s);
  fs.appendFileSync('result.json', ',');

  files.push(JSON.parse(data.toString()));
})

// fs.writeFileSync('../result.json', files);

// jsonConcat({
//     src: theDirectory,
//     dest: "./result.json"
// }, function (json) {
//     console.log(json);
// });
