const userServices = require('../services/userServices');

const userCreate = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const result = await userServices.userCreate(displayName, email, password, image);
    res.status(201).json({ token: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userCreate,
};