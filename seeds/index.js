
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities  = require('./cities');
const {places, descriptors} = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
       for(let i = 0; i < 300; i++){
            const random1000 = Math.floor(Math.random() * 1000);
            const price = Math.floor(Math.random() * 20) + 10;
             const camp = new Campground({
                // OWN USER ID
                author: '63ae8beeee6352b1fcc0c227',
                location: `${cities[random1000].city}, ${cities[random1000].state} `,
                title: `${sample(descriptors)} ${sample(places)}`,
                description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores, aspernatur? Veritatis ex tenetur non sed, consectetur, aliquid aspernatur, soluta sint dolorem doloremque aliquam eum possimus quo at. Id, repellendus fugit.',
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
                        url: 'https://res.cloudinary.com/dinwmnmhe/image/upload/v1672486325/YelpCamp/dgw17nsdxg5j7ot1u279.jpg',
                        filename: 'YelpCamp/dgw17nsdxg5j7ot1u279',
                      },
                      {
                        url: 'https://res.cloudinary.com/dinwmnmhe/image/upload/v1672486327/YelpCamp/lyt39xeczeluaknuy4nv.jpg',
                        filename: 'YelpCamp/lyt39xeczeluaknuy4nv',
                      }
                ]
            })
            await camp.save();
       }
}

seedDB().then(() => {
    mongoose.connection.close();
}) 