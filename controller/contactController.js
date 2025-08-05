const contactSchema = require('../model/contactSchema')
module.exports.getContact =async(req,res)=>{
        const _data= await contactSchema.find({})
        if(_data){
    return res.send(({code:200,message:"success",data:_data}))
        }else{
            return res.send({code:500,message:'server err'})
        }
}
module.exports.addContact =async(req,res)=>{
    console.log(req.body,11)

    const name = req.body.name
    const email=req.body.email
    const message=req.body.message

    if(!name || !email || !message){
        return res.send({code:400,message:'bad request'})
    }
    const newContact = new contactSchema({ name:name,email:email,message:message })
    const success= await newContact.save()

    if (success){
        return res.send(({code:200,message:" add success"}))
    }else{
        return res.send({code:500,message:'server err'})
    }

}