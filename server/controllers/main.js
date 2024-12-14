const User = require("../models/user");

const getNearbyUsers = async (req, res) => {
  const { longitude, latitude, maxDistanceInMeters } = req.body;

    try {
      const nearbyUsers = await User.find({
        "address.coordinates": {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistanceInMeters,
          },
        },
        bloodGroup
      }).select('-password');
  
      res.json({ nearbyUsers });
    } catch (err) {
      res.status(500).json({ message: 'Error finding nearby users', error: err.message });
    }
  };

  module.exports = { getNearbyUsers }