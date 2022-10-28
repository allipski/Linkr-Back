import {searchUsers,searchUserPosts} from "../repositories/searchRepository.js"
import getMetadata from "metadata-scraper";
import { selectFollow } from "../repositories/followRepository.js";


async function getUser(req,res){
    
    const {name} = req.params
 
    try{
        const { rows: users } = await searchUsers(name);
        res.status(200).send(users);
        console.log({users})

    }catch(error){
        console.log(error)
        res.status(500).send("Problem on user search")
    }
}

async function getUserPage(req,res){

  
    const { id } = req.params;
    const {user} = res.locals;

    try{
        const userPosts = await searchUserPosts(id);
        let follow = await selectFollow(id,user.id)

        if(follow.rowCount ===0)
            follow=false

        else follow = true

        const result = await Promise.all(
            userPosts.rows.map(async (item) => {
              const { title, image, description } = await getMetadata(item.url);
      
              const newItem = { ...item };
      
              newItem.metaTitle = title;
              newItem.image = image;
              newItem.metaDescription = description;
      
              return newItem;
            })
          );

        res.status(200).send({result,follow})

    }catch(error){
        console.log(error)
        res.status(500).send("Problem on access userrrr page")
    }
}

export  {getUser,getUserPage}