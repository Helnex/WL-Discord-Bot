const { ApplicationCommandOptionType } = require("discord.js");
const interactionChoices = [
  { name: "дру", value: "дру" },
  { name: "бд", value: "бд" },
  { name: "рей", value: "рей" },
  { name: "страж", value: "страж" },
  { name: "ловчий", value: "ловчий" },
  { name: "пал", value: "пал" },
  { name: "жц", value: "жц" },
  { name: "маг", value: "маг" },
  { name: "иск", value: "иск" },
  { name: "храм", value: "храм" },
];

module.exports = {
  name: "cp",
  //deleted: true,
  description: "Создание пати на гвг на основе списка соги",
  //testOnly: true,
  devOnly: true,
  deleted: true,
  options: [
    {
      name: "п1",
      description: "Первый приоритет класса",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: interactionChoices,
    },
    {
      name: "п2",
      description: "Второй приоритет класса",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: interactionChoices,
    },
    {
      name: "п3",
      description: "Третий приоритет класса",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: interactionChoices,
    },
    {
      name: "п4",
      description: "Четвертый приоритет класса",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: interactionChoices,
    },
    {
      name: "ник_лидера",
      description: "Ник лидера пати",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "сила_группы",
      description: "Подбор в зависимости от силы шмота",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "сильная", value: "strong" },
        { name: "средняя", value: "medium" },
      ],
    },
    {
      name: "id_сообщения",
      description: "id сообщения со списком соги",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    const WL = client.guilds.cache.get("941349087905738832");
    let p1 = interaction.options.data[0].value;
    let p2 = interaction.options.data[1].value;
    let p3 = interaction.options.data[2].value;
    let p4 = interaction.options.data[3].value;
    const leaderNick = interaction.options.data[4].value;
    const groupStrength = interaction.options.data[5].value;
    const messageId = interaction.options.data[6].value;

    let members = [];
    let party = [];
    await interaction.channel.messages
      .fetch(messageId)
      .then((msg) => {
        const fullMessage = msg.content.split("\n");

        for (i = 0; i < fullMessage.length; i++) {
          const userDataMessage = fullMessage[i].split(" ");
          const user = {
            name: userDataMessage[0],
            class: userDataMessage[1],
            items: userDataMessage[2],
          };

          members.push(user);
        }
      })
      .catch((e) => console.log(e));

    const isPrior = (userClass) => {
      if (userClass == p1) {
        p1 = "";
        return true;
      } else if (userClass == p2) {
        p2 = "";
        return true;
      } else if (userClass == p3) {
        p3 = "";
        return true;
      } else if (userClass == p4) {
        p4 = "";
        return true;
      }
    };
    const dontduble = (arr, element) => {
      flag = true;
      for (let i = 0; i < arr.length; i++) {
        if (element == arr[i]) {
          flag = false;
        }
      }
      return flag;
    };
    console.log(groupStrength);
    for (let i = 0; i < members.length; i++) {
      if (party.length != 4) {
        if (members[i].items == groupStrength) {
          if (isPrior(members[i].class) && dontduble(party, members[i])) {
            party.push(members[i]);
          }
        }
      } else {
        break;
      }
    }

    if (members.length != 4) {
      for (let i = 0; i < members.length; i++) {
        if (members[i].items != groupStrength) {
          if (isPrior(members[i].class) && dontduble(party, members[i])) {
            party.push(members[i]);
          }
        }
      }
    }

    console.log(party);
    const interactionMessage = `
Пати готова:
Лидер - ${leaderNick}
${party[0].class}: ${party[0].name}
${party[1].class}: ${party[1].name} 
${party[2].class}: ${party[2].name}
${party[3].class}: ${party[3].name} 
`;
    interaction.reply(interactionMessage);
  },
};
