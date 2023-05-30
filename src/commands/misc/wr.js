const { ApplicationCommandOptionType } = require("discord.js");
const createEmbed = require("../../utils/createEmbed");
const { PythonShell } = require("python-shell");
let pyshell = new PythonShell("./src/img/test.py");
// const { spawn } = require("child_process");

module.exports = {
  name: "wr",
  deleted: true,
  description: "Бои каждого соги за неделю",
  //testOnly: true,
  devOnly: true,
  //deleted: true,
  callback: async (client, interaction) => {
    let options = {
      args: ["Sergeyeey"],
    };
    PythonShell.run("./src/img/test.py", options, function (err, result) {
      if (err) {
        console.log(err);
        console.log("пиздец");
      } else {
        console.log(result);
        console.log("раюотает");
      }
    });

    // const p = spawn("python", ["C:WO Ladder discord botsrcimg\test.py"]);
    // p.stdout.on("data", (data) => {
    //   console.log(`stdout: ${data}`);
    // });
    // p.stderr.on("data", (data) => {
    //   console.log(`stderr: ${data}`);
    // });
    // p.on("close", (code) => {
    //   console.log(`code: ${code}`);
    // });
    client.channels
      .fetch("1102584933731536966") //test
      .then((channel) => {
        channel.messages.fetch("1102585100035706931").then((msg) => {
          console.log(msg.content);
        });
      })
      .catch(console.error);
  },
};
