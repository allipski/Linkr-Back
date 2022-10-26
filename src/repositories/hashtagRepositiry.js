import connection from "../database/database.js";

export async function getHashtags() {
    const result = await connection.query(
        `SELECT hashtags.name, 
        COUNT(posts_hashtags) AS count
        FROM hashtags 
        JOIN posts_hashtags ON posts_hashtags."hashtagId" = hashtags.id 
        GROUP BY hashtags.name ORDER BY count DESC LIMIT 10;`);

        return result.rows;
}

export async function getHashtagPosts(props) {
    const result = await connection.query(`
    SELECT posts.id, users.name, posts.url, posts.description, users."pictureUrl" as "userImg"
    FROM posts
    JOIN users ON posts."userId"=users.id
    JOIN posts_hashtags ON posts.id=posts_hashtags."postId"
    JOIN hashtags ON posts_hashtags."hashtagId"=hashtags.id
    WHERE hashtags.name = $1;`, [props]);

    return result.rows;
}

export async function postHashtag(hashtag, postId) {
    const checkHashtag = await connection.query(`
    SELECT * FROM hashtags WHERE name=$1`,[hashtag]);

    let hashtagId;

    if(!checkHashtag.rowCount) {
        hashtagId = await connection.query(`
        INSERT INTO hashtags (name) VALUES ($1) RETURNING id`,[hashtag]);

        hashtagId = hashtagId.rows[0].id;
    } else {
        hashtagId = checkHashtag.rows[0].id;
    }

    await connection.query(`
    INSERT INTO posts_hashtags ("postId", "hashtagId") VALUES ($1, $2)`, [postId, hashtagId]);
}