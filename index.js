const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from server" });
});

app.get("/debounce", async (req, res) => {
  const { currency } = req.query;
  let resultData = [];

  const data = await fetch(
    `https://restcountries.com/v3.1/currency/${currency}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        data.map((item, ind) => {
          let temp = {
            name: item.name.common,
            currency,
            capital: item.capital[0],
            flag: item.flags.png,
          };
          resultData.push(temp);
        });
      }
    });
  res.status(200).json(resultData);
});

app.listen(process.env.port, () => {
  console.log(`Server running at ${process.env.port}`);
});
