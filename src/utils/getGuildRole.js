module.exports = (interaction, name) => {
  const role = interaction.guild.roles.cache.find((role) => role.name === name);
  return role;
};
