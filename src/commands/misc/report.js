const { ApplicationCommandOptionType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");
// const isUserRegistered = require("../../utils/isUserRegistered");
const commandChoices = [
  {
    name: "бафается, слушается, вообще красавчик",
    value: "1",
  },
  {
    name: "говнобафы или без бафов, не выполняет команды",
    value: "2",
  },
  {
    name: "проеб гвг",
    value: "3",
  },
];

module.exports = {
  name: "отчет",
  // deleted: true,
  description: "Отчет лидера пати за гвг",
  options: [
    {
      name: "первый_участник",
      description: "первый член группы",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "действия_первого",
      description: "эффективность на гвг",
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: commandChoices,
    },

    {
      name: "второй_участник",
      description: "второй член группы",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "действия_второго",
      description: "эффективность на гвг",
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: commandChoices,
    },

    {
      name: "третий_участник",
      description: "второй член группы",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "действия_третьего",
      description: "эффективность на гвг",
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: commandChoices,
    },

    {
      name: "четвертый_участник",
      description: "третий член группы",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "действия_четвертого",
      description: "эффективность на гвг",
      type: ApplicationCommandOptionType.Number,
      required: true,
      choices: commandChoices,
    },
  ],
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.deferReply();
    let t1Nick = interaction.options.data[0].user.username;
    let t2Nick = interaction.options.data[2].user.username;
    let t3Nick = interaction.options.data[4].user.username;
    let t4Nick = interaction.options.data[6].user.username;

    const t1Id = interaction.options.data[0].user.id;
    const t2Id = interaction.options.data[2].user.id;
    const t3Id = interaction.options.data[4].user.id;
    const t4Id = interaction.options.data[6].user.id;

    const createDbUser = async (nickname, id, value) => {
      const DB_user = await client.GuildMembers.findOne({
        id: id,
      });

      if (DB_user == null) {
        const newUser = new client.GuildMembers({
          nickname: nickname,
          id: id,
          absence: 0,
          normBuffs: 0,
          govnoBuffs: 0,
        });
        await newUser.save();

        if (value == 1) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                normBuffs: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        } else if (value == 2) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                govnoBuffs: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        } else if (value == 3) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                absence: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        }
      } else {
        if (value == 1) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                normBuffs: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        } else if (value == 2) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                govnoBuffs: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        } else if (value == 3) {
          const DB_user = await client.GuildMembers.findOneAndUpdate(
            { id: id },
            {
              $inc: {
                absence: 1,
              },
            },
            { new: true }
          );
          return DB_user;
        }
      }
    };
    const updateUsers = async (interactionData) => {
      for (i = 0; i < interactionData.length; i += 2) {
        const id = interactionData[i].value;
        const value = interactionData[i + 1].value;
        const nickname = interactionData[i].member.nickname;
        await createDbUser(nickname, id, value);
      }
    };
    try {
      let interactionData = interaction.options.data;
      await updateUsers(interactionData);
    } catch (error) {
      await interaction.editReply(
        "Не удалось сохранить результат. Скорее всего команда вызвана неправильно"
      );
      console.log(console.log(error));
    }
    let e1 = interaction.options.data[1].value;
    if (e1 == 1) {
      e1 = "команды выполняет, бафается хорошо";
    } else if (e1 == 2) {
      e1 = "не слушает команды, плохо/вообще не бафается";
    } else if (e1 == 3) {
      e1 = "пропустил гвг";
    }

    let e2 = interaction.options.data[3].value;
    if (e2 == 1) {
      e2 = "команды выполняет, бафается хорошо";
    } else if (e2 == 2) {
      e2 = "не слушает команды, плохо/вообще не бафается";
    } else if (e2 == 3) {
      e2 = "пропустил гвг";
    }

    let e3 = interaction.options.data[5].value;
    if (e3 == 1) {
      e3 = "команды выполняет, бафается хорошо";
    } else if (e3 == 2) {
      e3 = "не слушает команды, плохо/вообще не бафается";
    } else if (e3 == 3) {
      e3 = "пропустил гвг";
    }

    let e4 = interaction.options.data[7].value;
    if (e4 == 1) {
      e4 = "команды выполняет, бафается хорошо";
    } else if (e4 == 2) {
      e4 = "не слушает команды, плохо/вообще не бафается";
    } else if (e4 == 3) {
      e4 = "пропустил гвг";
    }

    const interactionMessage = `Сохранен следующий результат: \n<@${t1Id}> ${e1}\n<@${t2Id}> ${e2}\n<@${t3Id}> ${e3}\n<@${t4Id}> ${e4}`;
    await interaction.editReply(interactionMessage);
  },
};
// "testServer": "467176165027610634",//ткила
// "testServer": "941349087905738832",

// console.log(DB_user);
//       if (DB_user == null) {
//         const newUser = new client.GuildMembers({
//           nickname: nickname,
//           absence: 0,
//           normBuffs: 0,
//           govnoBuffs: 0,
//         });
//         newUser.save();
//       }
