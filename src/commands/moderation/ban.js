const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  deleted: true,
  name: "ban",
  description: "забанить участника",
  devOnly: true,
  //testOnly: Boolean
  options: [
    {
      name: "target-user",
      description: "участник которого нужно забанить",
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "причина",
      description: "причина бана",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],

  callback: (client, interaction) => {
    interaction.reply("Ban...");
  },
};
