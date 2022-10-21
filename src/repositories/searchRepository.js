import connection from "../database/database.js";

async function searchUsers(name){

    const user = `SELECT id, name, "pictureUrl" FROM users WHERE name LIKE $1`;

    const result = await connection.query(user, [`${name}%`]);
    return result;
}

export default searchUsers