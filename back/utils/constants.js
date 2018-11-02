
module.exports = {
    DEFAULT_LANGUAGE: `en`,
    adminName: 'edo',
    COMPANY_FAX: '222-33-22(your company fax)',
    FILE_PATH: process.env.NODE_ENV && process.env.NODE_ENV === 'dev' ? 'http://192.168.88.170:3000/home/cubex/work/projects/edo/back/uploads/' : 'http://34.199.42.221:3000/home/www/ipo-il/uploads/',
    LINK_FOR_STATIC_FILES: process.env.NODE_ENV && process.env.NODE_ENV === 'dev' ? '/home/cubex/work/projects/edo/back/uploads/' : '/home/www/ipo-il/uploads/'

}