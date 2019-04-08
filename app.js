var express = require('express');
var path = require('path');

var snapshotRouter = require('./routes/snapshot');
var userRouter = require('./routes/user');
var authRouter = require('./routes/authenticate');

var app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/user', userRouter);
app.use('/api/snapshot', snapshotRouter);
app.use('/api/auth', authRouter.router);

app.get('*', (req, res) => {
    let url = path.join(__dirname, 'client/build', 'index.html');
    if (!url.startsWith('/app/')) // we're on local windows
	url = url.substring(1);
    res.sendFile(url);
});

app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname +'/client/build/index.html'));
    res.sendStatus(404);
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
