const mongoose = require('mongoose');

const windowDoorSchema = new mongoose.Schema({
  id: String,
  type: String,
  wall: String,
  offset: Number,
  width: Number,
  height: Number
}, { _id: false });

const containerSchema = new mongoose.Schema({
  id: String,
  position: [Number],
  windowsDoors: [windowDoorSchema]
}, { _id: false });

const designSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  containers: [containerSchema],
  slabDimensions: {
    width: Number,
    depth: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

designSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Design', designSchema);
