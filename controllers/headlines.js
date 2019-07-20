const scrape = require('../scripts/scrape');
const makeDate = require('../scripts/date');
const headline = require('../models/headlines');
module.exports ={
    fetch: (cb)=>{
        scrape(data=>{
            var articles = data;
            articles.forEach(article => {
                articles.date = makeDate();
                articles.saved = false;
            });
            headline.collection.insertMany(articles, {ordered:false}, (err, docs)=>{
                cb(err, docs)
            });

        });
    },
    delete: (query, cb)=>{
        headline.remove(query, cb);
    },
    get: (query, dv)=>{
        headline.find(query)
        .sort({
            _id: -1
        })
        .exec((err, doc)=>{
            cb(doc)
        });
    },
    update: (query, cb)=>{
        headline.update({_id: query._id}, {
            $set:query

        }, {}, cb);
    }
}