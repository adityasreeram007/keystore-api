var configs = require('../configs/config')
var readHelper=require('./read')
const updateHelper={
    addNewApp:async(MongoClient,userid,appname)=>{
        var query={"userid":userid}
        var valid =await readHelper.appExist(MongoClient,userid,appname)
        if (valid!==null){
            return "App Already Exist"
        }
        var dbo=await MongoClient.connect(configs.dburl) 
        return await dbo.db('keystore').collection('appkeys').update(query,{
            $push : {
                   "apps":{name:appname,keylist:[]}
            }
            
        })
    },
    addNewKey:async(MongoClient,userid,appname,keyname,keyvalue)=>{
        var query={"userid":userid,"apps.name":appname}
        var valid=await readHelper.keyExist(MongoClient,userid,appname,keyname)
        if (valid!==null){
            return "Key Already Exist"
        }
        var dbo=await MongoClient.connect(configs.dburl)
        return await dbo.db('keystore').collection('appkeys').update(query,{
            $push : {
                   'apps.$.keylist':{
                        keyname:keyname,
                        keyvalue:keyvalue
                    },
                    
                   }
            })
            
        
    },
    
    



}
module.exports=updateHelper