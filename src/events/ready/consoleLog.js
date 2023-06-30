module.exports = async (client) => {
  console.log(`${client.user.tag} заработал`);

  // await Tkilla.members.fetch().then(async (members) => {
  //   a = [];
  //   b = [];
  //   f = [];
  //   for (member of members) {
  //     const nickname = member[1].nickname;

  //     if (member[1].user.bot) {
  //       continue;
  //     } else {
  //       const role = member[1].roles.cache.get("547695919957671948");
  //       if (role != undefined) {
  //         const TkillovecId = member[1].id;

  //         await FunWS.members
  //           .fetch(TkillovecId)
  //           .then((funWsMember) => {
  //             //если чел зашел на сервер(не факт что с основы)
  //             const memberNickname = funWsMember.nickname;

  //             //смотрим зареган ли челик. Если нет, то просим зарегаться
  //             if (memberNickname != null) {
  //               //проверяем зареган ли он с основы которая есть в ткиле
  //               if (memberNickname.includes("[TkillaBoom]")) {
  //                 //по сути, если у чела есть ги ткила то ему не нужно ничего писать
  //                 a.push(memberNickname);
  //                 try {
  //                   console.log(`${member[1].user.username} красавчик`);
  //                   // const msg = `Привет, ${member[1].user.username}. Просьба `
  //                   // member[1].user.send('')
  //                   // if (member[1].user.id == "465474458635993099") {
  //                   //   console.log(member[1].user);
  //                   //   const msg = ``
  //                   //   member[1].user.send(`Привет, ${member[1].user.username}. Просьба `);
  //                   // }
  //                 } catch (error) {
  //                   //если у чела закрыта личка
  //                 }
  //               } else {
  //                 b.push(member[1].user.username);
  //                 console.log(
  //                   `${member[1].user.username} зареган но не с основы`
  //                 );
  //                 //тут должна быть логика отправки сообщения с просьбой зарегаться с основы
  //               }
  //             } else {
  //               //тут сообщение с просьбой зарегаться
  //               console.log(`${member[1].user.username} зашел но не зареган`);
  //               f.push(member[1].user.username);
  //             }
  //           })
  //           .catch((error) => {
  //             //срабатывает если чел не зашел на фан вс
  //             // console.log(`Вот тут ошибка ${member[1].user.username}`);
  //             //пробую отправить ему в личку смс с просьбой о регистрации
  //             try {
  //               console.log(`${member[1].user.username} не зашел на сервер`);
  //             } catch (error) {
  //               console.log(
  //                 `Не смог отправить сообщение с просьбой о регистрации ${member[1].user.username}`
  //               );
  //             }
  //           });
  //         // break;
  //       }
  //       // if (role.name == "TkillaBoom") {
  //       //   a.push(nickname);
  //       // }
  //       // member[1].roles.cache.each(async (role) => {
  //       //   // console.log(role);
  //       //   // if (role.name != "@everyone") {
  //       //   //   const WL_Role = getGuildRole(WL, role.name);
  //       //   //   if (WL_Role != undefined) {
  //       //   //     await WL_Member.roles.add(WL_Role);
  //       //   //   }
  //       //   // }
  //       // });

  //       // console.log(role);
  //     }

  //     // break;
  //     // if (nickname != null && nickname.includes("[TkillaBoom]")) {
  //     //   a.push(nickname);
  //     //   console.log(nickname);
  //     // }
  //   }
  //   console.log(a.length);
  //   console.log(b.length);
  //   console.log(f.length);
  // });

  // dbUsers.sort((a, b) => (a.nickname > b.nickname ? 1 : -1));
  // console.log(dbUsers);

  // const FunWS = client.guilds.cache.get("1006185918769672242");
  // FunWS.members.fetch().then((members) => {
  //   a = [];
  //   for (member of members) {
  //     const nickname = member[1].nickname;

  //     if (nickname != null && nickname.includes("[TkillaBoom]")) {
  //       a.push(nickname);
  //       console.log(nickname);
  //     }
  //   }
  //   console.log(a.length);
  // });

  // low - арена шмот
  // medium +9
  // god - фул вела
  // let members = [
  //   {
  //     name: "Helnex",
  //     class: "priest",
  //     items: "medium",
  //   },
  //   {
  //     name: "Abobus",
  //     class: "bd",
  //     items: "medium",
  //   },
  //   {
  //     name: "Tvin",
  //     class: "pal",
  //     items: "medium",
  //   },
  //   {
  //     name: "vidarr",
  //     class: "mag",
  //     items: "medium",
  //   },
  //   {
  //     name: "goga",
  //     class: "rei",
  //     items: "medium",
  //   },
  //   {
  //     name: "yakut",
  //     class: "mag",
  //     items: "medium",
  //   },
  //   {
  //     name: "solnyshko",
  //     class: "mag",
  //     items: "strong",
  //   },
  //   {
  //     name: "hibgi",
  //     class: "priest",
  //     items: "strong",
  //   },
  //   {
  //     name: "low",
  //     class: "druid",
  //     items: "strong",
  //   },
  //   {
  //     name: "stas",
  //     class: "pal",
  //     items: "strong",
  //   },
  //   {
  //     name: "gnida",
  //     class: "bd",
  //     items: "strong",
  //   },
  // ];
  // let party = [];
  // // в interaction должно быть что-то типа: prior1: '', prior2: '', prior3: '', prior4: '', leader's_nickname: '', group_strength: 'god/medium'
  // let p1 = "druid";
  // let p2 = "mag";
  // let p3 = "bd";
  // let p4 = "mag";
  // group_strength = "strong";

  // const isPrior = (userClass) => {
  //   if (userClass == p1) {
  //     p1 = "";
  //     return true;
  //   } else if (userClass == p2) {
  //     p2 = "";
  //     return true;
  //   } else if (userClass == p3) {
  //     p3 = "";
  //     return true;
  //   } else if (userClass == p4) {
  //     p4 = "";
  //     return true;
  //   }
  // };
  // const dontduble = (arr, element) => {
  //   flag = true;
  //   for (let i = 0; i < arr.length; i++) {
  //     if (element == arr[i]) {
  //       flag = false;
  //     }
  //   }
  //   return flag;
  // };
  // for (let i = 0; i < members.length; i++) {
  //   if (party.length != 4) {
  //     if (members[i].items == "strong") {
  //       if (isPrior(members[i].class) && dontduble(party, members[i])) {
  //         party.push(members[i]);
  //       }
  //     }
  //   } else {
  //     break;
  //   }
  // }

  // if (members.length != 4) {
  //   for (let i = 0; i < members.length; i++) {
  //     if (members[i].items == "medium") {
  //       if (isPrior(members[i].class) && dontduble(party, members[i])) {
  //         party.push(members[i]);
  //       }
  //     }
  //   }
  // }

  // console.log(p1, p2, p3, p4);
  // console.log(party);
};
