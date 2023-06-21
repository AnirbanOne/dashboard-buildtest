import express from 'express';
import { db } from '../db.js';
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/user/new", (req, res) => {
  try {
    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const q = "INSERT INTO `why`.`user` (`Name and surname`, `phone`, `Address`, `Username`, `Email`, `Password`, `Country`) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
      req.body.Name_and_surname,
      req.body.Phone,
      req.body.Address,
      req.body.Username,
      req.body.Email,
      hash,
      req.body.Country
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to create user" });
      }
      return res.status(200).json({ message: "User has been created" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
