import * as postsRepository from "../repositories/postsRepository.js";

export async function publishPost(req, res) {
  const { userId, url, description } = req.body;
}

export async function deletePost(req , res){
  const { id } = req.params;
  const { user } = res.locals;
  console.log(user)
  try{

    if(!req.params){
      return res.sendStatus(404);
    }

    const postId = id;

    const{rows: postUser} = postsRepository.verifyUserPost({user, postId})
    console.log(postUser)

    if(!postUser[0]){
      return res.sendStatus(404);
    }
    
    postsRepository.deleteUser({postId});

    return res.sendStatus(204);
  }catch(err){
    console.log(err)
    return res.status(500).send("server error")
  }
}