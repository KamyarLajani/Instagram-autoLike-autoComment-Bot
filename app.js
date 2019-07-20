const express = require("express");
const app = express();
const puppeteer = require('puppeteer');


app.get('/', (req, res)=>{
    res.send('Instagram Bot');
});

 // waking up heroku server
var http = require("http");
    setInterval(function() {
    http.get("https://kamyar.herokuapp.com");
}, 3000000); // every 50 minutes



(async ()=> {
   
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    let page  = await browser.newPage();
    // automatic login
    await page.goto('https://instagram.com/accounts/login');
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button[type="submit"]')
    await page.click('input[name="username"]');
                                            // username
    await page.type('input[name="username"]','router.js');
    await page.click('input[name="password"]');
                                            // password
    await page.type('input[name="password"]','bestprogrammer123');
    await page.click('button[type="submit"]');
    await page.waitFor(7000);

    // per hour
    let hour = setInterval(perHour, 3600000);
    let hashtags = ["html", "javascript", "coding"];
    let comments = ['Great post!', 'Great!', 'console.log("Awesome")', 'console.log("Nice!")'];
    
    let hashtagIndex = 0, commentIndex = 0;
    async function perHour(){
        if(hashtagIndex >= hashtags.length) {
            hashtagIndex = 0;
        }
        if(commentIndex >= comments.length) {
            commentIndex = 0;
        }
       
        await page.goto(`https://www.instagram.com/explore/tags/${hashtags[hashtagIndex]}/`);
       
            let func = setInterval(start, 15000);
            // count used for likes and comments count, i used for each post element
            let i=1, count=0;
                function start() {
                    // like first 25 posts
                    if(count <= 25){
                        
                        (async () => {
                        
                            posts = await page.$$('div.eLAPa');
                            // the recent hashtag posts start at 9
                            await posts[i+8].click();
                            await page.waitFor(4000);
                            
                            let like = await page.evaluate(()=>{
                                return document.querySelector('button[class="dCJp8 afkep _0mzm-"] span').getAttribute('aria-label');
                            });
                            // is not liked before?
                            if(like == "Like") {
                                await page.click('button[class="dCJp8 afkep _0mzm-"]');
                                await page.waitFor(4000);
                                await page.click('button[class="ckWGn"]');
                                       
                                count++;
                            }
                            // is liked before?
                            else {
                                await page.click('button[class="ckWGn"]');
                                        
                            }

                            i++;
                        })();
                    }
                    // 7 comments after 25 likes
                    else if(count <= 32) {
                        (async () => {
                            posts = await page.$$('div.eLAPa');
                            await posts[i+9].click();
                            await page.waitFor(4000);
                            await page.type('textarea.Ypffh', comments[commentIndex]);
                            await page.click('button[class="_0mzm- sqdOP yWX7d        "]');
                            await page.waitFor(4000);
                            await page.click('button[class="ckWGn"]');
                            count++;
                            i++;
                            commentIndex++;
                        })();
                    }
               		// stop the loop
                    else {
                        clearInterval(func);
                        
                    }
                      
                }
                start();
        // change hashtags for each hour
        hashtagIndex++;
       


    }
    perHour();
            
})();




app.listen(process.env.PORT || 3000);

