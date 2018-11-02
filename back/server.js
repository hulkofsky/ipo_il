const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = 3000
const passport = require('passport')
const cors = require('cors')
const constants = require('./utils/constants')

//ROUTES
const homeRouter = require('./routes/homeRoutes')
const authRouter = require('./routes/authRoutes')
const contactUsRoutes = require('./routes/contactUsRoutes')
const projectPageRoutes = require('./routes/projectPageRoutes')
const stepsRoutes = require('./routes/stepsRoutes')
const investorProfileRoutes = require('./routes/investorProfileRoutes')
const enterpreneurProfileRoutes = require('./routes/enterpreneurProfileRoutes')
const adminAuthRoutes = require('./routes/admin_routes/adminAuthRoutes')
const adminRoutes = require('./routes/admin_routes/adminRoutes')
const projectStatusesRoutes = require('./routes/admin_routes/projectStatusesRoutes')
const enterpreneurRoutes = require('./routes/admin_routes/enterpreneurRoutes')
const purchaseRoutes = require('./routes/admin_routes/purchaseRoutes')
const visitRoutes = require('./routes/admin_routes/visitsRoutes')
const companyContactsRoutes = require('./routes/admin_routes/companyContactsRoutes')
const bankRoutes = require('./routes/admin_routes/bankRoutes')
const purchaseStatusRoutes = require('./routes/admin_routes/purchaseStatusRoutes')
const contentRoutes = require('./routes/admin_routes/contentRoutes')
const contactUsMailRoutes = require('./routes/admin_routes/contactUsMailRoutes')
const ourTeamRoutes = require('./routes/admin_routes/ourTeamRoutes')
const purchasesProjectsRoutes = require('./routes/admin_routes/purchasesProjects')
const subscribersProjectsRoutes = require('./routes/admin_routes/subscribersProjectsRoutes')
const investorRoutes = require('./routes/admin_routes/investorRoutes')
const projectRoutes = require('./routes/admin_routes/projectRoutes')
const subscribersRoutes = require('./routes/admin_routes/subscribersRoutes')

const fs = require('fs')
const http = require('http')
const https = require('https')

var key = fs.readFileSync('sslcert/server.key');
var cert = fs.readFileSync( 'sslcert/server.cert' );
// var ca = fs.readFileSync( 'sslcert/intermediate.crt' );

const options = {
    key: key,
    cert: cert,
    // ca: ca
};


const httpServer = http.createServer(app)
const httpsServer = https.createServer(options, app)

//morgan init
app.use(morgan('dev'))

app.use(cors())

//bodyparser init
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}))

//initialize passport
app.use(passport.initialize())

//bring in password strategy
require('./config/passport')(passport)

//using routes
app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/contactus', contactUsRoutes)
app.use('/project', projectPageRoutes)
app.use('/', stepsRoutes)
app.use('/investor', investorProfileRoutes)
app.use('/enterpreneur', enterpreneurProfileRoutes)
app.use('/adminpanel', adminAuthRoutes)
app.use('/adminpanel', adminRoutes)
app.use('/adminpanel', projectStatusesRoutes)
app.use('/adminpanel', enterpreneurRoutes)
app.use('/adminpanel', purchaseRoutes)
app.use('/adminpanel', visitRoutes)
app.use('/adminpanel', companyContactsRoutes)
app.use('/adminpanel', bankRoutes)
app.use('/adminpanel', purchaseStatusRoutes)
app.use('/adminpanel', contentRoutes)
app.use('/adminpanel', contactUsMailRoutes)
app.use('/adminpanel', ourTeamRoutes)
app.use('/adminpanel', purchasesProjectsRoutes)
app.use('/adminpanel', subscribersProjectsRoutes)
app.use('/adminpanel', investorRoutes)
app.use('/adminpanel', projectRoutes)
app.use('/adminpanel', subscribersRoutes)

app.use(constants.LINK_FOR_STATIC_FILES, express.static('uploads'));

app.get('*', (req,res)=>{
    res.send('Oo oops!!')
})

httpServer.listen(port, err=>{
    err?console.log('Oo oops! Something went wrong with http!'):
        console.log(`HTTP Server is running on ${port}`)
})

// httpsServer.listen(port+1, err=>{
//     err?console.log('Oo oops! Something went wrong with https!'):
//         console.log(`HTTPS Server is running on ${port+1}`)
// })