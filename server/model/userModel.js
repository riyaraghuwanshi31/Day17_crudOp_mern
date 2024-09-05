import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Required!"],
        minLength: [3, "Name must contain at least 3 characters!"],
    },
    address: {
        type: String,
        required: [true, "Address Required!"],
    },
    email: {
        type: String,
        required: [true, "Email Required!"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    dob: {
        type: Date,  
        required: [true, "Date of birth Required!"],
        validate: {
            validator: function (value) {
                const today = new Date();
                const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
                return value <= fiveYearsAgo;
            },
            message: 'Date of birth must be more than 5 years old'
        },
       
    },
    password: {
        type: String,
        required: [true, "Password Required!"],
        minLength: [6, "Password must contain at least 6 characters!"],
    },
    course: {
        type: String,
        required: [true, "Course name Required!"],
    },
    collegename: {
        type: String,
        required: [true, "College name Required!"],
        minLength: [5, "College name must contain at least 5 characters!"],
    },
    mobile: {
        type: String,
        required: [true, "Mobile number Required!"],
        minLength: [10, "Mobile number must contain 10 digits"],
        maxLength: [10, "Mobile number must contain 10 digits"],
        validate: {
            validator: function (v) {
                return /^[9876]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number! It should start with 9, 8, or 7 and be followed by 9 more digits.`
        }
    }
});

export default mongoose.model("User", userSchema);
