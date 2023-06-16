const { ApplicationCommandOptionType } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");

module.exports = {
  name: "состав_гильдии",
  deleted: true,
  description: "Выводит список соги с ролью класса",
  //testOnly: true,
  //devOnly: true,
  //deleted: boolean
  callback: async (client, interaction) => {},
};
