const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sameerhedau91:d13D2XTZ5W4mtuu8@cluster0.qacq7vi.mongodb.net/gofood';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });

        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        

        // Assuming you have a collection named 'foodCategory'
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = mongoDB;
