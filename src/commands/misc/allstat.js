const createEmbed = require("../../utils/createEmbed");
const { ApplicationCommandOptionType } = require("discord.js");
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");

module.exports = {
  name: "allstat",
  // deleted: true,
  description: "Вся статистика на основе сохраненных боев",
  //testOnly: true,
  devOnly: true,
  callback: async (client, interaction) => {
    await interaction.reply("В процессе...");
    let message1Title = `top 50 players for all time`;
    let message1 = `
${message1Title}
----------------------------------------------------------------------------
#  Player                    Rating      Games      Win    Lose      Winrate
----------------------------------------------------------------------------\n`;
    let m2 = ``;
    let m3 = ``;

    try {
      const users = await client.Users.find().sort({ rating1v1: -1 }).limit(51);
      for (let i = 0; i < users.length - 1; i++) {
        const winrate = () => {
          const result = Math.round(
            (users[i].victories1v1 /
              (users[i].victories1v1 + users[i].defeats1v1)) *
              100
          );
          if (isNaN(result)) {
            return 0;
          } else {
            return result;
          }
        };
        const space = " ";

        const text = `${i + 1 + space.repeat(2 - String(i + 1).length)} ${
          users[i].nickname + space.repeat(26 - users[i].nickname.length)
        }  ${
          users[i].rating1v1 +
          space.repeat(10 - String(users[i].rating1v1).length)
        }  ${users[i].victories1v1 + users[i].defeats1v1}${
          space.repeat(10 - String(users[i].victories1v1).length) +
          users[i].victories1v1 +
          space.repeat(7 - String(users[i].victories1v1).length)
        }${
          users[i].defeats1v1 + space.repeat(9 - String(users[i].defeats1v1))
        } ${space.repeat(4 - (String(winrate()) + "%").length)}${winrate()}%\n`;

        if ((message1 + text).length < 1900) {
          message1 += text;
        } else if ((m2 + text).length < 1900) {
          m2 += text;
        } else if ((m3 + text).length < 1900) {
          m3 += text;
        }
      }
    } catch (error) {
      console.log(console.log(error));
    }
    client.channels
      .fetch("1100100333021184072") //1x1-statistics
      .then((channel) => {
        channel.send(codeBlock(message1));
        channel.send(codeBlock(m2));
        channel.send(codeBlock(m3));
      })
      .catch(console.error);

    await interaction.editReply("Готово");
    await interaction.deleteReply();
  },
};

// try {
//   const top50ForWeak = [];
//   const top50ForMonth = [];
//   const byField = (field) => {
//     return (a, b) => (a[field] < b[field] ? 1 : -1);
//   };
//   let message1Title = `top 50 players for weak`;
//   let message1 = `${message1Title}
// ------------------------------------------------------------------
// # Player               Rating      Games     Win  Lose   Winrate
// ------------------------------------------------------------------\n`;

//   let message2Title = `top 50 players for all time`;
//   let message2 = `${message2Title}
// ------------------------------------------------------------------
// # Player          Rating  Games     Win       Lose      Winrate
// ------------------------------------------------------------------\n`;
//   //2x2
//   //battle logs from weak
//   await client.channels
//     .fetch("1065291276594987048") //2x2 battle logs
//     .then(async (channel) => {
//       await channel.messages.fetch().then(async (messages) => {
//         const Wusers = [];
//         const lusers = [];
//         for (message of messages) {
//           const msg = message[1].embeds[0].description.split("\n");
//           const strW = msg[0];
//           const strL = msg[1];
//           lusers.push(strL);
//           Wusers.push(strW);
//         }
//         for (message of messages) {
//           const msg = message[1].embeds[0].description.split("\n");

//           const strW = msg[0];
//           // const firstWinner = strW.match(/<@..................>/g);
//           // const secondWinner = strW.split("").reverse().join("");

//           const firstWinner = strW.slice(
//             strW.indexOf("<") + 2,
//             strW.indexOf(">")
//           );
//           console.log(firstWinner);

//           const test = strW.split("").reverse().join("");
//           console.log(test.slice(test.indexOf(">") + 1, test.indexOf("<") - 1));
//           console.log(test);
//           let firstWinnerVictories = 0;
//           let firstWinnerDefeats = 0;
//           let secondWinnerVictories = 0;
//           let secondWinnerDefeats = 0;

