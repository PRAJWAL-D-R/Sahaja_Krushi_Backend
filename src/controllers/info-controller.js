const info = (req,res)=>{
    return res.json ({
        success:true,
        Message:'Api is live',
        error:{},
        data:{}
    })
}

module.exports ={
    info
}