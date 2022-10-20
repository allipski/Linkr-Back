import * as likeRepository from "../repositories/likeRepository.js";

export async function likeFunction(req, res){
    const {like , dislike, url, description} = req.body;
    const { user } = res.locals;
    console.log(user);
    try{

        /* EM FASE DE TESTES, APENAS SALVANDO */

        /* if(!req.body){
            return res.sendStatus(404);
        }

        const {rows: verifyPost} = await likeRepository.verifyPost({description, url})
        console.log(verifyPost[0].id)

        const postId = verifyPost[0].id;

        const {rows: verifyLikeUser} =  await likeRepository.verifylike({postId, user})
        console.log(verifyLikeUser);

        return res.status(200) */

    }catch(err){
        console.log(err);
        return res.status(500).send('server error');
    }
}