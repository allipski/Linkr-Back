import {searchUsers,searchUserPosts} from "../repositories/searchRepository.js"
import getMetadata from "metadata-scraper";

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

    try{
        const userPosts = await searchUserPosts(id);
        

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
        console.log(result)
        res.status(200).send(result)

    }catch(error){
        console.log(error)
        res.status(500).send("Problem on access userrrr page")
    }
}

export  {getUser,getUserPage}