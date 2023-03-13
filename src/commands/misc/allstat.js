const createEmbed = require("../../utils/createEmbed");
const { ApplicationCommandOptionType } = require("discord.js");
const { EmbedBuilder, codeBlock } = require("@discordjs/builders");

module.exports = {
  name: "allstat",
  //deleted: true,
  description: "Вся статистика на основе сохраненных боев",
  //testOnly: true,
  //devOnly: true,
  callback: async (client, interaction) => {
    const finallyUsers = [];
    let content = `top 50 players for March
------------------------------------------------------------------
#    Player          Rating  Games     Win       Lose      Winrate
------------------------------------------------------------------\n`;
    //2x2
    await client.channels.fetch("1065291276594987048").then(async (channel) => {
      await channel.messages.fetch().then(async (messages) => {
        const Wusers = [];
        const lusers = [];
        for (message of messages) {
          const msg = message[1].embeds[0].description.split("\n");

          const strW = msg[0];
          const strL = msg[1];
          lusers.push(strL);
          Wusers.push(strW);
        }
        for (message of messages) {
          const msg = message[1].embeds[0].description.split("\n");

          const strW = msg[0];
          const firstWinner = strW.match(/<@..................>/g)[0];
          const secondWinner = strW.match(/<@..................>/g)[1];

          let firstWinnerVictories = 0;
          let firstWinnerDefeats = 0;
          let secondWinnerVictories = 0;
          let secondWinnerDefeats = 0;

          for (user of Wusers) {
            if (user.includes(firstWinner)) {
              firstWinnerVictories += 1;
            }
            if (user.includes(secondWinner)) {
              secondWinnerVictories += 1;
            }
          }
          for (user of lusers) {
            if (user.includes(firstWinner)) {
              firstWinnerDefeats += 1;
            }
            if (user.includes(secondWinner)) {
              secondWinnerDefeats += 1;
            }
          }
          const firstWinnerId = firstWinner.slice(2, -1);
          const secondWinnerId = secondWinner.slice(2, -1);

          const guildfirstWinner = await client.guilds.cache
            .get("941349087905738832")
            .members.fetch(String(firstWinnerId));
          const guildSecondWinner = await client.guilds.cache
            .get("941349087905738832")
            .members.fetch(String(secondWinnerId));

          if (
            !finallyUsers.find(
              (item) => parseInt(firstWinnerId) == parseInt(item.userId)
            )
          ) {
            finallyUsers.push({
              userId: firstWinnerId,
              userName: guildfirstWinner.user.username,
              win: parseInt(firstWinnerVictories),
              lose: parseInt(firstWinnerDefeats),
              winrate: Math.round(
                (parseInt(firstWinnerVictories) /
                  (firstWinnerDefeats + firstWinnerVictories)) *
                  100
              ),
            });
          }
          if (
            !finallyUsers.find(
              (item) => parseInt(secondWinnerId) == parseInt(item.userId)
            )
          ) {
            finallyUsers.push({
              userId: secondWinnerId,
              userName: guildSecondWinner.user.username,
              win: parseInt(secondWinnerVictories),
              lose: parseInt(secondWinnerDefeats),
              winrate: Math.round(
                (parseInt(secondWinnerVictories) /
                  (secondWinnerDefeats + secondWinnerVictories)) *
                  100
              ),
            });
          }
        }
      });
      let i;
      for (i = 0; i <= 50; i++) {
        if (finallyUsers[i]) {
          let space = " ";
          const userName = finallyUsers[i].userName;
          const { rating2v2 } = await client.Users.findOne({
            userId: finallyUsers[i].userId,
          });

          const games = String(finallyUsers[i].win + finallyUsers[i].lose);
          const win = String(finallyUsers[i].win);
          const lose = String(finallyUsers[i].lose);
          const winrate = String(finallyUsers[i].winrate);

          content += `${i + 1}    ${
            userName + space.repeat(16 - userName.length)
          }${rating2v2 + space.repeat(6 - String(rating2v2).length)}  ${
            games + space.repeat(10 - games.length)
          }${win + space.repeat(10 - win.length)}${
            lose + space.repeat(10 - lose.length)
          }${winrate + "%"}\n`;
        }
      }
    });

    const byField = (field) => {
      return (a, b) => (a[field] < b[field] ? 1 : -1);
    };

    finallyUsers.sort(byField("win"));

    client.channels
      .fetch("1084764891233140756") //2x2-statistics
      .then((channel) => channel.send(codeBlock(content)))
      .catch(console.error);
    await interaction.reply("Готово");
    await interaction.deleteReply();
  },
};
