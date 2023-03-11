require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "reg",
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
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Регистрация слеш команды...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Слеш команда успешно зарегистрирована");
  } catch (error) {
    console.log(error);
  }
})();
