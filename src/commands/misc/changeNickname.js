const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "смена_ника",
  // deleted: true,
  description: "Смена ника и назначение ролей",
  //testOnly: true,
  //devOnly: true,
  options: [
    {
      name: "target-user",
      description: "Ник челика",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "server-nickname",
      description: "Установка никнейма на сервере",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "add-class-role",
      description: "Добавить роль класса",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    await interaction.deferReply();
    let guildUser;
    await interaction.guild.members
      .fetch(interaction.options.data[0].user.id)
      .then((member) => (guildUser = member));
    let nickname;
    if (interaction.options.data[1] != undefined) {
      nickname = interaction.options.data[1].value;
    }
    let guildRole;
    if (interaction.options.data[2] != undefined) {
      guildRole = interaction.options.data[2].role;
    }

    try {
      let message = `Добавил роль ${guildRole.name} для <@${guildUser.id}>`;
      if (guildRole != undefined) {
        await guildUser.roles.add(guildRole);
        await interaction.editReply(message);
      }
      if (nickname != undefined) {
        message += ` и сменил этому пользователю никнейм на сервере на ${nickname}`;
        await guildUser.setNickname(nickname);
        await interaction.editReply(message);
      }
    } catch (error) {
      await interaction.followUp(
        "Произошла ошибка. У бота нет прав менять никнейм у этого пользователя"
      );
    }

    // console.log(user);
    // console.log(nickname);
    // console.log(guildRole);
  },
};
