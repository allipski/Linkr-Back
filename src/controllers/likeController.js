import * as likeRepository from "../repositories/likeRepository.js";

export async function postLikeFunction(req, res){
    const {like, url, description} = req.body;
    const { user } = res.locals;
    try{

        if(!req.body.like){
            return res.sendStatus(404);
        }
        
        const {rows: verifyPost} = await likeRepository.verifyPost({description, url});

        const postId = verifyPost[0].id;

        const {rows: verifyLikeUser} =  await likeRepository.verifylike({postId, user});

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

export async function getLikeCount(req , res){
    const { id } = req.params;

    try{

        if(!req.params){
            return res.sendStatus(404)
        }

        const { rows: namesPost } = await likeRepository.user(id)

        if(!namesPost[0].name){
            return res.sendStatus(404);
        }

        const name = namesPost[0].name;
        const {rows: likesCount} =  await likeRepository.likeCount(id) 
        const likes = likesCount[0].like;

        return res.status(200).send({name, likes})

    }catch (err){
        console.log(err)
        return res.status(500).send('server error')
    }
}

export async function deleteLike(req , res){
        const { id } = req.params;
        const { user } = res.locals;

    try{

        if(!req.params){
            return res.sendStatus(404);
        }

        const postId = id;

        const {rows: verifyLikeUser} =  await likeRepository.verifylike({postId, user})        
        console.log(verifyLikeUser[0].id)

       if(!verifyLikeUser[0].id){
          return res.sendStatus(404);
       }

       await likeRepository.dislike({user, postId})

       return res.sendStatus(204);
    }catch(err){
        console.log(err)
        return res.status(500).send("server error")
    }
}
