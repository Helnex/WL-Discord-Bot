const { ApplicationCommandOptionType } = require("discord.js");
const EloSystem = require("../../utils/EloSystem");
// const isUserRegistered = require("../../utils/isUserRegistered");

module.exports = {
  name: "b2",
  //deleted: true,
  description: "регистрация прошедшего боя 2x2",
  options: [
    {
      name: "opponent1",
      description: "первый противник",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "opponent2",
      description: "второй противник",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "teammate",
      description: "твой напарник",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.reply('В процессе...');
    const authorId = interaction.member.id;
    const opponent1Id = interaction.options.data[0].user?.id;
    const opponent2Id = interaction.options.data[1].user?.id;
    const teammateId = interaction.options.data[2].user?.id;

    const author = await client.Users.findOne({ userId: authorId });
    const opponent1 = await client.Users.findOne({ userId: opponent1Id });
    const opponent2 = await client.Users.findOne({ userId: opponent2Id });
    const teammate = await client.Users.findOne({ userId: teammateId });

    const isHasDuplicates = (arr) => {
      return new Set(arr).size !== arr.length;
    };

    if (
      author != null &&
      opponent1 != null &&
      opponent2 != null &&
      teammate != null &&
      !isHasDuplicates([authorId, opponent1Id, opponent2Id, teammateId])
    ) {
      EloSystem(
        { authorId, opponent1Id, opponent2Id, teammateId },
        client,
        interaction
      );
    } else {
      interaction.reply(
        "Не удалось сохранить результат. Кто-то из участников не зарегистрирован и/или неправильно вызвана команда"
      );
    }
  },
};
