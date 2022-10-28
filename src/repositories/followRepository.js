import connection from "../database/database.js";

export async function insertFollow(userId,user){

    const follow = connection.query(`INSERT INTO followers ("userId","followerId") VALUES ($1,$2)`, [userId,user]);
    return follow;
}

export async function selectFollow(user,id){
    const select = connection.query(`SELECT "id" FROM followers WHERE "userId" = $1 AND "followerId" = $2`, [user,id])
    return select;
}

export async function removeFollow(userId, user){
    const remove = connection.query(`DELETE FROM followers WHERE "userId" = $1 AND "followerId" = $2`, [userId,user])
    return remove;
}

