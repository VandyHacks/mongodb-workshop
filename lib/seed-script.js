/* mySeedScript.js */

// require the necessary libraries
const MongoClient = require("mongodb").MongoClient;

const exercises = [
  {
    _id: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    _id: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: 2,
  },
  {
    _id: "Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    _id: "Pull-Up",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: 4,
  },
  {
    _id: "Bicep Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: 1,
  },
];

async function seedDB() {
    // Connection URL
    const uri = "mongodb+srv://admin:yqhS5X8lJAnz9DdN@mongo-workshop.6f9ah.mongodb.net/?retryWrites=true&w=majority&appName=mongo-workshop";

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("workout-app").collection("exercises");

        //get all the items in the collection
        const items = await collection.find({}).toArray();
        console.log(items);

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        collection.insertMany(exercises);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();