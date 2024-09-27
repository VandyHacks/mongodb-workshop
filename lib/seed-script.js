
const MongoClient = require("mongodb").MongoClient;

const uri = "YOUR MONGODB URI";

const exercises = [
  {
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: 2,
  },
  {
    name: "Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: 3,
  },
  {
    name: "Pull-Up",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: 4,
  },
  {
    name: "Bicep Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: 1,
  },
];

const workouts = [
  {
    reps: 5,
    sets: 3,
    weight: 225,
  },
  {
    reps: 8,
    sets: 4,
    weight: 185,
  },
  {
    reps: 6,
    sets: 3,
    weight: 275,
  },
  {
    reps: 10,
    sets: 4,
    weight: 0,
  },
  {
    reps: 12,
    sets: 3,
    weight: 25,
  },
]

async function seedDB() {
    // Connection URL

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("Workout-App").collection("exercises");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        await collection.drop();

        const response = await collection.insertMany(exercises);

        for (let i = 0; i < workouts.length; i++) {
          workouts[i].exercise = response.insertedIds[i];
        }

        const workoutCollection = client.db("Workout-App").collection("workouts");

        await workoutCollection.drop();

        const workoutResponse = await workoutCollection.insertMany(workouts);
        console.log(workoutResponse);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();