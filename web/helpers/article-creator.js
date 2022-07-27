import { Shopify, DataType } from "@shopify/shopify-api";
import fetch from "node-fetch";
import fs from "fs";

export default async function articleCreator(settings) {
  console.log("TEST1");
  const client = new Shopify.Clients.Rest(settings.shop, settings.accessToken);
  console.log("TEST2");
  let posts = await fetch("https://blogpost-spreader.sustentabledigital.com/feed/json");
  posts = await posts.json()
  console.log("TEST3");
  posts.items.forEach(function(item){
    console.log("TEST4");
    let publishedTimestamp = Date.parse(item.date_published)/1000;
    console.log(settings.lastUpdate)
    if(publishedTimestamp > settings.lastUpdate){
      client.post({
        path: "blogs/"+settings.blogId+"/articles.json",
        type: DataType.JSON,
        data: {
          article: {
            title: item.title,
            tags: [],
            body_html: item.content_html,
            published_at: item.date_published,
            image: item.image == undefined ? {src: ""} : {src: item.image}
          }
        }
      })
    }
  })
  return parseInt(Date.now()/1000);
  
}
