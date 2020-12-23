const mongoose = require('mongoose');
const Campground = require('../model/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: 'https://source.unsplash.com/collection/2184453',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Veritatis maxime labore eligendi soluta adipisci vel ipsa perspiciatis perferendis iste ullam.Suscipit nobis accusamus tenetur at architecto accusantium facere odit ducimus?',
            price: Math.floor(Math.random() * 20) + 10
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
