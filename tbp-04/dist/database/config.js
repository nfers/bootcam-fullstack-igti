"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);


const db = _mongoose2.default.connect('mongodb://localhost:27017/dbtp4', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = _mongoose2.default.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

exports. default = db;