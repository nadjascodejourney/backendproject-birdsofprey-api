import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const CLIENTPORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route für die E-Mail-Verifizierung
app.get("/veri", async (req, res) => {
  const token = req.query.token;
  console.log(token);

  if (!token) {
    return res.status(400).send("Token is missing");
  }

  try {
    // Weiterleiten der Anfrage an den Backend-Server
    const response = await axios.get(
      `http://localhost:5000/veri?token=${token}`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while verifying the email" });
  }
});

app.listen(CLIENTPORT, () => {
  console.log(`Simple client listening at http://localhost:${CLIENTPORT}`);
});
