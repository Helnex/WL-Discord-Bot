const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "clear",
  //deleted: true,
  description: "Статистика пользователя",
  //testOnly: true,
  devOnly: true,
  options: [
    {
      name: "number-of-messages",
      description: "Количество сообщений",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    if (interaction.member.roles.cache.has("953667892216492063")) {
      const numberOfMessages = interaction.options.data[0].value;
      try {
        interaction.channel.bulkDelete(numberOfMessages);
        interaction.reply("Сообщения удалены");
        interaction.deleteReply();
      } catch (error) {
        console.log(error);
      }
    } else {
      interaction.reply("Вы не можете вызывать эту команду");
    }
  },
};
