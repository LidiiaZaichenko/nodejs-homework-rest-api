import User from "../models/User.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";


const signup = async(req, res)=> {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    res.json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res)=> {

}


export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}