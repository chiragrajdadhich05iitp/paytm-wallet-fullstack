const mongoose = require('mongoose');

// Apna password daalna yahan:
const mongoURI = "mongodb+srv://admin:Admin1234@dev-m0-free.r4v2cao.mongodb.net/paytm?retryWrites=true&w=majority&appName=dev-m0-free";

mongoose.connect(mongoURI, {
  tls: true,
  tlsAllowInvalidCertificates: true
})
  .then(() => {
    console.log("Database has been connected to Atlas successfully!");
  })
  .catch((err) => {
    console.log(`Error in connecting to mongodb: ${err}`);
  });

mongoose.connection.on('error', (err) => {
  console.log(`Error in Mongoose: ${err}`);
});

module.exports = mongoose;