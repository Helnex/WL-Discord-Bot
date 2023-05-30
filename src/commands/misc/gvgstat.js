const { ApplicationCommandOptionType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");

module.exports = {
  name: "статистика_гвг",
  //   deleted: true,
  description: "Гильдейская статистика гвг на основе отчетов",
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {
    await interaction.deferReply();

    await client.channels
      .fetch("1113141574474408027") //статистика за гвг
      .then(async (channel) => {
        channel.bulkDelete(5, true).catch(console.error);
        try {
          const dbUsers = await client.GuildMembers.find({});
          dbUsers.sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
          const space = " ";
          let message = `               Посещаемость и эффективность соги на гвг за 30 дней:          \n----------+----------------------+----------------------------------------------------------+\nНик${space.repeat(
            7
          )}| Количество пропусков |         Использование бафов и выполнение команд          |\n----------+----------------------+----------------------------------------------------------+\n`;
          let m2 = ``;
          let m3 = ``;
          let m4 = ``;
          let m5 = ``;
          let m6 = ``;
          for (member of dbUsers) {
            let res = "";
            if (member.normBuffs >= member.govnoBuffs) {
              res = "В основном норм бафы, команды выполняет";
            } else {
              res = "В основном без бафов либо с говнобафами, игнорит команды";
            }
            const content = `${
              member.nickname + space.repeat(10 - member.nickname.length)
            }| ${space.repeat(10)}${member.absence}${space.repeat(
              11 - String(member.absence).length
            )}| ${res}${space.repeat(56 - res.length)} |\n`;
            if ((message + content).length < 2000) {
              message += content;
            } else if ((m2 + content).length < 2000) {
              m2 += content;
            } else if ((m3 + content).length < 2000) {
              m3 += content;
            } else if ((m4 + content).length < 2000) {
              m4 += content;
            } else if ((m5 + content).length < 2000) {
              m5 += content;
            } else if ((m6 + content).length < 2000) {
              m6 += content;
            }
          }

          await channel.send(codeBlock(message));
          if (m2.length > 0) {
            await channel.send(codeBlock(m2));
          }
          if (m3.length > 0) {
            await channel.send(codeBlock(m3));
          }
          if (m4.length > 0) {
            await channel.send(codeBlock(m4));
          }
          if (m5.length > 0) {
            await channel.send(codeBlock(m5));
          }
          if (m6.length > 0) {
            await channel.send(codeBlock(m6));
          }
          //мс в дне 86 400 000
          //мс в минуте  60000
          //   if (date.getTime() - LastMessage.createdAt.getTime() < 1) {
          //     await updateUsers(interactionData);
          //     const dbUsers = await client.GuildMembers.find({});
          //     dbUsers.sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
          //     console.log(dbUsers);
          //     const space = " ";
          //     let message = `               Посещаемость и эффективность соги на гвг за 30 дней:          \n----------+----------------------+----------------------------------------------------------+\nНик${space.repeat(
          //       7
          //     )}| Количество пропусков |         Использование бафов и выполнение команд          |\n----------+----------------------+----------------------------------------------------------+\n`;

          //     for (member of dbUsers) {
          //       let res = "";
          //       if (member.normBuffs >= member.govnoBuffs) {
          //         res = "В основном норм бафы, команды выполняет";
          //       } else {
          //         res =
          //           "В основном без бафов либо с говнобафами, игнорит команды";
          //       }
          //       message += `${
          //         member.nickname + space.repeat(10 - member.nickname.length)
          //       }| ${space.repeat(10)}${member.absence}${space.repeat(
          //         11 - String(member.absence).length
          //       )}| ${res}${space.repeat(56 - res.length)} |\n`;
          //     }
          //     await LastMessage.edit(codeBlock(message));
          //     console.log(message.length);
          //   } else {
          //     await mongoose.connection.db.dropCollection("guildmembers");
          //     await updateUsers(interactionData);
          //     const dbUsers = await client.GuildMembers.find({});
          //     const space = " ";
          //     let message = `               Посещаемость и эффективность соги на гвг за 30 дней:          \n----------+----------------------+----------------------------------------------------------+\nНик${space.repeat(
          //       7
          //     )}| Количество пропусков |         Использование бафов и выполнение команд          |\n----------+----------------------+----------------------------------------------------------+\n`;

          //     for (member of dbUsers) {
          //       let res = "";
          //       if (member.normBuffs >= member.govnoBuffs) {
          //         res = "В основном норм бафы, команды выполняет";
          //       } else {
          //         res =
          //           "В основном без бафов либо с говнобафами, игнорит команды";
          //       }
          //       message += `${
          //         member.nickname + space.repeat(10 - member.nickname.length)
          //       }| ${space.repeat(10)}${member.absence}${space.repeat(
          //         11 - String(member.absence).length
          //       )}| ${res}${space.repeat(56 - res.length)} |\n`;
          //     }

          //     await channel.send(codeBlock(message));
          //     console.log(message.length);
          //   }
        } catch (error) {
          console.log(error);
          await interaction.editReply(
            "Произошла ошибка. Возможно, стоит попробовать позже."
          );
        }
      })
      .catch(console.error);
    await interaction.deleteReply();
  },
};
