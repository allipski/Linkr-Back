import connection from "../database/database.js";

export async function registerUser({email,passwordHash,username,pictureUrl}){
    const result = await  connection.query(`INSERT INTO users (email,password,name,"pictureUrl") VALUES ($1,$2,$3,$4)`,[email,passwordHash,username,pictureUrl]);
    return result;
}

export async function findUser({email}){
return connection.query(`SELECT * FROM users WHERE email=$1`,[email]);
}