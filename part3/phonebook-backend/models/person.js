const mongoose = require("mongoose");

const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(URL, { family: 4 })
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) =>
    console.log("error connecting to MongoDB: ", error.message),
  );

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,}-\d{1,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Schema ...

module.exports = mongoose.model("Person", phoneBookSchema);
