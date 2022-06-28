export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'fsg45Jsdf-=fewdf3'
}

// mongodb://mongo:27017/clean-node-api
