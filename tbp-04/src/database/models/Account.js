import { Schema, model } from "mongoose";

const accountSchema  = new Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: { 
    type: Number, 
    required: true, 
    unique: true, 
  },
  name: { 
    type: String,
    minlength: 1,
    maxlength: 255, 
  },
  balance: { 
    type: Number,
    required: true,
    min: [0, 'Insuficiente founds for this operation'] 
  },
},{collection: 'accounts', versionKey: false});


export default model('account', accountSchema);
