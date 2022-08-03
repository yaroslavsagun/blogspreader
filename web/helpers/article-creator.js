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
            template_suffix:"tcl",
            body_html: item.content_html,
            image: item.image == undefined ? {src: ""} : {src: item.image},
            metafields: [
              {
                key: "autor_tcl",
                value: item.custom_fields ? item.custom_fields.autor_tcl : "",
                type:"single_line_text_field",
                namespace: "custom"
              },
              {
                key: "min_lectura_tcl",
                value: item.custom_fields ? item.custom_fields.min_lectura_tcl : 0,
                type:"number_integer",
                namespace: "custom"
              },
              {
                key: "tags_tcl",
                value: item.custom_fields ? item.custom_fields.tags_tcl : "",
                type:"single_line_text_field",
                namespace: "custom"
              },
              {
                key: "subhead_post_tcl",
                value: item.custom_fields ? item.custom_fields.subhead_post_tcl : "",
                type:"multi_line_text_field",
                namespace: "custom"
              },
              {
                key: "caption_hero_imagen_tcl",
                value: item.custom_fields ? item.custom_fields.caption_hero_imagen_tcl : "",
                type:"multi_line_text_field",
                namespace: "custom"
              },
              {
                key: "item_completo_tcl",
                value: item.custom_fields ? item.custom_fields.item_completo_tcl : 0,
                type:"boolean",
                namespace: "custom"
              }
            ]
          }
        }
      })
    }
  })
  return parseInt(Date.now()/1000);
  
}
