import * as postsRepository from "../repositories/postsRepository.js";
import getMetadata from "metadata-scraper";

export async function publishPost(req, res) {
  let { url: url, description: description, userId: userId } = req.body;

  if (description === undefined) {
    description = null;
  }

  const validateUrl = (url) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  if (!validateUrl(url)) {
    return res.status(422).send("Invalid URL format.");
  }

  try {
    await postsRepository.createPost({ url, description, userId });
    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
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

export async function getPosts(req, res) {
  try {
    const posts = await postsRepository.findPosts();

    const result = await posts.rows.map(async (item) => {
      await getMetadata(item.url).then(
        (data) => {
          item = {...item,
            metaTitle: data.title,
            metaDescription: data.description,
          }
        });
    });

    console.log(result);

    return res.status(200).send(result);
    
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  } 
}

