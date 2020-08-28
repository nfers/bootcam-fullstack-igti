import mongoose from 'mongoose'


const db = mongoose.connect('mongodb://localhost:27017/dbtp4', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

export default db;