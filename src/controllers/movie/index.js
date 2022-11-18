//Variable that defines the prefix of the current route
const routerBase = '/movie';
const { resolve } = require('path');
const { Movie, sequelize } = require(resolve('src', 'app', 'models'));
const axios = require('axios');
const { Op } = require("sequelize");

module.exports = function(app) {

    app.get(routerBase + '/', async (req, res)=>{
        try {
            
            const { id, title, description, director, producer, activePage } = req.query;
            const query = {};

            console.log('Producer', producer);

            if(id) query.id = id;
            if(title) query.title = {
                [Op.like]: `%${title}%`
            };
            if(description) query.description = {
                [Op.like]: `%${description}%`
            };
            if(director) query.director = {
                [Op.like]: `%${director}%`
            };
            if(producer) query.producer = {
                [Op.like]: `%${producer}%`
            };

            const movies = await Movie.findAndCountAll({
                where: query,
                limit: 10,
                offset: 10 * ((activePage || 1) - 1)
            });

            movies.totalPages = Math.ceil(movies.count / 10);

            return res.status(200).json(movies);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    });

    app.post(routerBase + '/', async (req, res)=>{
        try {
            axios.get("https://ghibliapi.herokuapp.com/films")
                .then(async ({data})=>{
                    const t = await sequelize.transaction();
                    await Movie.destroy({
                        where: {},
                        transaction: t
                    });
                    Movie.bulkCreate(data, {transaction: t, returning: true})
                        .then(async ()=>{
                            t.commit();
                            res.status(200).json('Banco de filmes atualizado!');
                        })
                        .catch(error=>{
                            t.rollback();
                            return res.status(500).json(Object.keys(error).length ? error : '');
                        });
                });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    });

    app.delete(routerBase + '/', async (req, res)=>{
        try {
            await Movie.destroy({
                where: {}
            });
            return res.status(200).json('Filmes deletados!');
        } catch (error) {
            return res.status(500).json(error.message);
        }
    });

}