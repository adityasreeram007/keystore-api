var configs = require('../configs/config')
const createHelper={

    createUser:async (MongoClient,userid)=>{

        var dbo=await MongoClient.connect(configs.dburl)
        var valid=await dbo.db('keystore').collection('appkeys').findOne({userid:userid})
        if (valid===null){
        return await dbo.db('keystore').collection('appkeys').insert({
            userid:userid,
            apps:[]
        })
    }
    return "User Already Exist"
    }
}

module.exports=createHelper