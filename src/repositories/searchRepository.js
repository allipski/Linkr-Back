import connection from "../database/database.js";

async function searchUsers(name){

    const user = `SELECT id, name, "pictureUrl" FROM users WHERE name LIKE $1`;

    const result = await connection.query(user, [`${name}%`]);
    return result;
}

async function searchUserPosts(id){

    const result = await connection.query(` SELECT
    posts.id AS "postId",
    posts."userId" AS "userId",
    posts.description,
    posts.url,
    users.name,
    users."pictureUrl"

FROM posts
JOIN users ON users.id = posts."userId"
WHERE users.id = $1
ORDER BY posts."createdAt" DESC`,[id])
    return result
}

export {searchUsers,searchUserPosts}