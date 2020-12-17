const { response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const { endianness } = require('os');
const path = require('path');

let questionPath = path.join(__dirname, "questions.json")
let questionBank = JSON.parse(fs.readFileSync(questionPath));

app.use('/', express.static('public'));

app.use(express.json());

app.post('/api/submitquestion', function (req, res){
    if(req.body['password'] === "password1234") {
        delete req.body.password;
        questionBank.questions.push(req.body);
        console.log(questionBank);
        fs.writeFile(questionPath, JSON.stringify(questionBank, null, 2), () => {});
    } else {
        console.log('Password fail');
    }
});


app.get('/api/questions', function (req, res) {
    let randArr = questionBank['questions'].slice();
    randArr.sort(() => 0.5 - Math.random());
    res.status(200).json({'questions': randArr.slice(0, 20)});
});

app.listen("80");
