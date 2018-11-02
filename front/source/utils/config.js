export default {
  domain: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://192.168.88.170:3000' : 'http://34.199.42.221:3000',
}
