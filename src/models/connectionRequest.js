const mongoose = require("mongoose");

const connectionRequestSchema =  new mongoose.Schema(
    {
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:true,
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        status:{
            type:String,
            required:true,
            enum:{
                values:["ignore","interested","accepted","rejected"],
                message:`{VALUE} is incorrect status type`,
            },
        },
    },
    {timestamps:true}
);
connectionRequestSchema.pre("save",function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!!");
    }
    next();
});
const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema,
);

module.exports = ConnectionRequestModel;