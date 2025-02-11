const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 4; i++) {
    code += characters.at(Math.floor(Math.random() * characters.length));
  }

  return code;
};

module.exports = generateRandomCode;
