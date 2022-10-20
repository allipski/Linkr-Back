import connection from "../database/database.js"

export async function likeFunction(req, res){
    const {like , dislike} = req.body;
    try{

        

    }catch(err){
        console.log(err);
        return res.status(500).send('server error');
    }
}