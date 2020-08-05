const all = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Public Content."
    });
};
  
const user = (req, res) => {
    res.status(200).send({
        success: true,
        message: "User Content."
    });
};
  
const admin = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Admin Content."
    });
};
  
const moderator = (req, res) => {
    res.status(200).send({
        success: true,
        message: "Moderator Content."
    });
};

module.exports = {
    all,
    user,
    admin,
    moderator
}