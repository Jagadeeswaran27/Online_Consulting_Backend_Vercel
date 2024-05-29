const User = require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.postAppointConsult = (req, res, next) => {
  const cid = req.body.consultantId;
  const token = req.body.token;
  const date = req.body.date;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (err) {
    console.error(err);
  }
  if (!decodedToken) {
    const error = new Error("Not Authorized");
    error.satusCode = 401;
    throw error;
  }
  if (decodedToken) {
    const userId = decodedToken.user._id;
    User.findOne({ _id: userId })
      .then((user) => {
        const existingConsultations = user.consultationsWith;
        const newObj = { consultantId: cid, date: date };
        existingConsultations.push(newObj);
        user.consultationsWith = existingConsultations;
        user.save().then(() => {
          res.json({ message: "Booked!" });
        });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(500).send({ message: "No current session found!" });
  }
};
