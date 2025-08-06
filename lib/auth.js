import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export function signJWT(payload){
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})
}

export function verifyJWT(token){
    return jwt.verify(token?.value, process.env.JWT_SECRET)
}

export function hashPassword(password){
    return bcrypt.hash(password,10)
}

export function verifyPassword(password,hashed){
    return bcrypt.compare(password,hashed)
}