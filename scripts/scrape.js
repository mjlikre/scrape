const request = require('request');
const cheerio = require('cheerio');

const scrape = cb=>{
    request('http://wwww.nytimes.com', (err, res,body)=>{
        const $ = cheerio.load(body);
        const articles = []

        $('.css-8atqhb').each((i, element)=>{
            const head = $(this).children('h2').text().trim();
            const sum = S(this).children('li').text().trim();

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
    