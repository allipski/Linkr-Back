import { getHashtagPosts, getHashtags} from "../repositories/hashtagRepositiry.js";
import getMetadata from "metadata-scraper";

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


        const newHashtags = await Promise.all(
            hashtagPosts.map(async (hash) => {
                const {title, image, description} = await getMetadata(hash.url);

                const newHash = {...hash};

                newHash.title = title;
                newHash.image = image;
                newHash.descriptionMeta = description;

                return newHash;
            })
        );

        console.log(newHashtags);

        res.status(200).send(newHashtags);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}