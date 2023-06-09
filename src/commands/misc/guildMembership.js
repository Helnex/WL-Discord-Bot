module.exports = {
  name: "состав_гильдии",
  // deleted: true,
  description: "Выводит список соги на основе ролей классов",
  //testOnly: true,
  //devOnly: true,
  callback: async (client, interaction) => {
    await interaction.deferReply();
    const Tkilla = client.guilds.cache.get("467176165027610634"); //ткила
    const classRoles = [
      //физ пал с щитом
      {
        orderNumber: 1,
        roleId: "1116029903666684065",
      },
      //маг пал с щитом
      {
        orderNumber: 2,
        roleId: "1116030063851360401",
      },
      //маг пал двуруч
      {
        orderNumber: 3,
        roleId: "1116030142263865445",
      },
      //жц
      {
        orderNumber: 4,
        roleId: "1116030244013477999",
      },
      //иск
      {
        orderNumber: 5,
        roleId: "1116030308979064924",
      },
      //маг храм с палкой
      {
        orderNumber: 6,
        roleId: "1116030347394695228",
      },
      //маг храм с щитом
      {
        orderNumber: 7,
        roleId: "1116030412217663539",
      },
      //физ храм с щитом
      {
        orderNumber: 8,
        roleId: "1116030463375577279",
      },
      //маг танк
      {
        orderNumber: 9,
        roleId: "1116030523010203699",
      },
      //маг сапорт
      {
        orderNumber: 10,
        roleId: "1116030612487291032",
      },
      //дру сапорт
      {
        orderNumber: 11,
        roleId: "1116030730494033981",
      },
      //дру дд
      {
        orderNumber: 12,
        roleId: "1116030795866447872",
      },
      //бд
      {
        orderNumber: 13,
        roleId: "1116038331487232052",
      },
      //рей
      {
        orderNumber: 14,
        roleId: "1116038523141763182",
      },
      //страж
      {
        orderNumber: 15,
        roleId: "1116038475293139057",
      },
      //ловчий
      {
        orderNumber: 16,
        roleId: "1116038374403354676",
      },
    ];
    let guildMembers = [];
    await Tkilla.members.fetch().then(async (members) => {
      for (member of members) {
        const nickname = member[1].nickname;

        if (member[1].user.bot) {
          continue;
        } else {
          const role = member[1].roles.cache.get("547695919957671948"); //роль ткилы
          if (role != undefined) {
            const userRoles = member[1].roles.cache;
            for (i = 0; i < classRoles.length; i++) {
              const userClass = userRoles.get(classRoles[i].roleId);
              if (userClass != undefined) {
                const guildUser = {
                  id: member[0],
                  class: userClass.name,
                };
                guildMembers.push(guildUser);
              }
            }
          }
        }
      }
      guildMembers.sort((a, b) => (a.class < b.class ? 1 : -1));

      let c1 = 0;
      let паладины = ``;
      let c2 = 0;
      let жрецы = ``;
      let emoji;
      await Tkilla.emojis
        .fetch("1025494746526912602")
        .then((guildEmoji) => (emoji = guildEmoji));
      let маги = ``;
      let искатели = ``;
      let храмовники = ``;
      let друиды = ``;
      let бдшки = ``;
      let реи = ``;
      let стражи = ``;
      let ловчие = ``;

      let c3 = 0;

      let c4 = 0;

      let c5 = 0;

      let c6 = 0;

      let c7 = 0;

      let c8 = 0;

      let c9 = 0;

      let c10 = 0;

      for (i = 0; i < guildMembers.length; i++) {
        if (
          guildMembers[i].class == "Физушный паладин с щитом" ||
          guildMembers[i].class == "Магический паладин с щитом" ||
          guildMembers[i].class == "Магический паладин с двуручкой"
        ) {
          паладины += `<@${guildMembers[i].id}> \n`;
          c1 += 1;
        } else if (guildMembers[i].class == "Жрец") {
          жрецы += `<@${guildMembers[i].id}> \n`;
          c2 += 1;
        } else if (
          guildMembers[i].class == "Маг танк" ||
          guildMembers[i].class == "Маг саппорт"
        ) {
          маги += `<@${guildMembers[i].id}> \n`;
          c3 += 1;
        } else if (guildMembers[i].class == "Искатель") {
          искатели += `<@${guildMembers[i].id}> \n`;
          c4 += 1;
        } else if (
          guildMembers[i].class == "Магический храмовник с палкой" ||
          guildMembers[i].class == "Магический храмовник с щитом" ||
          guildMembers[i].class == "Физушный храмовник с щитом"
        ) {
          храмовники += `<@${guildMembers[i].id}> \n`;
          c5 += 1;
        } else if (
          guildMembers[i].class == "Друид саппорт" ||
          guildMembers[i].class == "Друид дамагер"
        ) {
          друиды += `<@${guildMembers[i].id}> \n`;
          c6 += 1;
        } else if (guildMembers[i].class == "Бд") {
          бдшки += `<@${guildMembers[i].id}> \n`;
          c7 += 1;
        } else if (guildMembers[i].class == "Рейнджер") {
          реи += `<@${guildMembers[i].id}> \n`;
          c8 += 1;
        } else if (guildMembers[i].class == "Страж") {
          стражи += `<@${guildMembers[i].id}> \n`;
          c9 += 1;
        } else if (guildMembers[i].class == "Ловчий") {
          ловчие += `<@${guildMembers[i].id}> \n`;
          c10 += 1;
        }
      }
      const title = `Состав гильдии (всего ${
        c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9 + c10
      } человек):`;

      let паладиныTitle = `<:pal:1025494859206889615> Паладины (${c1}):\n${паладины}`;
      let жрецыTitle = `<:zrec:1025494695754858539> Жрецы (${c2}):\n${жрецы}`;
      let магиTitle = `<:${emoji.name}:${emoji.id}> Маги (${c3}):\n${маги}`;
      let искателиTitle = `<:isk:1025494588451995720> Искатели (${c4}):\n${искатели}`;
      let храмовникиTitle = `<:xram:1025494626750185544> Храмовники (${c5}):\n${храмовники}`;
      let друидыTitle = `<:druid:1025494270276276385> Друиды (${c6}):\n${друиды}`;
      let бдшкиTitle = `<:bd:1025494413847310457> Бдшки (${c7}):\n${бдшки}`;
      let реиTitle = `<:rei:1046141077310160978> Реи (${c8}):\n ${реи}`;
      let стражиTitle = `<:straz:1025494517459202048> Стражи (${c9}):\n${стражи}`;
      let ловчиеTitle = `<:lovchiy:1025507011456143421> Ловчие (${c10}):\n${ловчие}`;
      await client.channels
        .fetch("1116046507955728496") //состав гильдии
        .then(async (channel) => {
          await channel.send(title);
          await channel.send(паладиныTitle);
          await channel.send(жрецыTitle);
          await channel.send(магиTitle);
          await channel.send(искателиTitle);
          await channel.send(храмовникиTitle);
          await channel.send(друидыTitle);
          await channel.send(бдшкиTitle);
          await channel.send(реиTitle);
          await channel.send(стражиTitle);
          await channel.send(ловчиеTitle);
        })
        .catch(async (e) => {
          console.log(e);
          await interaction.editReply("Произошла ошибка");
        });

      await interaction.editReply("Готово");
    });
  },
};
