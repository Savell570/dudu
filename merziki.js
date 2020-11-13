require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Token");
const fetch = require("node-fetch");
const fs = require('fs')

//Uptime 
const oynuyor = "Youtube Merziki";
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    console.log(`Uptimelanan botlardan birinde hata var! Uptimelayamıyorum!`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

//Oynuyor


client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  console.log("Bot Aktif");

  client.user.setStatus("oynuyor");
  client.user.setActivity(oynuyor, {
    type: "STREAMING",
    url: "https://twitch.tv/merziki"
  });
});


client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "!ekle") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("Botunuz Sistemimizde Zaten Var")
    message.channel.send("Botunuz Sistemimize Başarıyla Eklendi.");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("Lütfen Bir Link Giriniz ")
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "!say") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} Bot Aktif Tutuluyor!`)
}})


client.on("message", async message => {

  if(!message.content.startsWith("!eval")) return;
  if(!["IDNIZ","YARDIMCINIZIN ID SI  YARDIMCINIZ FALAN YOKSA VİRGÜLLERİ TIRNAKLARI SİLİN"].includes(message.author.id)) return;
  var args = message.content.split("!eval")[1]
  if(!args) return message.channel.send(":warning: | Kod?")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
