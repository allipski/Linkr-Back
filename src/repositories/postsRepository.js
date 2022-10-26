import connection from "../database/database.js";
import { postId } from "./likeRepository.js";

export async function createPost({ url, description, userId }) {
  const result = await connection.query(
    `INSERT INTO posts (url, description, "userId" ) VALUES ($1,$2,$3)`,
    [url, description, userId]
  );
  return result;
}

export async function findPosts(id) {
   const result = await connection.query(`SELECT posts.id, posts.url, posts.description,  users.name AS "userName", 
   users."pictureUrl" AS "userPic"
   
   FROM posts 
   
   JOIN followers ON posts."userId" = followers."userId"
   
   JOIN users ON posts."userId" = users.id
   
   WHERE followers."followerId" = $1;`, [id]);
   return result;
}

export async function existFollowing(id) {
  const result = await connection.query(`SELECT * FROM followers WHERE "followerId" = $1`, [id]);
  return result;
}

export async function verifyUserPost({user, postId}){
    return connection.query(`SELECT * FROM posts JOIN users ON users.id = posts."userId"
    WHERE users.id = $1 AND posts.id = $2;`, [user.id, postId])
}

export async function deleteUser({postId}){
    return connection.query(`DELETE FROM posts WHERE posts.id = $1;`, [postId]);
}

