const express = require('express');
const user = require('../components/user/network');
const credit = require('../components/credits/network');


const routes = (server) => {
    server.use('/users', user);
    server.use('/credits', credit);
}

module.exports = routes