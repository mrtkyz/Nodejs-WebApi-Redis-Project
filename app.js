var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var redis = require('redis');
var client = redis.createClient("6379","10.25.30.101");
client.auth("snet_ss_rds");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/caches', function (request, response) {
    console.log("444");
    client.keys('*', function(err, keys) {
        response.end(JSON.stringify(keys));
    });
});

app.get('/caches/:key', function (request, response) {
    try {
        client.get(request.params.key, function (err, res) {
            if (res == null) {
                response.send(404);
            }
            response.end("serdar harikasın... " + res);
        });
    } catch (exception) {
        response.send(404);
    }
});

app.post('/caches', function (request, response) {
    client.set(request.body.Key, request.body.Value, function(err, res) {
        response.end(res);
    });
});

app.put('/caches', function (request, response) {
    client.set(request.body.Key, request.body.Value, function(err, res) {
        response.end(res);
    });
});

app.delete('/caches/:key', function (request, response) {
    client.del(request.params.key, function(err, res) {
        response.end(res);
    });
});

app.listen(3000);
