const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Pasta',
      level: 'Amateur Chef',
      ingredients: [
        'pasta',
        'tomato sauce'
      ],
      cuisine: 'Asian',
      dishType: 'main_course',
      duration: 40,
      creator: 'Chef LePapu'
    })  
  })
  .then(recipe => {
    console.log(recipe.title);
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title);
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
    // new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
  })
  .then(recipe => {
    console.log(`changed ${recipe.title}'s duration to ${recipe.duration}`);
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    console.log('Carrot Cake deleted');
  })
  .then(() => {
    mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });