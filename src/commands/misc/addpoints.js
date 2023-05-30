const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed");
module.exports = {
  name: "addpoints",
  // deleted: true,
  description: "Добавление рейтинга",
  options: [
    {
      name: "nickname",
      description: "target-user",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "category",
      description: "category",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "1x1",
          value: "1x1",
        },
        {
          name: "2x2",
          value: "2x2",
        },
        {
          name: "3x3",
          value: "3x3",
        },
      ],
      required: true,
    },
    {
      name: "rating",
      description: "rating-points",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
  //testOnly: true,
  devOnly: true,
  //deleted: true,
  callback: async (client, interaction) => {
    await interaction.reply("В процессе...");

    const userId = interaction.options.data[0].user.id;
    const category = interaction.options.data[1].value;
    const rating = interaction.options.data[2].value;

    let messageContent = "";

    try {
      if (category == "1x1") {
        const user = await client.Users.findOneAndUpdate(
          { userId: userId },
          { $inc: { rating1v1: rating } },
          { new: true }
        );

        messageContent = `<@${userId}> получает ${rating} рейтинга в категории ${category} (${user.rating1v1}).`;
      }
      if (category == "2x2") {
        const user = await client.Users.findOneAndUpdate(
          { userId: userId },
          { $inc: { rating2v2: rating } },
          { new: true }
        );

        messageContent = `<@${userId}> получает ${rating} рейтинга в категории ${category} (${user.rating2v2}).`;
      }
      if (category == "3x3") {
        const user = await client.Users.findOneAndUpdate(
          { userId: userId },
          { $inc: { rating3v3: rating } },
          { new: true }
        );
        messageContent = `<@${userId}> получает ${rating} рейтинга в категории ${category} (${user.rating3v3}).`;
      }
    } catch (error) {
      await interaction.followUp("Произошла ошибка");
      console.log(error);
    }

    await interaction.editReply(messageContent);
  },
};
