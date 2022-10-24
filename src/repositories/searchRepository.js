import connection from "../database/database.js";

async function searchUsers(name){

    const user = `SELECT id, name, "pictureUrl" FROM users WHERE name LIKE $1`;

    const result = await connection.query(user, [`${name}%`]);
    return result;
}

async function searchUserPage(id){

    const result = await connection.query(`SELECT name, "pictureUrl" FROM users WHERE id = $1`,[id])
    return result
}

async function searchUserPosts(userId){

    const posts = await connection.query(`
    SELECT
        posts.id AS "postId",
        posts."userId" AS "userId",
        posts.description,
        posts.url,
        users.name,
        users.pictureUrl

    FROM posts
    JOIN users ON users.id = posts."userId"
    WHERE posts."userId" = $1
    ORDER BY posts."createAt" DESC;
    `, [userId])

}

export {searchUsers,searchUserPage,searchUserPosts}