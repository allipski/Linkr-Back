import * as likeRepository from "../repositories/likeRepository.js";

export async function likeFunction(req, res){
    const {like , deslike, url, description} = req.body;
    const { user } = res.locals;
    try{

        if(!req.body){
            return res.sendStatus(404);
        }
        
        const {rows: verifyPost} = await likeRepository.verifyPost({description, url});

        const postId = verifyPost[0].id;

        const {rows: verifyLikeUser} =  await likeRepository.verifylike({postId, user});

        if(verifyLikeUser[0] && deslike){
            await likeRepository.dislike({user, postId})
            return res.sendStatus(202)
        }

        if(!verifyLikeUser[0] && like){ 
            await likeRepository.like({user, postId})
            return res.sendStatus(201)         
        }
        
        return res.sendStatus(200); 
    }catch(err){
        console.log(err);
        return res.status(500).send('server error');
    }
}
