const mongoose = require('mongoose');
const dbURI = require('./config').mongoURI;

exports.connect = () => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

}
