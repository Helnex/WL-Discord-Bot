const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "clear",
  //deleted: true,
  description: "Удаление сообщений",
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
        await interaction.deferReply();
        interaction.channel.bulkDelete(numberOfMessages + 1, true)
        await interaction.editReply('Сообщения удалены');
        
      } catch (error) {
        console.log(error);
      }
    } else {
      interaction.reply("Вы не можете вызывать эту команду");
    }
  },
};
