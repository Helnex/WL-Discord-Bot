const getRole = require("./getGuildRole");

module.exports = async (
  client,
  id,
  newRating,
  oldRating,
  maxRating,
  interaction,
  oldRank,
  winner,
  looser,
  match
) => {
  const updateUser = async (
    client,
    id,
    rating,
    rank,
    k,
    winner,
    looser,
    match
  ) => {
    if (match === "2v2") {
      const user = await client.Users.findOne({ userId: id });
      const newDefeats = user.defeats2v2 + looser;
      const newVictories = user.victories2v2 + winner;
      const newWinrate = Math.round(
        ((user.victories2v2 + winner) /
          (user.defeats2v2 + looser + user.victories2v2)) *
          100
      );
      await client.Users.updateOne(
        { userId: id },
        {
          $set: {
            rating2v2: rating,
            rank: rank,
            k: k,
            defeats2v2: newDefeats,
            victories2v2: newVictories,
            winrate2v2: newWinrate,
          },
        }
      );
    }
    if (match === "3v3") {
      const user = await client.Users.findOne({ userId: id });
      const newDefeats = user.defeats3v3 + looser;
      const newVictories = user.victories3v3 + winner;
      const newWinrate = Math.round(
        ((user.victories3v3 + winner) /
          (user.defeats3v3 + looser + user.victories3v3)) *
          100
      );
      await client.Users.updateOne(
        { userId: id },
        {
          $set: {
            rating3v3: rating,
            rank: rank,
            k: k,
            defeats3v3: newDefeats,
            victories3v3: newVictories,
            winrate3v3: newWinrate,
          },
        }
      );
    }
  };
  const GuildUser = interaction.guild.members.cache.get(id);

  if (newRating < 1600) {
    const freshBloodRole = getRole(interaction, "FreshBlood");
    const oldRole = getRole(interaction, oldRank);
    if (maxRating < 1600) {
      updateUser(
        client,
        id,
        newRating,
        "FreshBlood",
        40,
        winner,
        looser,
        match
      );
      GuildUser.roles.remove(oldRole);
      GuildUser.roles.add(freshBloodRole);
    }
    if (maxRating >= 1600) {
      updateUser(client, id, newRating, oldRole, 40, winner, looser, match);
    }
  }
  if (newRating >= 1600 && newRating < 2000) {
    const mediumRole = getRole(interaction, "Medium");
    const oldRole = getRole(interaction, oldRank);

    if (maxRating < 2000) {
      updateUser(client, id, newRating, "Medium", 30, winner, looser, match);
      GuildUser.roles.remove(oldRole);
      GuildUser.roles.add(mediumRole);
    }
    if (maxRating >= 2000) {
      updateUser(client, id, newRating, oldRole, 30, winner, looser, match);
    }
  }
  if (newRating >= 2000 && newRating < 2400) {
    const masterRole = getRole(interaction, "Master");
    const oldRole = getRole(interaction, oldRank);

    if (maxRating < 2400) {
      updateUser(client, id, newRating, "Master", 20, winner, looser, match);
      GuildUser.roles.remove(oldRole);
      GuildUser.roles.add(masterRole);
    }
    if (maxRating >= 2400) {
      updateUser(client, id, newRating, oldRole, 20, winner, looser, match);
    }
  }
  if (newRating >= 2400) {
    updateUser(client, id, newRating, "HighSkill", 10, winner, looser);

    const highSkillRole = getRole(interaction, "HighSkill");
    const oldRole = getRole(interaction, oldRank);

    GuildUser.roles.remove(oldRole);
    GuildUser.roles.add(highSkillRole);
  }
};
