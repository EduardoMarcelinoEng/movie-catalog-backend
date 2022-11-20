//Variable that defines the current environment
const env = "production";
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
    credentials:{
        key: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/privkey.pem', 'utf8'),
        cert: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/cert.pem', 'utf8'),
        ca: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/chain.pem', 'utf8')
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
    isHttps: true,
    credentials:{
        key: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/privkey.pem', 'utf8'),
        cert: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/cert.pem', 'utf8'),
        ca: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/chain.pem', 'utf8')
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
    credentials:{
        key: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/privkey.pem', 'utf8'),
        cert: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/cert.pem', 'utf8'),
        ca: readFileSync('/etc/letsencrypt/live/eduardomarcelinodev.com.br/chain.pem', 'utf8')
    }
}

const getObj = () => ({
    development, production, test
}[env] || development);

module.exports = getObj();