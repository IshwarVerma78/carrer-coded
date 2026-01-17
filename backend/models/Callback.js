import mongoose from "mongoose";

const callbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"]
    },

    college: {
      type: String,
      trim: true
    },

    degree: {
      type: String,
      trim: true
    },

    interest: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Callback", callbackSchema);




// import mongoose from "mongoose";

// const callbackSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     phone: String,
//     college: String,
//     degree: String,
//     interest: String
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Callback", callbackSchema);
