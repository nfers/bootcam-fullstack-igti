"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');

const accountSchema  = new (0, _mongoose.Schema)({
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


exports. default = _mongoose.model.call(void 0, 'account', accountSchema);
