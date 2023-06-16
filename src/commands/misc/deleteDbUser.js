const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "удалить_данные_об_одном_соги",
  //   deleted: true,
  description: "Удаление сохраненных данных у конкретного человека",
  options: [
    {
      name: "user",
      description: "Никнейм соги",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.deferReply();
    // const nickname = interaction.options.data[0].value;
    console.log(interaction.options.data);
    // try {
    //   await client.GuildMembers.deleteOne({
    //     nickname: nickname,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   await interaction.editReply(
    //     "Произошла ошибка. Возможно, стоит попробовать позже."
    //   );
    // }
    // await interaction.editReply(`Был удален ${nickname}`);
  },
};
