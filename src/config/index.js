//Variable that defines the current environment
const env = "development";
require('dotenv').config();

const { readFileSync } = require('fs');

//Environment settings development
const development = {
    port: 8080,
    database: {
        "username": "root",
        "password": "",
        "database": "movie_catalog",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    isHttps: false,
    credentials: {
        key: '',
        cert: '',
        ca: ''
    }
}

//Environment settings production
const production = {
    port: 8080,
    database: {
        "username": process.env.USERNAMEDB,
        "password": process.env.PASSWORDDB,
        "database": process.env.DATABASEDB,
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    isHttps: false,
    credentials: {
        key: '/etc/letsencrypt/live/eduardomarcelinodev.com.br/privkey.pem',
        cert: '/etc/letsencrypt/live/eduardomarcelinodev.com.br/cert.pem',
        ca: '/etc/letsencrypt/live/eduardomarcelinodev.com.br/chain.pem'
    }
}

//Environment settings test
const test = {
    port: 8080,
    database: {
        "username": "root",
        "password": "",
        "database": "movie_catalog",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    isHttps: false,
    credentials: {
        key: '',
        cert: '',
        ca: ''
    }
}

const getObj = () => ({
    development, production, test
}[env] || development);

module.exports = getObj();