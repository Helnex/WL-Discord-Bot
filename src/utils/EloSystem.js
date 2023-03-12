const createEmbed = require("./createEmbed");
const updateRating = require("./updateRating");

module.exports = async (params, client, interaction) => {
  const pointsForBattle = (ratingDifference, k, s) => {
    const expectedNumberOfPoints = +(
      1 /
      (2 + 10 ** (ratingDifference / 400))
    ).toFixed(2);
    return Math.round(k * (s - expectedNumberOfPoints));
  };
  //2x2
  if (Object.keys(params).length === 4) {
    const author = await client.Users.findOne({ userId: params.authorId });
    const teammate = await client.Users.findOne({ userId: params.teammateId });

    const authorRating = author.rating2v2;
    const teammateRating = teammate.rating2v2;

    const average1 = Math.round((authorRating + teammateRating) / 2);

    const opponent1 = await client.Users.findOne({
      userId: params.opponent1Id,
    });
    const opponent2 = await client.Users.findOne({
      userId: params.opponent2Id,
    });

    const opponent1Rating = opponent1.rating2v2;
    // const opponent1Rating = 1550;
    const opponent2Rating = opponent2.rating2v2;
    // const opponent2Rating = 1250;
    const average2 = Math.round((opponent1Rating + opponent2Rating) / 2);

    const pointsForWinners = pointsForBattle(
      average1 - average2,
      (opponent1.k2v2 + opponent2.k2v2) / 2,
      // (40 + 30) / 2,
      1
    );

    const pointsForLosers = pointsForBattle(
      average2 - average1,
      (author.k2v2 + teammate.k2v2) / 2,
      0
    );
    // new rating for winners
    updateRating(
      client,
      params.opponent1Id,
      opponent1Rating + pointsForWinners,
      opponent1Rating,
      Math.max(opponent1.rating2v2, opponent1.rating3v3),
      // pointsForWinners,
      interaction,
      opponent1.rank,
      1,
      0,
      "2v2"
    );
    updateRating(
      client,
      params.opponent2Id,
      opponent2Rating + pointsForWinners,
      opponent2Rating,
      Math.max(opponent2.rating2v2, opponent2.rating3v3),
      // pointsForWinners,
      interaction,
      opponent2.rank,
      1,
      0,
      "2v2"
    );

    //new rating for losers
    updateRating(
      client,
      params.authorId,
      authorRating + pointsForLosers,
      authorRating,
      Math.max(author.rating2v2, author.rating3v3),
      // pointsForLosers,
      interaction,
      author.rank,
      0,
      1,
      "2v2"
    );
    updateRating(
      client,
      params.teammateId,
      teammateRating + pointsForLosers,
      teammateRating,
      Math.max(teammate.rating2v2, teammate.rating3v3),
      // pointsForLosers,
      interaction,
      teammate.rank,
      0,
      1,
      "2v2"
    );

    const embedTitle = `2x2 Match. Average: ${Math.round(
      (average1 + average2) / 2
    )}`;
    const embedContent = `
    Winner +${pointsForWinners}: <@${opponent1.userId}> (${opponent1Rating + pointsForWinners
      }), <@${opponent2.userId}> (${opponent2Rating + pointsForWinners})
    Looser ${pointsForLosers}: <@${author.userId}> (${authorRating + pointsForLosers
      }), <@${teammate.userId}> (${teammateRating + pointsForLosers})
    `;
    // const embedContent = `
    // Winner (average: ${average2}) +${pointsForWinners}; <@${
    //   author.userId
    // }> (${1550}), <@${author.userId}> (${1250})
    // Looser (average: ${average1}) ${pointsForLosers}; <@${author.userId}> (${
    //   authorRating + pointsForLosers
    // }), <@${teammate.userId}> (${teammateRating + pointsForLosers})
    // `;
    createEmbed(
      client,
      interaction,
      interaction.member.user.username,
      interaction.member.user.avatarURL(),
      embedTitle,
      embedContent
    ).then(async (embed) => {
      await interaction.reply({
        embeds: [embed],
      });

      client.channels
        .fetch("1084396488932732939") //2x2-battle-logs
        .then((channel) => channel.send({ embeds: [embed] }))
        .catch(console.error);
    });
  }
  //3x3
  if (Object.keys(params).length === 6) {
    const author = await client.Users.findOne({ userId: params.authorId });
    const teammate1 = await client.Users.findOne({
      userId: params.teammate1Id,
    });
    const teammate2 = await client.Users.findOne({
      userId: params.teammate2Id,
    });

    const authorRating = author.rating3v3;
    const teammate1Rating = teammate1.rating3v3;
    const teammate2Rating = teammate2.rating3v3;

    const average1 = Math.round(
      (authorRating + teammate1Rating + teammate2Rating) / 2
    );

    const opponent1 = await client.Users.findOne({
      userId: params.opponent1Id,
    });
    const opponent2 = await client.Users.findOne({
      userId: params.opponent2Id,
    });
    const opponent3 = await client.Users.findOne({
      userId: params.opponent3Id,
    });

    const opponent1Rating = opponent1.rating3v3;
    // const opponent1Rating = 1550;
    const opponent2Rating = opponent2.rating3v3;
    // const opponent2Rating = 1250;
    const opponent3Rating = opponent3.rating3v3;
    // const opponent3Rating = 1450;
    const average2 = Math.round(
      (opponent1Rating + opponent2Rating + opponent3Rating) / 2
    );

    const pointsForWinners = pointsForBattle(
      average1 - average2,
      (opponent1.k3v3 + opponent2.k3v3 + opponent3.k3v3) / 3,
      // (40 + 30 + 30) / 3,
      1
    );

    const pointsForLosers = pointsForBattle(
      average2 - average1,
      (author.k3v3 + teammate1.k3v3 + teammate2.k3v3) / 3,
      0
    );

    // new rating for winners
    updateRating(
      client,
      params.opponent1Id,
      opponent1Rating + pointsForWinners,
      opponent1Rating,
      Math.max(opponent1.rating2v2, opponent1.rating3v3),
      // pointsForWinners,
      interaction,
      opponent1.rank,
      1,
      0,
      "3v3"
    );
    updateRating(
      client,
      params.opponent2Id,
      opponent2Rating + pointsForWinners,
      opponent2Rating,
      Math.max(opponent2.rating2v2, opponent2.rating3v3),
      // pointsForWinners,
      interaction,
      opponent2.rank,
      1,
      0,
      "3v3"
    );
    updateRating(
      client,
      params.opponent3Id,
      opponent3Rating + pointsForWinners,
      opponent3Rating,
      Math.max(opponent3.rating2v2, opponent3.rating3v3),
      // pointsForWinners,
      interaction,
      opponent3.rank,
      1,
      0,
      "3v3"
    );

    //new rating for losers
    updateRating(
      client,
      params.authorId,
      authorRating + pointsForLosers,
      authorRating,
      Math.max(author.rating2v2, author.rating3v3),
      // pointsForLosers,
      interaction,
      author.rank,
      0,
      1,
      "3v3"
    );
    updateRating(
      client,
      params.teammate1Id,
      teammate1Rating + pointsForLosers,
      teammate1Rating,
      Math.max(teammate1.rating2v2, teammate1.rating3v3),
      // pointsForLosers,
      interaction,
      teammate1.rank,
      0,
      1,
      "3v3"
    );
    updateRating(
      client,
      params.teammate2Id,
      teammate2Rating + pointsForLosers,
      teammate2Rating,
      Math.max(teammate2.rating2v2, teammate2.rating3v3),
      // pointsForLosers,
      interaction,
      teammate2.rank,
      0,
      1,
      "3v3"
    );

    const embedTitle = `2x2 Match. Average: ${Math.round(
      (average1 + average2) / 2
    )}`;
    const embedContent = `
    Winner +${pointsForWinners}: <@${opponent1.userId}> (${opponent1Rating + pointsForWinners
      }), <@${opponent2.userId}> (${opponent2Rating + pointsForWinners}),  <@${opponent2.userId
      }> (${opponent2Rating + pointsForWinners})
    Looser ${pointsForLosers}: <@${author.userId}> (${authorRating + pointsForLosers
      }), <@${teammate1.userId}> (${teammate1Rating + pointsForLosers}), <@${teammate2.userId
      }> (${teammate2Rating + pointsForLosers})
    `;
    // const embedContent = `
    // Winner: +${pointsForWinners};
    // Looser ${pointsForLosers}; <@${author.userId}> (${
    //   authorRating + pointsForLosers
    // }), <@${teammate1.userId}> (${teammate1Rating + pointsForLosers}), <@${
    //   teammate2.userId
    // }> (${teammate2Rating + pointsForLosers})
    // `;
    createEmbed(
      client,
      interaction,
      interaction.member.user.username,
      interaction.member.user.avatarURL(),
      embedTitle,
      embedContent
    ).then(async (embed) => {
      await interaction.reply({
        embeds: [embed],
      });

      client.channels
        .fetch("1082323134121779212") //3x3-battle-logs
        .then((channel) => channel.send({ embeds: [embed] }))
        .catch(console.error);
    });
  }
};
