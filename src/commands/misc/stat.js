const createEmbed = require("../../utils/createEmbed");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "stat",
  //deleted: true,
  description: "Статистика пользователя",
  //testOnly: true,
  //devOnly: true,
  options: [
    {
      name: "target-user",
      description: "Ник участника",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    const targetUserId = interaction.options.data[0].user?.id;

    const targetUser = await client.Users.findOne({ userId: targetUserId });

    if (targetUser) {
      const embedTitle = `${targetUser.nickname} statistics`;
      const embedContent1 = `
      Rating: ${targetUser.rating2v2}
      Defeats: ${targetUser.defeats2v2}
      Victories: ${targetUser.victories2v2}
      Winrate: ${targetUser.winrate2v2}%
      `;
      const embedContent2 = `
      Rating: ${targetUser.rating3v3}
      Defeats: ${targetUser.defeats3v3}
      Victories: ${targetUser.victories3v3}
      Winrate: ${targetUser.winrate3v3}%
      `;
      const fields = [
        { name: "2v2", value: embedContent1, inline: true },
        { name: "3v3", value: embedContent2, inline: true },
      ];
      createEmbed(
        client,
        interaction,
        interaction.member.user.username,
        interaction.member.user.avatarURL(),
        embedTitle,
        `Rank: ${targetUser.rank}`,
        fields
      ).then(async (embed) => {
        await interaction.reply({
          embeds: [embed],
        });
      });
    } else {
      interaction.reply("Указаный пользователь не зарегистрирован");
    }
  },
};
