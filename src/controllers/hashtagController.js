import { connection } from "../database/database.js";

export async function getTrendingHashtags(req,res) {
    try {
        //const hashtags = await connection.query(`SELECT * FROM hashtags`)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}