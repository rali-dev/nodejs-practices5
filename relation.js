const mongoose = require('mongoose');

mongoose
 .connect('mongodb://localhost:27017/relation')
 .then(() => console.log('connect to mongodb'))
 .catch((err) => console.log('could not connect to mongodb', err));

//   const bookSchema = new mongoose.Schema({
//    title: String,
//    pages: Number,
//  });

//   const Book = mongoose.model('Book', bookSchema);

const Book = mongoose.model('Book', new mongoose.Schema({
  title: String,
  pages: Number
}));

const User = mongoose.model('User', new mongoose.Schema({
  first_name: String,
  last_name: String,
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  } 
}));

async function createUser(first_name, last_name, book_id){
  const user = new User({
    first_name,
    last_name, 
    book: book_id
  });

  const result = await user.save();
  console.log(result);
}

async function createBook(title, pages){
  const book = new Book({
    title,
    pages
  });

  const result = await book.save();
  console.log(result);
}

async function getUsers(){
  const users = await User.find().populate('book', 'title pages -_id');  // .populate('...', '...').populate('...', '...')

  console.log(users);
}

 // createBook('nodejs programming', 250);
 // createUser('Ali', 'Rahimi', '68d12c2166412b9c2e576218');
 getUsers();