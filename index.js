'use strict';
require('dotenv').config();

const server = require('./source/server');

server.start(process.env.PORT,process.env.MONGOOSE_URI);