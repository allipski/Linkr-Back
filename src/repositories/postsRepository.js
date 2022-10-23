import connection from "../database/database.js";
import { postId } from "./likeRepository.js";

export async function createPost({url, description, userId}){
    const result = await connection.query(`INSERT INTO posts (url, description, "userId") VALUES ($1,$2,$3)`,[url, description, userId]);
    return result;
}

export async function verifyUserPost({user, postId}){
    return await connection.query(`SELECT * FROM posts JOIN users ON users.id = posts."userId"
    WHERE users.id = $1 AND posts.id = $2;`, [user.id, postId])
}

export async function deleteUser({postId}){
    return await connection.query(`DELETE FROM posts WHERE posts.id = $1;`, [postId])
}