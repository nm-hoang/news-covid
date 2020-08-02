const Parser = require('rss-parser');
const Bluebird = require('bluebird');
const db = require('./services/db');
const Article = require('./services/article');
const parser = new Parser();
const Email = require('./services/email');
const cron = require('node-schedule');
const User = require('./services/user');
const TempArticle = require('./services/temp-article');

const VNEXPRESS_RSS = 'https://vnexpress.net/rss/tin-moi-nhat.rss';
const THANHNIEN_RSS = 'https://thanhnien.vn/rss/home.rss';
const rssList = [VNEXPRESS_RSS,THANHNIEN_RSS];
const SYNC_INTERVAL = Number(process.env.SYNC_INTERVAL || 3000000);



  db.sync().then(async function () {
    await Email.registerEmailSendingJob();
    for(;;){
        console.log('Start loading news...');
        await Bluebird.each(rssList, async function(rss){
        const feed = await parser.parseURL(rss);
       
        await Bluebird.each(feed.items, async function (item){
            if(!item.link){
                return;
            }
            const found = await Article.findOne({
                where: {
                    link: item.link,
                }
            });
            if(!found && item.link.includes('covid')){
                console.log('Add new article:',item.link);
                await Article.create({
                    link: item.link,
                    title: item.title,
                    content: item.contentSnippet,
                    publishedAt: new Date(item.pubDate),
                });
                
              //  Them vao danh sach tam de gui thong bao qua email
                await TempArticle.create({
                    link: item.link,
                    title: item.title,
                    content: item.contentSnippet,
                    publishedAt: new Date(item.pubDate),
                });
              
            }
        });
    });
    console.log('test');
        await Bluebird.delay(SYNC_INTERVAL);
    }
    
       

 }).catch(console.error);