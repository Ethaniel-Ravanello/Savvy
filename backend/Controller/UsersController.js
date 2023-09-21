import Users from "../Models/Users.js";

export const getUserById = async(req, res) => {
    const {userId} = req.body
    try{
        const response = await Users.findById(userId)
        if(!response){
            return res.status(400).json({message: "User Not Found"})
        }
        return res.status(200).json(response)
    }
    catch{
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateUserById = async(req, res) => {
    const {userId} = req.body
    try{
        const response = await Users.findByIdAndUpdate(userId, req.body, {
            new: true
        })
        if(!response){
           return res.status(400).json({message: "User Not Found"})
        }
        return res.status(200).json(response)
    }
    catch{
        return res.status(500).json({message : "Internal Server Error"})
    }
}

export const deleteUserById = async(req, res) => {
    const {userId} = req.body
    try{
        const response = await Users.findByIdAndDelete(userId)

        if(!response){
            return res.status(400).json({message: "User Not Found"})
        }

        return res.status(200).json(response)
    }
    catch{
        return res.status(500).json({message: "Internal Server Error"})
    }
}