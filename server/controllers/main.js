const User = require("../models/user");

const getNearbyUsers = async (longitude, latitude, maxDistanceInMeters) => {
    try {
      const nearbyUsers = await User.find({
        coordinates: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: maxDistanceInMeters,
          },
        },
      });
  
      console.log('Nearby users:', nearbyUsers);
      return nearbyUsers;
    } catch (err) {
      console.error('Error finding nearby users:', err);
    }
  };

  module.exports = { getNearbyUsers }