const greetUserInHeader = (req, res) => {
    var onlyName;
    var userName;
    
    if (req.session.username) {
      userName = JSON.stringify(req.session.username);
      onlyName = userName.replace(/["]+/g, '');
    }
    else {
      onlyName = '';
    }
}

module.exports = greetUserInHeader;
