const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/videoController')(app);
require('./app/controllers/categoryController')(app);


app.listen(4000);