const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('./keys')
const Bookshelf = require('../config/database')

const Investor = Bookshelf.Model.extend({
    tableName: 'investors',
})

const Investors = Bookshelf.Collection.extend({
    model: Investor
})

const Enterpreneur = Bookshelf.Model.extend({
    tableName: 'enterpreneurs',
})

const Enterpreneurs = Bookshelf.Collection.extend({
    model: Enterpreneur
})

module.exports = passport=>{
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
    opts.secretOrKey = keys.secret
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        Investor
        .forge({id: jwt_payload.id})
        .fetch()
        .then(user=>{
            console.log(jwt_payload)
            if (user){
                done(null,user)
            }else{
                Enterpreneur
                .forge({id: jwt_payload.id})
                .fetch()
                .then(user=>{
                    if (user) {
                        done(null, user)
                    } else {
                        done(null, false)
                    }
                })
            }
        }).catch(err=>{
            res.status(500).json({success: false, data: {message: err.message}})
        })
    }))
}