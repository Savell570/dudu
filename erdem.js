ODU5ODE5OTM4MDc1MTE1NTYw.YNyPtw.V9KdFOZmXvdijbC1v-LZq_Cd-1Q
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