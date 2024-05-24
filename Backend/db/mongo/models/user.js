const mongoose = require('../connection/connection')
const mySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        Surname: String,
        age: Number,
        active: Boolean,
        date: {
            type: Date,
            default: new Date()
        }
    }
);

const User = new mongoose.model("user", mySchema);
mongoose.pluralize(null);

const createDoc = async () => {
    try {
        // const existingUser = await User.find({
        //     name: "def",
        //     Surname: "test",
        //     age: 31,
        //     active: true,
        //     email: "abc@gmail.com"
        // });

        // if (!existingUser) {
        const userData = [{
            name: "def",
            Surname: "test",
            age: 31,
            active: true,
            email: "def@gmail.com"
        },
        {
            name: "abc",
            Surname: "test",
            age: 21,
            active: true,
            email: "abc@gmail.com"
        },
        {
            name: "xyz",
            Surname: "qqq",
            age: 21,
            active: true,
            email: "xyz@gmail.com"
        }];
        await User.create(userData);
        // }
    } catch (err) {
        console.log("Error Occurred: ", err);
    }
}

createDoc()

module.exports = { user: User }
