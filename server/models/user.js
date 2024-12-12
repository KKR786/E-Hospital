const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Sequence = require('./sequence')

const Schema = mongoose.Schema


const userSchema = new Schema({
  _id: {
    type: Number
  },  
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  name: {
    type: String,
    required: [true, 'Name is required!']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    required: [true, 'Blood Group is required!']
  },
  address: {
    place: {
        type: String,
    },
    coordinates: {
        type: [Number],
        index: '2dsphere',
    },
  },
  phoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid phone number'],
  },
  userType: {
    type: String,
    enum: ['Doctor', 'Therapist', 'User'],
    description: "Must be either Doctor, Therapist or User",
    required: function() {
        return this.role !== 'Supreme' && this.role !== 'Admin';
      },
  },
  department: {
    type: String,
    required: function() {
        return this.userType === 'Doctor' && this.userType === 'Therapist'
    }
  },
  degree: {
    type: String,
    required: function() {
        return this.userType === 'Doctor' && this.userType === 'Therapist'
    }
  },
  willDonateBlood: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    default: 'Member',
    enum: ['Supreme', 'Admin', 'Member'],
    description: "Must be either Supreme, Admin or Member"
  },
  dp: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  }
}, { timestamps: true });


// Signin
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  return user
}

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const sequenceDoc = await Sequence.findByIdAndUpdate(
        'userId',
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      ).exec();

      this._id = sequenceDoc.sequence_value;
    } catch (err) {
      return next(err);
    }
  }

  next();
});

// Signup
userSchema.statics.signup = async function( email, name, bloodGroup, phoneNumber, userType, 
    department, degree, willDonateBlood, dp, role, password ) {

  // validation
  if (!email || !name || !bloodGroup || !phoneNumber || !password || !willDonateBlood) {
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  if (!validBloodGroups.includes(bloodGroup)) {
    throw Error('Invalid blood group');
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    throw Error('Phone number must be a 10-digit number');
  }

  const validUserTypes = ['Doctor', 'Therapist', 'User'];
  if (![ 'Supreme', 'Admin'].includes(role) && !validUserTypes.includes(userType)) {
    throw Error('User type is required for non-Supreme/Admin roles');
  }

  if ((userType === 'Doctor' || userType === 'Therapist') && (!department || !degree)) {
    throw Error('Department and degree are required for Doctor or Therapist');
  }

  if (role && !['Supreme', 'Admin', 'Member'].includes(role)) {
    throw Error('Invalid role');
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ 
    email,
    name,
    bloodGroup,
    phoneNumber,
    userType,
    department,
    degree,
    willDonateBlood,
    role,
    dp,
    password: hash })

  return user
}

module.exports = mongoose.model('User', userSchema)