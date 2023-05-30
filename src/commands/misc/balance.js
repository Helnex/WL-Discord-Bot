const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "баланс",
  deleted: true,
  description: "Узнать сколько голды можно вывести с выигрышных ставок",
  //testOnly: true,
  //devOnly: true,
  callback: async (client, interaction) => {
    const GuildUserId = interaction.user.id;

    const DbUser = await client.Users.findOne({ userId: GuildUserId });

    if (DbUser) {
      console.log(DbUser);
    } else {
      interaction.reply("Указаный пользователь не зарегистрирован");
    }
  },
};
