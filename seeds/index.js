const mongoose = require('mongoose');
const Campground = require('../models/campground');
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
            //Your User ID
            author: '5ff1504dff2d69422cc07974',
            images: [
                {
                    url: 'https://res.cloudinary.com/dwtkhznmd/image/upload/v1609740099/YelpCamp/wqssxdrelb00lanhj1bh.jpg',
                    filename: 'YelpCamp/wqssxdrelb00lanhj1bh'
                },
                {
                    url: 'https://res.cloudinary.com/dwtkhznmd/image/upload/v1609740100/YelpCamp/frpg53ygskorijy3ezws.jpg',
                    filename: 'YelpCamp/frpg53ygskorijy3ezws'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Veritatis maxime labore eligendi soluta adipisci vel ipsa perspiciatis perferendis iste ullam.Suscipit nobis accusamus tenetur at architecto accusantium facere odit ducimus?',
            price: Math.floor(Math.random() * 20) + 10
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
