var express = require('express'); //підєднання бібліотеки express
var app = express();

var bodyParser = require('body-parser');   //підключення бібліотеки для опрацюваання post запитів
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var fs = require('fs');    //   підєднання бібліотеки file stream



app.use(express.static(__dirname));  //встановлення каталогу для статичного контенту
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/form',function (req,res) {
	res.sendFile(__dirname + '/form.html');
});

app.get('/data', function (req, res) {
	fs.readFile('data.json','utf-8', function (err, data) {
        console.log(data);
        res.send(data);
    })
});

app.post('/senddata', function (req,res) {
    console.log(req.body);
    //res.send(req.body);
    fs.readFile("data.json", "utf-8", function (err,data) {
        var mas=JSON.parse(data);
        mas.push(req.body);
        data = JSON.stringify(mas);
        fs.writeFile('data.json',data);
    });
    res.send('Data is saved');

});

app.post('/deletedata', function (req, res) {
    console.log(req.body);
    //res.send(req.body);
    fs.readFile("data.json", "utf-8", function (err, data) {
        var mas = JSON.parse(data);
        mas.splice(req.body.value,1);
        data = JSON.stringify(mas);
        fs.writeFile('data.json', data);
    });
    res.send('Data has been deleted');
    

});

app.listen(8080);
console.log('server is running!');
