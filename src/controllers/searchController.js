async function getUser(req,res){
    const {userId} = req.params

    try{
        const user = await connection.query("SELECT * FROM users WHERE id=$1", [userId])

        if(user.rowCount === 0)
            return res.status(404).send("User not found")

        res.status(200).send(user[0]);

    }catch(error){
        res.status(500).send("Problem on user search")
    }
}

export  {getUser}