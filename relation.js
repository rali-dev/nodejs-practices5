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
  // book: bookSchema
  books: [bookSchema]
}));

async function createUser(first_name, last_name, books){
  const user = new User({
    first_name,
    last_name, 
    // book: book
    books: books
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

async function addBook(userId, book){
  const user = await User.findById(userId);
  user.books.push(book);
  await user.save();
}
  
async function removeBook(userId, bookId){
  const user = await User.findById(userId);
  const book = user.books.id(bookId);
  book.deleteOne();
  await user.save();
}

removeBook('68d19f5f1cad6892f1f05441','68d23e56cc2aee2121f9277b');

// addBook('68d19f5f1cad6892f1f05441', new Book({title: 'Expressjs', pages: 400}));

  // createUser('Ali', 'Rahimi', [
  //   new Book({title: 'nodejs programming', pages: 500}),
  //   new Book({title: 'react programming', pages: 600}),
  //   new Book({title: 'mongodb', pages: 200})
  // ]);

 // updateUser('68d1841f529b2a212cc1601a')
 // createUser('Ali', 'Rahimi', new Book({title: 'nodejs programming', pages: 500}));
 // getUsers();