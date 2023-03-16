module.exports = async (client, id) => {
  const user =  await client.Users.findOne({ userId: id });
  // console.log(user != null);
  return (user != null);
};
