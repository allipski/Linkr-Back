import { getHashtagPosts, getHashtags} from "../repositories/hashtagRepositiry.js";

export async function getTrendingHashtags(req,res) {
    try {
        const hashtagRows = await getHashtags();

        const hashtags = hashtagRows.map((hashtag) => {
            return hashtag.name;
        });

        res.status(200).send(hashtags);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function getHashtagPost(req,res) {
    const {hashtag} = req.params;

    try {
        const hashtagPosts = await getHashtagPosts(hashtag);

        res.status(200).send(hashtagPosts);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}