//           for (user of Wusers) {
//             if (user.includes(firstWinner)) {
//               firstWinnerVictories += 1;
//             }
//             if (user.includes(secondWinner)) {
//               secondWinnerVictories += 1;
//             }
//           }
//           for (user of lusers) {
//             if (user.includes(firstWinner)) {
//               firstWinnerDefeats += 1;
//             }
//             if (user.includes(secondWinner)) {
//               secondWinnerDefeats += 1;
//             }
//           }
//           const firstWinnerId = firstWinner.slice(2, -1);
//           const secondWinnerId = secondWinner.slice(2, -1);

//           const guildfirstWinner = await client.guilds.cache
//             .get("941349087905738832")
//             .members.fetch(String(firstWinnerId));
//           const guildSecondWinner = await client.guilds.cache
//             .get("941349087905738832")
//             .members.fetch(String(secondWinnerId));
//           // console.log(await client.guilds.cache
//           //   .get("941349087905738832")
//           //   .members.fetch(String(firstWinnerId)))
//           // console.log(guildfirstWinner)
//           if (
//             !top50ForWeak.find(
//               (item) => parseInt(firstWinnerId) == parseInt(item.userId)
//             )
//           ) {
//             // console.log(guildfirstWinner.user)
//             // console.log(guildSecondWinner.user)
//             const { rating2v2 } = await client.Users.findOne({
//               userId: firstWinnerId,
//             });
//             top50ForWeak.push({
//               userId: firstWinnerId,
//               userName: guildfirstWinner.nickname,
//               win: parseInt(firstWinnerVictories),
//               lose: parseInt(firstWinnerDefeats),
//               rating: rating2v2,
//               winrate: Math.round(
//                 (parseInt(firstWinnerVictories) /
//                   (firstWinnerDefeats + firstWinnerVictories)) *
//                   100
//               ),
//             });
//           }
//           if (
//             !top50ForWeak.find(
//               (item) => parseInt(secondWinnerId) == parseInt(item.userId)
//             )
//           ) {
//             const { rating2v2 } = await client.Users.findOne({
//               userId: secondWinnerId,
//             });
//             top50ForWeak.push({
//               userId: secondWinnerId,
//               userName: guildSecondWinner.nickname,
//               win: parseInt(secondWinnerVictories),
//               lose: parseInt(secondWinnerDefeats),
//               rating: rating2v2,
//               winrate: Math.round(
//                 (parseInt(secondWinnerVictories) /
//                   (secondWinnerDefeats + secondWinnerVictories)) *
//                   100
//               ),
//             });
//           }
//         }
//       });
//       top50ForWeak.sort(byField("rating"));

//       let i;
//       // for (i = 0; i <= 50; i++) {
//       //   if (top50ForWeak[i]) {
//       //     let space = " ";
//       //     const userName = top50ForWeak[i].userName;
//       //     const { rating2v2 } = await client.Users.findOne({
//       //       userId: top50ForWeak[i].userId,
//       //     });

//       //     const games = String(top50ForWeak[i].win + top50ForWeak[i].lose);
//       //     const win = String(top50ForWeak[i].win);
//       //     const lose = String(top50ForWeak[i].lose);
//       //     const winrate = String(top50ForWeak[i].winrate);
//       //     message1 += `${i + 1}    ${
//       //       userName + space.repeat(16 - userName.length)
//       //     }${rating2v2 + space.repeat(6 - String(rating2v2).length)}  ${
//       //       games + space.repeat(10 - games.length)
//       //     }${win + space.repeat(10 - win.length)}${
//       //       lose + space.repeat(10 - lose.length)
//       //     }${winrate + "%"}\n`;
//       //   }
//       // }
//     });
//   // //battle logs from all time
//   // await client.channels
//   //   .fetch("1085205314120454204") //2x2 all battle logs
//   //   .then(async (channel) => {
//   //     await channel.messages.fetch().then(async (messages) => {
//   //       const Wusers = [];
//   //       const lusers = [];
//   //       for (message of messages) {
//   //         const msg = message[1].embeds[0].description.split("\n");

//   //         const strW = msg[0];
//   //         const strL = msg[1];
//   //         lusers.push(strL);
//   //         Wusers.push(strW);
//   //       }
//   //       for (message of messages) {
//   //         const msg = message[1].embeds[0].description.split("\n");

//   //         const strW = msg[0];
//   //         const firstWinner = strW.match(/<@..................>/g)[0];
//   //         const secondWinner = strW.match(/<@..................>/g)[1];

