const { Vendor } = require("../../models/Vendor");

const adminSignUp = async (req, res) => {
  const { email, password, id } = req.body;

  try {
    await Vendor.create({
      vendor_id: id,
      vendor_mail: email,
      vendor_password: password,
    });

    return res.status(200).json({ message: "Done" });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = adminSignUp
