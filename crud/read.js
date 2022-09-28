const { MongoClient } = require('mongodb')
var configs = require('../configs/config')
const readHelpers={
    readData:async (MongoClient,userid)=>{
        var query={"userid":userid}
        var dbo=await MongoClient.connect(configs.dburl)
        return await dbo.db('keystore').collection('appkeys').find(query).toArray()
    },
    getIndexOfApp:async(MongoClient,userid,appname)=>{
        var userdata=await readHelpers.readData(MongoClient,userid)
        // console.log(userdata)
        var apps=userdata[0]?.apps
        var i=0
        for (var app of apps){
            // console.log(app)
            if (Object.keys(app)[0]===appname){
                return i
            }
            i+=1
        }
        return -1

    },
    appExist:async(MongoClient,userid,appname)=>{
        var query={"userid":userid,"apps.name":appname}
        var dbo=await MongoClient.connect(configs.dburl)
        var exist=await dbo.db('keystore').collection('appkeys').findOne(query)
        return exist
    },
    keyExist:async(MongoClient,userid,appname,keyname)=>{
        var query={userid:userid}
        var dbo=await MongoClient.connect(configs.dburl)
        var data=await dbo.db('keystore').collection('appkeys').findOne(query)
        var apps=data?.apps

        for (var app in apps){
            if (apps[app].name===appname){
                var keys=apps[app].keylist
                for (var key in keys){
                    if (keys[key].keyname===keyname){
                        return 1
                    }
                }
            }
        }

        
        return null

    }

}
module.exports=readHelpers



        