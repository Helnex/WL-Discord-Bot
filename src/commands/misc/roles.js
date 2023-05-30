const { EmbedBuilder } = require("@discordjs/builders");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "roles",
  deleted: true,
  description: "Выдача ролей",
  //testOnly: true,
  devOnly: true,
  callback: async (client, interaction) => {
    const message = await interaction.reply({
      content: "Выбери роль своего класса!",
      fetchReply: true,
    });
    const reactionEmoji = message.guild.emojis.cache.find(
      (emoji) => emoji.name === "s7cat_6"
    );
    const reactionEmoji2 = message.guild.emojis.cache.find(
      (emoji) => emoji.name === "hwcatpain"
    );
    message.react(reactionEmoji).then(() => message.react(reactionEmoji2));
    // console.log(message.reactions);

    // function getRoleFromMention(mention) {
    //   if (!mention) {
    //     return;
    //   }
    //   if (mention.startsWith("<@&") && mention.endsWith(">")) {
    //     mention = mention.slice(3, -1);
    //     if (mention.startsWith("!")) {
    //       mention = mention.slice(1);
    //     }
    //     return mention;
    //   }
    // }

    // db = client.getMessages();
    // messageID = db[args[0]] = {};

    // let reacts = [];
    // let roles = [];
    // for (let i = 1; i < args.length; ) {
    //   reacts.push(args[i++]);
    //   roles.push(getRoleFromMention([i++]));
    // }
    // client.channels
    //   .fetch("1093919570349273108") //акичи
    //   .then((channel) =>
    //     channel.messages
    //       .fetch(args[0])
    //       .then((message) => {
    //         for (let i = 0; i < reacts.length; i++) {
    //           message.react(reacts[i]);
    //         }
    //       })
    //       .catch(console.error)
    //   )
    //   .catch(console.error);

    // for (let i = 0; i < (args.length - 1) / 2; i++) {
    //     messageID[reacts[i]] == roles[i]
    // }
  },
};
