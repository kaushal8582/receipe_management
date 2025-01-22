
const Receipe = require("../../Backend/models/receipe-model");


module.exports.removeReceipe = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message:"id is required"})
    }
    try {
        const response = await Receipe.destroy({where:{id:id}})
        if(!response){
            return res.status(400).json({message:"something went wrong"})
        }
        res.status(200).json({message:"receipe removed successfully"})
    } catch (error) {
        console.log(error);
    }
}

