const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//bring in mongoose.connect
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
//declare routes
app.use(require('./routes/html.js'));
app.use(require('./routes/api.js'));

app.get('/', (req, res) => {
  console.log('/ hits=====');
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });