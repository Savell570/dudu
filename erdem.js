require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login(process.env.TOKEN);
const fetch = require("node-fetch");
const fs = require("fs");

//Uptime
const oynuyor = "!add";
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
console.log(`One of the updated bots has an error! Cannot Uptime!`);
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

  client.user.setStatus("#macks yükseliyoruz");
  client.user.setActivity(oynuyor, {
    type: "#macks yükseliyoruz",
    url: "#macks yükseliyoruz"
  });
});

//komutlar

const help = new discord.MessageEmbed()
  .setFooter("Uptime Bot")
  .setColor("#660099")
  .setThumbnail(
    "https://cdn.discordapp.com/attachments/735195400872656955/771454911774851106/giphy.gif"
  )
  .setDescription(
    `Greetings, I will tell you the steps you need to do to uptime your bot. \n Now you can easily activate your bot 24/7! \n\n📜 You can type \`!add\` to uptime your bot, you will see how it is done when you type the command \n 📜 You can type \`!say\` to see the number of uptimed bots.`
  );

//Erdem ANSIN

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!add") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
return message.channel.send("Your bot is already in our system ❌");
         message.channel.send("Your bot has been successfully added to our system ✔️");
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send("Please enter a link 🤣 ");
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!say") {
    var link = spl[1];
    message.channel.send(`${db.get("linkler").length} Bot Keeping Active!`);
  }
});

client.on("message", async message => {
  if (!message.content.startsWith("!eval")) return;
  if (
    ![
      "859497498758086708",
      "IF YOU DO NOT HAVE THE ID of YOUR ASSISTANT, DELETE THE COMMANDS"
    ].includes(message.author.id)
  )
    return;
  var args = message.content.split("!eval")[1];
  if (!args) return message.channel.send(":warning: | Code?");

  const code = args;

  function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 3 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }

  var evalEmbed = "";
  try {
    var evaled = await clean(await eval(await code));
    if (evaled.constructor.name === "Promise")
      evalEmbed = `\`\`\`\n${evaled}\n\`\`\``;
    else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``;

    if (evaled.length < 1900) {
      message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
    } else {
      var hast = await require("hastebin-gen")(evaled, {
        url: "https://hasteb.in"
      });
      message.channel.send(hast);
    }
  } catch (err) {
    message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!help") {
    var link = spl[1];
    message.channel.send(help);
  }
});

//Greesha