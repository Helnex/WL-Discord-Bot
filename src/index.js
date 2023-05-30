require("dotenv").config();
const { Client, IntentsBitField, GatewayIntentBits } = require("discord.js");
const mongoose = require("mongoose");
const eventHandler = require("./handlers/eventHandler");
//const { BattleLogsModel2v2 } = require("./models/2v2BattleLogsModel");
const { UserModel } = require("./models/userModel");
const keepAlive = require("../server");
const { GuildMemberModel } = require("./models/guildMemberModel");
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Бд работает"))
  .catch((err) => console.log(err));

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
eventHandler(client);
client.Users = UserModel;
client.GuildMembers = GuildMemberModel;
//client.BattleLogs2v2 = BattleLogsModel2v2

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.channelId === "941407661147172945") {
    message.reply(message.content);
  }
});

// client.Users = UserModel

// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "reg") {
//     const gameServer = interaction.options.get("game-server")?.value;
//     const nickname = interaction.options.get("nickname")?.value;

//     interaction.reply(`${gameServer} ${nickname}`);
//   }
// });

client.login(process.env.TOKEN);
keepAlive();
