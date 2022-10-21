import searchUsers from "../repositories/searchRepository.js"

async function getUser(req,res){
    const {name} = req.body
    
    try{
        const { rows: users } = await searchUsers(name);
        res.status(200).send(users);
        
        console.log({users})


    }catch(error){
        console.log(error)
        res.status(500).send("Problem on user search")
    }
}

export  {getUser}