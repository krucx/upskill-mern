const Institute = require("../models/instituteModel");

exports.createInstitute = async (req,res,next)=>{
    const institute = await Institute.create(req.body);
    res.status(201).json({
        success:true,
        institute
    });
}

exports.getAllInstitutes = async (req,res)=>{

    const institutes = await Institute.find();
    res.status(200).json({
        success:true,
        institutes
    });
}

exports.updateInstitute = async (req,res)=>{
    let institute = await Institute.findById(req.params.id);

    if(!institute){
        return res.status(500).json({
            success:false,
            message:"Institute not found"
        })
    }

    institute = await Institute.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({
        success:true,
        institute
    })
}

exports.deleteInstitute = async (req,res,next) => {
    let institute = await Institute.findById(req.params.id);

    if(!institute){
        return res.status(500).json({
            success:false,
            message:"Institute not found"
        })
    }

    await institute.deleteOne();
    res.status(200).json({
        success:true,
        message:"Institute removed successfully"
    })
}

exports.getInstitute = async (req,res,next)=>{
    let institute = await Institute.findById(req.params.id);

    if(!institute){
        return res.status(500).json({
            success:false,
            message:"Institute not found"
        })
    }

    res.status(200).json({
        success:true,
        institute
    })
}