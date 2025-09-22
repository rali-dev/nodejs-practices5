const mongoose = require('mongoose');

mongoose
 .connect('mongodb://localhost:27017/relation')
 .then(() => console.log('connect to mongodb'))
 .catch((err) => console.log('could not connect to mongodb', err));

  const bookSchema = new mongoose.Schema({
   title: String,
   pages: Number,
 });

  const Book = mongoose.model('Book', bookSchema);


const User = mongoose.model('User', new mongoose.Schema({
  first_name: String,
  last_name: String,
  book: bookSchema
}));

async function createUser(first_name, last_name, book){
  const user = new User({
    first_name,
    last_name, 
    book
  });

  const result = await user.save();
  console.log(result);
}

async function getUsers(){
  const users = await User.find();

  console.log(users);
}

// async function updateUser(id){
//   const user = await User.findById(id);
//   user.book.title = 'react programming';
//   await user.save();
// }

// async function updateUser(id){
//   const user = await User.updateOne({_id: id}, {
//     $set: {
//       'book.title': 'MongoDB'
//     }
//   })
// }

// async function updateUser(id){
//   const user = await User.updateOne({_id: id}, {
//     $unset: {
//       'book': ''
//     }
//   });
// }

async function updateUser(id){
  const user = await User.updateOne({_id: id}, {
    $unset: {
      'book.title': ''
    }
  });
}

 updateUser('68d1841f529b2a212cc1601a')
 // createUser('Ali', 'Rahimi', new Book({title: 'nodejs programming', pages: 500}));
 // getUsers();