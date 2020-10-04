const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

let questionPath = path.join(__dirname, "questions.json")
let questionBank = JSON.parse(fs.readFileSync(questionPath));

app.use('/', express.static('public'));

app.use(express.json());

app.post('/api/submitquestion', function (req, res){
    if(req.body['password'] === "Pizzaisgood99@@") {
        delete req.body.password;
        questionBank.questions.push(req.body);
        console.log(questionBank);
        fs.writeFile(questionPath, JSON.stringify(questionBank, null, 2), () => {});
    } else {
        console.log('Password fail');
    }
});


/*app.get('/api/questions', function (req, res, next) {

    next();
});*/

app.listen("80");
