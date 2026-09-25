const mongoose = require('mongoose');

const loadTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {
    type: String,
    required: true
  },
  method: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    default: 'GET'
  },
  headers: {
    type: String // JSON string of headers
  },
  body: {
    type: String // Raw body payload
  },
  virtualUsers: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in seconds
    required: true
  },
  status: {
    type: String,
    enum: ['running', 'completed', 'failed'],
    default: 'running'
  },
  progress: {
    type: Number,
    default: 0
  },
  metrics: {
    totalRequests: { type: Number, default: 0 },
    errorRate: { type: Number, default: 0 },
    p95Latency: { type: Number, default: 0 },
    avgLatency: { type: Number, default: 0 },
    throughput: { type: Number, default: 0 } // requests per second
  },
  rawOutput: {
    type: mongoose.Schema.Types.Mixed
  },
  errorMessage: {
    type: String
  },
  errorDetails: [{
    code: Number,
    count: Number,
    message: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('LoadTest', loadTestSchema);
