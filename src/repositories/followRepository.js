import connection from "../database/database.js";

export async function insertFollow(userId,user){

    const follow = connection.query(`INSERT INTO followers ("userId","followerId") VALUES ($1,$2)`, [userId,user]);
    return follow;
}

export async function selectFollow(followerId, userId){
    const select = connection.query(`SELECT * FROM followers WHERE "userId" = $1 AND "followerId" = $2`, [userId,followerId])
    return select;
}

export async function removeFollow(userId, followedId){
    const remove = connection.query(`DELETE FROM followers WHERE "userId" = $1 AND "followerId" = $2`, [userId,followedId])
    return remove;
}

