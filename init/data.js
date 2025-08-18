const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to the beach in this cozy and peaceful cottage.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Luxury Mountain Cabin",
    description: "A luxury stay in the serene Himalayas.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    price: 5000,
    location: "Manali",
    country: "India"
  },
  {
    title: "Urban Apartment",
    description: "Modern apartment in the heart of the city.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    price: 3200,
    location: "Mumbai",
    country: "India"
  },
  {
    title: "Rustic Countryside House",
    description: "Experience rural charm and nature.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    price: 1800,
    location: "Punjab",
    country: "India"
  },
  {
    title: "Modern Villa with Pool",
    description: "A stylish villa featuring a private pool.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    price: 7200,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Snowy Chalet",
    description: "A cozy chalet surrounded by snow.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    price: 4500,
    location: "Switzerland",
    country: "Switzerland"
  },
  {
    title: "Seaside Bungalow",
    description: "Private bungalow with sea view.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    price: 3500,
    location: "Kerala",
    country: "India"
  },
  {
    title: "City Loft",
    description: "Trendy loft in the downtown area.",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    price: 4000,
    location: "Delhi",
    country: "India"
  },
  {
    title: "Tropical Resort",
    description: "Luxury resort with beach access.",
    image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210fb",
    price: 8000,
    location: "Maldives",
    country: "Maldives"
  },
  {
    title: "Countryside Cottage",
    description: "Charming countryside escape.",
    image: "https://images.unsplash.com/photo-1505691723518-36a1a2f17d57",
    price: 2200,
    location: "Rajasthan",
    country: "India"
  },
  {
    title: "Glass House",
    description: "Stay in a house with panoramic views.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: 6000,
    location: "California",
    country: "USA"
  },
  {
    title: "Desert Camp",
    description: "Adventure stay in desert tents.",
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4177",
    price: 2800,
    location: "Jaisalmer",
    country: "India"
  },
  {
    title: "Lake View Cabin",
    description: "Peaceful cabin by the lake.",
    image: "https://images.unsplash.com/photo-1505691723518-36a1a2f17d57",
    price: 3700,
    location: "Nainital",
    country: "India"
  },
  {
    title: "Heritage Haveli",
    description: "Experience royal luxury.",
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4177",
    price: 9000,
    location: "Jaipur",
    country: "India"
  },
  {
    title: "Jungle Treehouse",
    description: "Stay among the treetops.",
    image: "https://images.unsplash.com/photo-1540202404-c67a8e4f2d6a",
    price: 4200,
    location: "Meghalaya",
    country: "India"
  },
  {
    title: "Island Villa",
    description: "Private island luxury villa.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    price: 15000,
    location: "Andaman",
    country: "India"
  },
  {
    title: "Forest Cottage",
    description: "Cottage in the middle of the forest.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    price: 3100,
    location: "Munnar",
    country: "India"
  },
  {
    title: "Beach Shack",
    description: "Affordable stay by the sea.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    price: 1500,
    location: "Goa",
    country: "India"
  },
  {
    title: "Penthouse Suite",
    description: "Luxury penthouse in the city.",
    image: "https://images.unsplash.com/photo-1505691723518-36a1a2f17d57",
    price: 11000,
    location: "Bangalore",
    country: "India"
  },
  {
    title: "Countryside Villa",
    description: "Spacious villa with gardens.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    price: 5000,
    location: "Himachal",
    country: "India"
  },
  {
    title: "Minimalist Apartment",
    description: "Clean and modern design.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    price: 3500,
    location: "Pune",
    country: "India"
  },
  {
    title: "Private Cabin",
    description: "Cabin for complete privacy.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    price: 2800,
    location: "Ooty",
    country: "India"
  },
  {
    title: "Royal Palace",
    description: "Live like a king.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    price: 20000,
    location: "Udaipur",
    country: "India"
  },
  {
    title: "Hilltop Retreat",
    description: "Retreat on top of the hills.",
    image: "https://images.unsplash.com/photo-1540202404-c67a8e4f2d6a",
    price: 6000,
    location: "Shillong",
    country: "India"
  }
];

module.exports = { data: sampleListings };
