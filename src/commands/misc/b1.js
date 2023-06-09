const { ApplicationCommandOptionType } = require("discord.js");
const EloSystem = require("../../utils/EloSystem");
// const isUserRegistered = require("../../utils/isUserRegistered");

module.exports = {
  name: "b1",
  // deleted: true,
  description: "регистрация прошедшего боя 1x1",
  options: [
    {
      name: "opponent",
      description: "твой противник",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    // await interaction.reply("В процессе...");
    await interaction.deferReply();
    const authorId = interaction.member.id;
    const opponentId = interaction.options.data[0].user?.id;

    const author = await client.Users.findOne({ userId: authorId });
    const opponent = await client.Users.findOne({ userId: opponentId });
    try {
      if (author != null && opponent != null) {
        await EloSystem({ authorId, opponentId }, client, interaction);
      } else {
        await interaction.editReply(
          "Не удалось сохранить результат. Кто-то из участников не зарегистрирован и/или неправильно вызвана команда"
        );
      }
    } catch (e) {
      await interaction.editReply(
        "Произошла ошибка. Скорее всего один из участников не зарегистрирован."
      );
    }
  },
};
