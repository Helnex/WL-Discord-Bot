const { ApplicationCommandOptionType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");

module.exports = {
  name: "удалить_сохраненные_отчеты",
  // deleted: true,
  description: "Удаление всех сохраненных отчетов",
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.deferReply();
    try {
      await mongoose.connection.db.dropCollection("guildmembers");
    } catch (error) {
      console.log(error);
      await interaction.editReply(
        "Произошла ошибка. Скорее всего хостинг не может подключиться к базе данных. Нужно попробовать позже"
      );
    }
    await interaction.editReply("Удаление прошло успешно");
  },
};
