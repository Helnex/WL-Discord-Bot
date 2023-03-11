const { ApplicationCommandOptionType } = require("discord.js");
const { UserModel } = require("../../models/userModel");
const getGuildRole = require("../../utils/getGuildRole");
const getUserRole = require("../../utils/getUserRole");

module.exports = {
  name: "reg",
  //deleted: true,
  description: "регистрация на сервере",
  options: [
    {
      name: "game-server",
      description: "твой сервер в warspear",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Amber",
          value: "Amber",
        },
        {
          name: "Topaz",
          value: "Topaz",
        },
        {
          name: "Ruby",
          value: "Ruby",
        },
      ],
      required: true,
    },
    {
      name: "nickname",
      description: "имя твоего основного персонажа",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  //devOnly: Boolean
  //testOnly: Boolean
  //deleted: boolean
  callback: async (client, interaction) => {
    const role = getUserRole(interaction, "беспартийный");

    if (role === undefined) {
      interaction.reply(
        `Эту команду можно вызвать только незарегистрированным пользователям`
      ); //941403904132919307 - создание профиля
    } else {
      if (
        interaction.options.data[1].value.length < 3 ||
        interaction.options.data[1].value.includes(" ") ||
        interaction.options.data[1].value.match(/[a-zA-Z]/g).length !=
          interaction.options.data[1].value.length
      ) {
        interaction.reply(
          "Никнейм слишком короткий и/или содержит недопустимые символы"
        );
      } else {
        const data = interaction.options.data;
        const gameServer = data[0].value;
        const nickname = data[1].value;
        authorId = interaction.user.id;

        const user = await client.Users.findOne({ userId: authorId });
        if (user == null) {
          const newUser = new client.Users({
            server: gameServer,
            nickname: nickname,
            userId: authorId,
            rating2v2: 1200,
            rating3v3: 1200,
            rank: "FreshBlood",
            k2v2: 40,
            k3v3: 40,
            defeats2v2: 0,
            victories2v2: 0,
            winrate2v2: 0,
            defeats3v3: 0,
            victories3v3: 0,
            winrate3v3: 0,
          });
          newUser.save();

          const FreshBloodRole = getGuildRole(interaction, "FreshBlood");
          const ServerRole = getGuildRole(interaction, gameServer);
          const StartRole = getGuildRole(interaction, "беспартийный");
          const GuildUser = interaction.guild.members.cache.get(authorId);

          GuildUser.roles.add(FreshBloodRole);
          GuildUser.roles.add(ServerRole);
          GuildUser.roles.remove(StartRole);
          interaction.reply("Регистрация прошла успешно");
        } else {
          interaction.reply("Вы уже зарегистрированы"); //если пользователь при выходе с сервера будет стираться из бд, то это не нужно
        }
      }
    }
  },
};
