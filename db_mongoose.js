const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:27017/node-kurs');


const checkForbidenString = (value, forbidenString) => {
    if (value === forbidenString) {
        throw new Error(`Nazwa "${forbidenString}" jest zakazana`);
    }
}

//model
const userSchema = new Schema({
    name: {
        type: String,
        required: [true , 'Pole name jest wymagane'],
        minLength: [3 , 'Pole name musi mieć minimum 3 znaki'],
        validate: value => checkForbidenString(value, 'name')
    },
    email: {
        type: String,
        required: [true , 'Pole email jest wymagane'],
        trim: true,
        lowercase: true,
    },
    age: {
        type: Number,
        min: 1,
        default: 1,
    }
});

//setter
//userSchema.path('email').set((value) => value.toLowerCase());


const User = mongoose.model('User', userSchema);

async function main() {
    // const user = await User.find({});
    // console.log(user);

    const user = new User({
        name: 'Adam',
        email: '   Adam@email.com',
        age: 24,
    });

    try {
        await user.save();
    } catch (err) {
        console.log('Coś poszło nie tak');
        console.log(err.message);
    }
}

main();