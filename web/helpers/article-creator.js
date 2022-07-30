import { Shopify, DataType } from "@shopify/shopify-api";
import fetch from "node-fetch";

export default async function articleCreator(settings, lastUpdate) {
  const client = new Shopify.Clients.Rest(settings.shop, settings.accessToken);
  let posts = await fetch("https://blogpost-spreader.sustentabledigital.com/feed/json");
  posts = await posts.json()
  posts.items.forEach(function(item){
    let publishedTimestamp = Date.parse(item.date_published)/1000;
    console.log(lastUpdate);
    if(publishedTimestamp > lastUpdate){
      client.post({
        path: "blogs/"+settings.blogId+"/articles.json",
        type: DataType.JSON,
        data: {
          article: {
            title: item.title,
            tags: item.tags ? item.tags : [],
            published: 0,
            body_html: item.content_html,
            image: item.image == undefined ? {src: ""} : {src: item.image},
            metafields: [
              {
                key: "autor_tcl",
                value: "1",
                type:"single_line_text_field",
                namespace: "global"
              },
              {
                key: "min_lectura_tcl",
                value: "2",
                type:"single_line_text_field",
                namespace: "global"
              },
              {
                key: "tags_tcl",
                value: "3",
                type:"single_line_text_field",
                namespace: "global"
              },
              {
                key: "subhead_post_tcl",
                value: "4",
                type:"single_line_text_field",
                namespace: "global"
              },
              {
                key: "caption_hero_imagen_tcl",
                value: "5",
                type:"single_line_text_field",
                namespace: "global"
              },
              {
                key: "item_completo_tcl",
                value: 0,
                type:"boolean",
                namespace: "global"
              }
            ]
          }
        }
      })
    }
  })
  return parseInt(Date.now()/1000);
  
}
