const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000

var shell = require('shelljs');

const generateHTMLBundle = async () => {
  shell.cd('./data-storyboard');
  shell.ls().forEach(x => console.log(x));
  shell.exec('npm run build');
};

app.post('/generate', (req, res) => {
  res.send(200);
  generateHTMLBundle();
})

app.get('/insight', async (req, res) => {
  fs.readFile(`${__dirname}/data-storyboard/dist/index.html`,
  (e, data) => {
    if (e) throw e;
    res.send({
      html: data.toString()
    })
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})