//   //         let firstWinnerVictories = 0;
//   //         let firstWinnerDefeats = 0;
//   //         let secondWinnerVictories = 0;
//   //         let secondWinnerDefeats = 0;

//   //         for (user of Wusers) {
//   //           if (user.includes(firstWinner)) {
//   //             firstWinnerVictories += 1;
//   //           }
//   //           if (user.includes(secondWinner)) {
//   //             secondWinnerVictories += 1;
//   //           }
//   //         }
//   //         for (user of lusers) {
//   //           if (user.includes(firstWinner)) {
//   //             firstWinnerDefeats += 1;
//   //           }
//   //           if (user.includes(secondWinner)) {
//   //             secondWinnerDefeats += 1;
//   //           }
//   //         }
//   //         const firstWinnerId = firstWinner.slice(2, -1);
//   //         const secondWinnerId = secondWinner.slice(2, -1);

//   //         const guildfirstWinner = await client.guilds.cache
//   //           .get("941349087905738832")
//   //           .members.fetch(String(firstWinnerId));
//   //         const guildSecondWinner = await client.guilds.cache
//   //           .get("941349087905738832")
//   //           .members.fetch(String(secondWinnerId));

//   //         if (
//   //           !top50ForMonth.find(
//   //             (item) => parseInt(firstWinnerId) == parseInt(item.userId)
//   //           )
//   //         ) {
//   //           const { rating2v2 } = await client.Users.findOne({
//   //             userId: firstWinnerId,
//   //           });
//   //           top50ForMonth.push({
//   //             userId: firstWinnerId,
//   //             userName: guildfirstWinner.nickname,
//   //             win: parseInt(firstWinnerVictories),
//   //             lose: parseInt(firstWinnerDefeats),
//   //             rating: rating2v2,
//   //             winrate: Math.round(
//   //               (parseInt(firstWinnerVictories) /
//   //                 (firstWinnerDefeats + firstWinnerVictories)) *
//   //                 100
//   //             ),
//   //           });
//   //         }
//   //         if (
//   //           !top50ForMonth.find(
//   //             (item) => parseInt(secondWinnerId) == parseInt(item.userId)
//   //           )
//   //         ) {
//   //           const { rating2v2 } = await client.Users.findOne({
//   //             userId: secondWinnerId,
//   //           });
//   //           top50ForMonth.push({
//   //             userId: secondWinnerId,
//   //             userName: guildSecondWinner.nickname,
//   //             win: parseInt(secondWinnerVictories),
//   //             lose: parseInt(secondWinnerDefeats),
//   //             rating: rating2v2,
//   //             winrate: Math.round(
//   //               (parseInt(secondWinnerVictories) /
//   //                 (secondWinnerDefeats + secondWinnerVictories)) *
//   //                 100
//   //             ),
//   //           });
//   //         }
//   //       }
//   //     });
//   //     top50ForMonth.sort(byField("rating"));

//   //     let i;
//   //     for (i = 0; i <= 50; i++) {
//   //       if (top50ForMonth[i]) {
//   //         let space = " ";
//   //         const userName = top50ForMonth[i].userName;
//   //         const { rating2v2 } = await client.Users.findOne({
//   //           userId: top50ForMonth[i].userId,
//   //         });

//   //         const games = String(
//   //           top50ForMonth[i].win + top50ForMonth[i].lose
//   //         );
//   //         const win = String(top50ForMonth[i].win);
//   //         const lose = String(top50ForMonth[i].lose);
//   //         const winrate = String(top50ForMonth[i].winrate);

//   //         message2 += `${i + 1}    ${
//   //           userName + space.repeat(16 - userName.length)
//   //         }${rating2v2 + space.repeat(6 - String(rating2v2).length)}  ${
//   //           games + space.repeat(10 - games.length)
//   //         }${win + space.repeat(10 - win.length)}${
//   //           lose + space.repeat(10 - lose.length)
//   //         }${winrate + "%"}\n`;
//   //       }
//   //     }
//   //   });
//   client.channels
//     .fetch("1084764891233140756") //2x2-weekly-statistics
//     .then((channel) => channel.send(codeBlock(message1)))
//     .catch(console.error);
//   // client.channels
//   //   .fetch("1085204771146838106") //2x2-all-statistics
//   //   .then((channel) => channel.send(codeBlock(message2)))
//   //   .catch(console.error);
//   await interaction.editReply("Готово");
//   await interaction.deleteReply();
// } catch (error) {
//   console.log(console.log(error));
//   interaction.editReply("Произошла ошибка");
// }
