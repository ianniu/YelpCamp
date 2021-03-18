const mongoose = require('mongoose');
const cities = require('./cities');
const { places, decriptors, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgroud');

mongoose.connect('mongodb://localhost:27017/yelp-camp',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '604ae18be34eb44b076c4c04',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, iure. Soluta perspiciatis libero vero quos illo, quibusdam accusamus voluptate vitae dolorem asperiores eaque inventore saepe consectetur ad dicta rem error',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/yihengcloud/image/upload/v1615823426/YelpCamp/uvg5fl2so7dhkqyqsxpq.jpg',
                    filename: 'YelpCamp/uvg5fl2so7dhkqyqsxpq'
                },
                {
                    url: "https://res.cloudinary.com/yihengcloud/image/upload/v1615823428/YelpCamp/lpdollsjxvuuauiz1plu.jpg",
                    filename: "YelpCamp/lpdollsjxvuuauiz1plu"
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});