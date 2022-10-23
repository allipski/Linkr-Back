import {searchUsers,searchUserPage} from "../repositories/searchRepository.js"

async function getUser(req,res){
    const {name} = req.params
    console.log(name)
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
        const userPage = await searchUserPage(id);
        res.status(200).send(userPage)

    }catch(error){
        console.log(error)
        res.status(500).send("Problem on access user page")
    }
}

export  {getUser,getUserPage}