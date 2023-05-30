//поиск количества сообщений от конкретного пользователя в конкретном канале
client.channels
  .fetch("1102584933731536966") //test
  .then((channel) => {
    channel.messages
      .fetch()
      .then((messages) =>
        console.log(
          `${
            messages.filter((m) => m.author.id === "465474458635993099").size
          } messages`
        )
      )
      .catch(console.error);
  })
  .catch(console.error);
