import getMetaData from "metadata-scraper";
import { CommandCompleteMessage } from "pg-protocol/dist/messages.js";
import * as postsRepository from "../repositories/postsRepository.js";


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

/*export async function getPosts(req, res) {
    const posts = await postsRepository.findPosts();
    console.log(posts);
    const  result = posts.rows.map(async (item) => {
      await getMetaData(item.url).then(
        (data) => {
          item = {...item,
            metaTitle: data.title,
            metaDescription: data.description,
          };
          console.log(item);
        });
    });
    res.send(result);
}*/

let c;

export async function getPosts(req, res) {
  const posts = await postsRepository.findPosts();
  const a =  posts.rows.map(item => item.url);
   for ( let i = 0; i < a.length; i++){
     c = await getMetaData(a[i]);
   };
   console.log (c);
}
