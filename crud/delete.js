const { MongoClient } = require('mongodb')
var configs=require('../configs/config')
const deleteHelper={

    deleteUser:async (MongoClient,userid)=>{
        var dbo=await MongoClient.connect(configs.dburl)
        return await dbo.db('keystore').collection('appkeys').findOneAndDelete({userid:userid})
       
    },
    deleteApp:async(MongoClient,userid,appname)=>{
        var query={"userid":userid}
        var dbo=await MongoClient.connect(configs.dburl) 
        return await dbo.db('keystore').collection('appkeys').update(query,{
            $pull : {
                   "apps":{name:appname}
            }
            
        })
    },
    deleteKey:async(MongoClient,userid,appname,keyname)=>{
    
        var query={"userid":userid,"apps.name":appname}
        var dbo=await MongoClient.connect(configs.dburl)
        return await dbo.db('keystore').collection('appkeys').update(query,{
            $pull: {
                   'apps.$.keylist':{
                        keyname:keyname,
                        
                    },
                    
                   }
                
                
            })

    }



}
module.exports=deleteHelper