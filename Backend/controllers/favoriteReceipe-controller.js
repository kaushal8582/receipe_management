const { Op } = require("sequelize");
const Collection = require("../models/Collection");
const FavoriteReceipe = require("../models/FavoriteReceipe");
const Recipe = require("../models/receipe-model");

module.exports.createCollection = async function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const response = await Collection.create({
      name,
      userId: req.user.id,
    });

    if (!response) {
      return res.status(400).json({
        message: "collection not created",
      });
    }

    return res.status(200).json({
      message: "collection created successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.saveFavoriteReceipe = async function (req, res) {
  const { receipeid, collectionid } = req.body;

  if (!receipeid || !collectionid) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    const response = await FavoriteReceipe.create({
      receipeId: receipeid,
      collectionId: collectionid,
    });

    if (!response) {
      return res.status(400).json({
        message: "receipe not saved",
      });
    }
    return res.status(200).json({
      message: "receipe saved successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFavoriteReceipe = async function (req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {

    const id = await Collection.findOne({
      where: {
        name: name,
      }
    });

    const response = await FavoriteReceipe.findAll({
      where: {
        collectionId: id.id,
      },
      attributes: ["receipeId"],
    });

    if (!response) {
      return res.status(400).json({
        message: "receipe not found",
      });
    }

    let data = response.map((item) => {
      return item.receipeId;
    });

    let ans = await Recipe.findAll({
      where: {
        id: {
          [Op.in]:data
        },
      },
    });



    return res.status(200).json({
      message: "receipe found",
      data: ans,
    });
    
  } catch (error) {
    console.log(error);
  }
};


module.exports.getFavoriteReceipeCollectionName = async(req,res)=>{
  const id = req.user.id;
  console.log({id});
  try {
    const response = await Collection.findAll({
      where: {
        userId: id,
      },
    });

    res.status(200).json({
      message: "collection found",
      data: response,
    })
    
  }catch{
    console.log(error);
  }
}