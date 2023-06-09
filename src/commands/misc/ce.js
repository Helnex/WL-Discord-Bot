const {
  ApplicationCommandOptionType,
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
  codeBlock,
} = require("discord.js");
const createEmbed = require("../../utils/createEmbed");

module.exports = {
  name: "ce",
  // deleted: true,
  description: "Создание эмбеда",
  options: [
    {
      name: "embed-title",
      description: "Заголовок",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "subtitle",
      description: "Подзаголовок",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "embed-content",
      description: "Содержание эмбеда",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "image-url",
      description: "Ссылка на картинку",
      type: ApplicationCommandOptionType.String,
    },
  ],
  //testOnly: true,
  devOnly: true,
  //deleted: true,
  callback: async (client, interaction) => {
    const embedTitle = interaction.options.data[0].value;
    const subtitle = interaction.options.data[1].value;
    const embedContent = interaction.options.data[2].value;
    const imageUrl = interaction.options.data[3]?.value;
    // const embedTitle = `2x2 Match. Average: 1500`;
    //     const embedContent = `
    //     Winner +17: <@465474458635993099> (1298), <@465474458635993099> (1356)
    // Looser -20: <@465474458635993099> (1234), <@465474458635993099> (1643)
    //     `;
    const fields = [
      { name: " ", value: subtitle, inline: true },
      { name: " ", value: embedContent, inline: false },
    ];
    // const embedTitle = `1x1 Match. Average: ${Math.round((1748 + 1699) / 2)}`;
    // const embedContent = `
    // Winner +${20}: <@465556354460024845> (1748), <@465474458635993099> (1768)
    // Looser ${-10}: <@465556354460024845> (1699), <@465474458635993099> (1678)
    // `;
    createEmbed(
      client,
      interaction,
      interaction.member.user.username,
      interaction.member.user.avatarURL(),
      embedTitle,
      " ",
      fields,
      imageUrl
    ).then(async (embed) => {
      await interaction.reply({
        embeds: [embed],
      });
    });
  },
};

const classes = [
  //firstBorn
  {
    name: "druid",
    value: "druid",
  },
  {
    name: "bladeDancer",
    value: "bladeDancer",
  },
  {
    name: "ranger",
    value: "ranger",
  },
  {
    name: "warden",
    value: "warden",
  },
  {
    name: "beastMaster",
    value: "beastMaster",
  },
  //Chosen
  {
    name: "paladin",
    value: "paladin",
  },
  {
    name: "mage",
    value: "mage",
  },
  {
    name: "priest",
    value: "priest",
  },
  {
    name: "seeker",
    value: "seeker",
  },
  {
    name: "templar",
    value: "templar",
  },
  //mountainClans
  {
    name: "barbarian",
    value: "barbarian",
  },
  {
    name: "rogue",
    value: "rogue",
  },
  {
    name: "shaman",
    value: "shaman",
  },
  {
    name: "hunter",
    value: "hunter",
  },
  {
    name: "chieftain",
    value: "chieftain",
  },
  //forsaken
  {
    name: "deathKnight",
    value: "deathKnight",
  },
  {
    name: "warlock",
    value: "warlock",
  },
  {
    name: "necromancer",
    value: "necromancer",
  },
  {
    name: "charmer",
    value: "charmer",
  },
  {
    name: "reaper",
    value: "reaper",
  },
];
