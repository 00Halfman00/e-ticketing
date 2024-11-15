import mongoose from 'mongoose';
const { Schema } = mongoose;
import { PasswordManage } from '../services/password-manage';
// import { transform } from 'typescript';
/*
 issue 1  have typescript check arguments passed in to User constructor
 solution: interface used to describe properties needed to create a new User, arguments passed in
 includes steps (1-3)
*/
// step 2: An interface that describes the properties required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// step 4
// An interface that describes a property that a User Model will have, specifically, a method to build user
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// step 5: An interface used to describe the properties that a User Document has, specifically, an individual user
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// step 1: A moongose schema that describes the properties a User Model will have
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
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// hashing passwords when creating user or if password is changed
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManage.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// step 3: A function to build a user Document that will enable TypeScript to do type checking
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

export { User };
