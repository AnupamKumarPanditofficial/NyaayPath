const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: String,
  age: String,
  occupation: String,
  state: String,
  district: String,
  pinCode: String,
  wardNo: String,
  address: String,
  aadharNo: String,
  panNo: String,
  landOwner: String,
  maritalStatus: String,
  mobileNo: String,
  trackingId: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  // File URLs or paths
  aadharImageUrl: String,
  panImageUrl: String,
  incomeCertificateUrl: String,
  residentialCertificateUrl: String,
  familyPhotoUrl: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Request', requestSchema);
