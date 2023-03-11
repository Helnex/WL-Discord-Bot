const { EmbedBuilder } = require("@discordjs/builders");

module.exports = async (
  client,
  interaction,
  authorName,
  iconURL,
  embedTitle,
  embedContent,
  fields,
  imageUrl
) => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: authorName,
      iconURL: iconURL,
    })
    .setTitle(embedTitle)
    .setColor(0xffff00)
    .setDescription(embedContent)
    .setTimestamp()
    .addFields(fields ? fields : { value: " ", name: " " })
    .setImage(imageUrl);

  return embed;
};
