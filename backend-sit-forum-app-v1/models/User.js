import pkg from 'mongoose';
const { Schema, model } = pkg;
import pkg2 from 'bcryptjs';
const {hash, compare} = pkg2;
import pkg3 from 'jsonwebtoken';
const {sign} = pkg3;

const UserSchema = new Schema({
    avater: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
}, {timestamps: true});

//password hash
UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await hash(this.password, 10)
        return next()
    }
    return next()
});

//user token
UserSchema.methods.generateJWT = async function(){
    return await sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

const User = model("User", UserSchema);
export default User;