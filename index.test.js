const axios = require('axios');
const { resolve } = require('path');
const { port } = require(resolve('src', 'config'));

test('Find movies', async () => {
    const movies = await axios.get(`http://localhost:${port}/movie`);
    expect(Array.isArray(movies.data.rows)).toEqual(true);
    expect(movies.data.count >= 0).toEqual(true);
    if(movies.data.count === 0) expect(movies.data.totalPages).toEqual(0);
    else expect(movies.data.totalPages >= 0).toEqual(true);
});

test('Destroy movies', () => {
    new Promise((resolve)=>{
        axios.delete(`http://localhost:${port}/movie`)
            .then(async ()=>{
                const movies = await axios.get(`http://localhost:${port}/movie`);
                resolve(movies.data.rows.length === 0);
            })
            .catch(()=>resolve(false));
    })
        .then(result=>expect(result).toEqual(true));
});

test('Update with API - movies', () => {
    new Promise((resolve)=>{
        axios.post(`http://localhost:${port}/movie`)
            .then(()=>resolve(true))
            .catch(()=>resolve(false));
    })
        .then(result=>expect(result).toEqual(true));
});