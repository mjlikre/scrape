const request = require('request');
const cheerio = require('cheerio');

const scrape = cb=>{
    request('https://www.nytimes.com/', (err, res, body)=>{
        // console.log(body)
        const $ = cheerio.load(body);
        const articles = []

        $('.css-6p6lnl').each((i, element)=>{
            // console.log($(this))
            const head = $(this).children('h2').text().trim();
            const sum = $(this).children('li').text().trim();

            const dataToAdd = {
                headline: head,
                summary : sum
            };
            articles.push(dataToAdd);
        });
        cb(articles);
    });
}
module.exports= scrape;
    