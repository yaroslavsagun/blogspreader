import { Shopify, DataType } from "@shopify/shopify-api";
import settings from '../../../settings.json' assert {type: 'json'};
import fetch from "node-fetch";
import fs from "fs";

export default async function articleCreator() {
  const client = new Shopify.Clients.Rest(settings.shop, settings.accessToken);
  let posts = await fetch("https://blogpost-spreader.sustentabledigital.com/feed/json");
  posts = await posts.json()
  posts.items.forEach(function(item){
    let publishedTimestamp = Date.parse(item.date_published)/1000;
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
  fs.writeFile('../../settings.json', JSON.stringify({"accessToken": settings.accessToken, "shop": settings.shop, "blogId": settings.blogId, "lastUpdate": parseInt(Date.now()/1000)}), () => {});
  
}
