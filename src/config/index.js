//Variable that defines the current environment
const env = "production";
require('dotenv').config();

//Environment settings development
const development = {
    port: 8080,
    database: {
        "username": "root",
        "password": "",
        "database": "movie_catalog",
        "host": "127.0.0.1",
        "dialect": "mysql"
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
    }
}

const getObj = () => ({
    development, production, test
}[env] || development);

module.exports = getObj();