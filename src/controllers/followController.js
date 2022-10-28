
import {insertFollow, selectFollow,removeFollow} from "../repositories/followRepository.js"

export async function followUser(req,res){
    console.log("oiiiiiiiiiiiii")
    const { userId} = req.params;
    const {user} = res.locals;

    console.log(userId)
    console.log(res.locals)

    try{

        const checkFollow = await selectFollow(userId,user.id)

        if(checkFollow.rows[0]){
            return res.status(409).send('You already follow this user')
        }

        await insertFollow(userId,user.id)

        return res.sendStatus(201)


    }catch(error){
        console.log(error)
        res.status(500).send("Problem on following process")
    }
}

export async function unfollowUser(req,res){
    console.log("oiiiiiiiiiiiii")
    const { userId} = req.params;
    const {user} = res.locals;

    console.log(userId)
    console.log(res.locals)
    try{
        const checkFollow = await selectFollow(userId,user.id)

        console.log(checkFollow)

        if(checkFollow.rowCount === 0){
            return res.status(400).send('You do not follow this user yet')
        }

        await removeFollow(userId,user.id)

        return res.sendStatus(201)


    }catch(error){
        console.log(error)
        res.status(500).send("Problem on following process")
    }
}