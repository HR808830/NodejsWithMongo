let emailValidator = (params) => {
  let mailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (mailFormat.test(params) == false) {
    return false
  }
  else {
    return true
  }
};

let randomNumber = () => {
  let text = "";
  let possible = "0123456789";
  for (let i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}


module.exports = {
  emailValidator,
  randomNumber
}