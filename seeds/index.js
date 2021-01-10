const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/camp-fiesta', {
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
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            //Your User ID
            author: '5ff841800635a3066839f09b',
            images: [
                {
                    url: 'https://res.cloudinary.com/dwtkhznmd/image/upload/v1610105482/CampFiesta/cfmifjki9gkdcxjjxc91.jpg',
                    filename: 'CampFiesta/cfmifjki9gkdcxjjxc91'
                },
                {
                    url: 'https://res.cloudinary.com/dwtkhznmd/image/upload/v1610105482/CampFiesta/w9jmmhamk2kiqabtb8wj.jpg',
                    filename: 'CampFiesta/w9jmmhamk2kiqabtb8wj'
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
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
