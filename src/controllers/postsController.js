import getMetaData from "metadata-scraper";
import { CommandCompleteMessage } from "pg-protocol/dist/messages.js";
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


export async function deletePost(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    if (!req.params) {
      return res.sendStatus(404);
    }

    const postId = id;


    const { rows: postUser } = await postsRepository.verifyUserPost({
      user,
      postId,
    });


    if (!postUser[0]) {
      return res.sendStatus(404);
    }

    await postsRepository.deleteUser({ postId });

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server error");
  }
}

export async function getPosts(req, res) {
  const { userid: id } = req.headers;
 
  try {
    const posts = await postsRepository.findPosts(id);
    if (posts.rows.length === 0) {
      const following = await postsRepository.existFollowing(id);

      if (following.rows.length === 0) {
        return res.status(200).send("zero_following");
      } else {
        return res.status(200).send("zero_posts");
      }
    }

    const result = await Promise.all(
      posts.rows.map(async (item) => {
        const { title, image, description } = await getMetadata(item.url);

        const newItem = { ...item };

        newItem.metaTitle = title;
        newItem.image = image;
        newItem.metaDescription = description;

        return newItem
      })
    );

    return res.status(200).send(result.reverse());
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
