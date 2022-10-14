const mongoose = require("mongoose");
const userbankDetailsSchema = new mongoose.Schema({
    pan_number:String,
    banks:[{Bank:String,Date:String,Amount:String},{Bank:String,Date:String,Amount:String}],
    Stocks:{Amount:String,Date:String},
    MutualFunds: {Amount:String,Date:String},
    
})

const UserBankDetails = mongoose.model("userbankdetail",userbankDetailsSchema);
module.exports=UserBankDetails;