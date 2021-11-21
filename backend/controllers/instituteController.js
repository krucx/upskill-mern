const Institute = require("../models/instituteModel");

exports.createInstitute = async (req,res,next)=>{
    const institute = await Institute.create(req.body);
    res.status(201).json({
        success:true,
        institute
    });
}

exports.getAllInstitutes = (req,res)=>{
    res.status(200).json({message:"Route Configured correctly!!"})
}