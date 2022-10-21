import connection from "../database/database.js";

export async function createPost({url, description, userId}){
    const result = await connection.query(`INSERT INTO posts (url, description, "userId") VALUES ($1,$2,$3)`,[url, description, userId]);
    return result;
}

