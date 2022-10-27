
import {insertFollow, selectFollow,removeFollow} from "../repositories/followRepository.js"

async function followUser(req,res){

    const { userId} = req.params;
    const {user} = res.locals;

    console.log(userId)
    console.log(user.id)

    try{
        const followerId = user.id;
        const checkFollow = await selectFollow(followerId, userId)

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

async function unfollowUser(req,res){

    const { userId} = req.params;
    const {user} = res.locals;

    console.log(userId)
    console.log(user.id)

    try{
        const followedId = user.id;
        const checkFollow = await selectFollow(followedId, userId)

        if(checkFollow.rowCount === 0){
            return res.status(409).send('You do not follow this user yet')
        }

        await removeFollow(userId,user.id)

        return res.sendStatus(201)


    }catch(error){
        console.log(error)
        res.status(500).send("Problem on following process")
    }
}

export {followUser,unfollowUser}