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

export {searchUsers,searchUserPage}