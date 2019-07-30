const scrape = require('../scripts/scrape');
const headlineController = require('../controllers/headlines');
const noteController = require ('../controllers/notes');
const express = require('express');



module.exports = router=>{
    router.get('/', (req, res)=>{
        res.render('home');
    });
    router.get('/saved', (req, res)=>{
        res.render('saved');
    });
    router.get('/api/fetch', (req, res)=>{
        headlineController.fetch((err, docs)=>{
            if(!docs || docs.insertedCount === 0){
                res.json({
                    message: 'nothing new today'
                });
    
            }
            else{
                res.json({
                    message: 'added'
                });
            }
        });
    });
    router.get('/api/headlines', (req, res)=>{
        let query = {};
        if (req.query.saved === 'true'){
            query = req.query;
        }
        headlineController.get(query, (data)=>{
            res.json(data);
        });
    });
    router.delete('/api/headlines/:id', (req,res)=>{
        let query = {};
        query._id = req.params.id;
        headlineController.delete(query, (err, data)=>{
            res.json(data);
        });
    });
    
    router.patch('/api/headline', (req, res)=>{
        headlineController.update(req.body, (err, data)=>{
            res.json(data);
        })
    });
    
    router.get('/api/notes/:healine_id?', (req, res)=>{
        let query = {};
        if (req.params.headline_id){
            query._id = req.params.headline_id
        }
        noteController.get(query, (err, data)=>{
            res.json(data);
        });
    });
    router.delete('/api/notes/:id', (req, res)=>{
        let query = {};
        query._id = req.params.id;
        noteController.delete(query, (err, data)=>{
            res.json(data);
        });
    });
    router.post('api/notes', (req, res)=>{
        noteController.save(req.body, (data)=>{
            res.json(data);
        });
    });
};
