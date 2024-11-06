import mongoose from 'mongoose';
const { Schema } = mongoose;
import { Password } from '../services/password';
import { transform } from 'typescript';
/*
 issue 1  have typescript check arguments passed in to User constructor
 solution: interface used to describe properties needed to create a new User, arguments passed in
 includes steps (1-3)
*/
// step 1
interface UserAttrs {
  email: string;
  password: string;
}

// step 4
// used to describe properties for User Model, specifically method to build user
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// used to describe properties that User Document has, individual user
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  cheese: 'cheese';
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        (ret.id = ret._id), delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// hashing passwords when creating user or if password is changed
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// step 3
userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
};

// step 2
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// step 4 // just for demo
const user = User.build({
  email: 'one@one.org',
  password: 'dkljslkf',
});

user.cheese;

export { User };