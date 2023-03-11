const { ApplicationCommandOptionType } = require("discord.js");
const EloSystem = require("../../utils/EloSystem");
const isUserRegistered = require("../../utils/isUserRegistered");

module.exports = {
  name: "b3",
  //deleted: true,
  description: "регистрация прошедшего боя 3x3",
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
      name: "opponent3",
      description: "третий противник",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "teammate1",
      description: "твой первый тиммейт",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "teammate2",
      description: "твой первый тиммейт",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  //testOnly: true,
  devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    const authorId = interaction.member.id;
    const opponent1Id = interaction.options.data[0].user.id;
    const opponent2Id = interaction.options.data[1].user.id;
    const opponent3Id = interaction.options.data[2].user.id;
    const teammate1Id = interaction.options.data[3].user.id;
    const teammate2Id = interaction.options.data[4].user.id;

    const isHasDuplicates = (arr) => {
      return new Set(arr).size !== arr.length;
    };

    if (
      isUserRegistered(client, authorId) &&
      isUserRegistered(client, opponent1Id) &&
      isUserRegistered(client, opponent2Id) &&
      isUserRegistered(client, opponent3Id) &&
      isUserRegistered(client, teammate1Id) &&
      isUserRegistered(client, teammate2Id) &&
      !isHasDuplicates([
        authorId,
        opponent1Id,
        opponent2Id,
        opponent3Id,
        teammate1Id,
        teammate2Id,
      ])
    ) {
      EloSystem(
        {
          authorId,
          opponent1Id,
          opponent2Id,
          opponent3Id,
          teammate1Id,
          teammate2Id,
        },
        client,
        interaction
      );
    } else {
      interaction.reply(
        "Не удалось сохранить результат. Кто-то из участников не зарегистрирован и/или неправильно вызвана команда"
      );
    }
    //console.log(member.user.id);
  },
};
