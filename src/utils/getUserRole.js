module.exports = (interaction, name) => {
  const role = interaction.member.roles.cache.find((role) => role.name === name);
  return role;
};
