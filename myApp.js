require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env['MONGO_URI']);

const { Schema } = mongoose;
const personSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
  });

const Person = mongoose.model('Person', personSchema);

//let Person;

const createAndSavePerson = (done) => {
  var janeFonda = new Person({name:"Jane Fonda", age:84,favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

var arrayOfPeople = [{name:"Swathi Raman", age:32,favoriteFoods: ["rajma", "bhindi", "pizza"]}, {name:"Gaju G", age:34,favoriteFoods: ["eggs", "fish", "chicken"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function(err,data){
    if(err) return console.error(err);
    done(null,data);
  })
};

var personName = "Swathi Raman";
const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,data)=>{
    if(err) return console.error(err);
    done(null,data);
  })
};

var food = "pizza";
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err,data)=>{
    if(err) return console.error(err);
    done(null, data);
  }) 
};

var personId = "61d8a56b292d94026a61dee2";
const findPersonById = (personId, done) => {
  Person.findById(personId, (err,data)=>{
    if(err) return console.error(err);
    done(null, data);
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,person) => {
    if(err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.error(err);
      done(null , updatedPerson);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const query={name:personName};
  Person.findOneAndUpdate(query, {age:ageToSet},{ new: true }, (err,data)=>{
    if(err) return console.error(err);
    done(null,data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,data)=>{
    if(err) return console.error(err);
    done(null,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,res)=>{
    if(err) return console.error(err);
    done(null,res);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:{$all:[foodToSearch]}})
  .sort({name:'asc'})
  .limit(2)
  .select('-age')
  .exec(function(err, people) {
    if(err) return console.error(err);
      done(null,people);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
