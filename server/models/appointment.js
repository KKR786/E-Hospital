const mongoose = require('mongoose')
const Sequence = require('./sequence')

const Schema = mongoose.Schema


const appointmentSchema = new Schema({
    
  _id: {
    type: Number
  },
  patient: {
    type: Number,
    ref: 'User',
    required: true
  },
  doctor: {
    type: Number,
    ref: 'User',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled'
  },
  reasonForVisit: {
    type: String,
    required: true
  },
}, { timestamps: true });


appointmentSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const sequenceDoc = await Sequence.findByIdAndUpdate(
        'appointmentId',
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      ).exec();

      this._id = sequenceDoc.sequence_value;
    } catch (err) {
      return next(err);
    }
  }

  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema)