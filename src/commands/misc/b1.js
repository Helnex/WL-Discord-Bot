const { ApplicationCommandOptionType } = require("discord.js");
const EloSystem = require("../../utils/EloSystem");
// const isUserRegistered = require("../../utils/isUserRegistered");

module.exports = {
  name: "b1",
  //deleted: true,
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
  devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.reply("В процессе...");
    const authorId = interaction.member.id;
    const opponentId = interaction.options.data[0].user?.id;

    const author = await client.Users.findOne({ userId: authorId });
    const opponent = await client.Users.findOne({ userId: opponentId });

    if (author != null && opponent != null) {
      EloSystem({ authorId, opponentId }, client, interaction);
    } else {
      interaction.reply(
        "Не удалось сохранить результат. Кто-то из участников не зарегистрирован и/или неправильно вызвана команда"
      );
    }
  },
};
