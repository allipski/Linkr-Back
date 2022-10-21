import connection from "../database/database.js";

export async function like({user, postId}){
    const result = await connection.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`, [user.id, postId])
    return result;
}

export async function dislike({user, postId}){
    return connection.query(`DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`, [postId, user.id])
}

export async function verifyPost({description, url}){
    return connection.query(`SELECT posts.id FROM posts WHERE url = $1 AND description = $2;`, [url, description])
}

export async function verifylike({postId, user}){
    return connection.query(`
    SELECT users.id FROM likes JOIN users ON users.id = likes."userId"
    JOIN posts ON likes."postId" = posts.id WHERE "postId" = $1 AND users.id = $2;
    `, [postId, user.id])
}