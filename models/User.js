const { Schema, model } = require('mongoose');
const { isEmail, isLength } = require('validator');
const { compare, genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, 'You must provide name'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address'],
    required: [true, 'You must provide an email address'],
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    validate: [(value) => isLength(value, { min: 6 }), 'Your password must be at least 6 characters long'],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
});

// UserSchema.methods.toJSON = function() {
//   var obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    const isMatch = await compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    return Promise.reject(e);
  }
};

UserSchema.pre('save', async function (next) {
  // gets access to the user model that is currently being saved
  const user = this;

  if (user.isModified('password')) {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(user.password, salt);
      // overwrite the plain text password with our hash
      user.password = hashedPassword;
    } catch (e) {
      next(e);
    }
  }

  // Finally call save
  next();
});

module.exports = model('User', UserSchema);
