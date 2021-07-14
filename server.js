const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));


app.use('/getData/',  require('./be/api/getAttractions/getAttractions.route'));

app.listen(3001 , function(){
    console.log('server running');
});