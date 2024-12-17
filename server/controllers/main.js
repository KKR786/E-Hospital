const User = require("../models/user");

const getNearbyUsers = async (req, res) => {
  const { longitude, latitude, maxDistanceInMeters, bloodGroup } = req.body;

  let emptyFields = [];

  if(!longitude) {
    emptyFields.push('longitude')
  }
  if(!latitude) {
    emptyFields.push('latitude')
  }
  if(!maxDistanceInMeters) {
    emptyFields.push('areaCoverage')
  }
  if(!bloodGroup) {
    emptyFields.push('bloodGroup')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

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
  
      if( nearbyUsers.length > 0) {
        res.json({ nearbyUsers });
      }else {
        res.json({ message: 'No users found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error finding nearby users', error: err.message });
    }
  };

  module.exports = { getNearbyUsers }