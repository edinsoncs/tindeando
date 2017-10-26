'use strict'

const mongoose = require('mongoose');
let fb = require('passport-facebook').Strategy;

var User = mongoose.model('User');


module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});


	passport.use(new fb({
		clientID : "1502441733164907",
        clientSecret: "3225bf427abbb71de59be5ff174dce75",
        callbackURL : 'https://tindeando.com/auth/facebook/callback',
        profileFields : ['id', 'displayName',/*'provider',*/, 'picture.type(large)', 'email']
	}, function(accessToken, refreshToken, profile, done){

		User.findOne({provider_id: profile.id}, function(err, user) {
            if(err) throw(err);
            if(!err && user!= null) return done(null, user);

            // Al igual que antes, si el usuario ya existe lo devuelve
            // y si no, lo crea y salva en la base de datos
            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                token: accessToken,
                name: profile.displayName,
                photo: "https://graph.facebook.com/"+profile.id+"/picture?width=1024&height=1024",
                random: Math.random(),
                birthday: profile.user_birthday,
                email: profile.emails[0].value

            });
        
            user.save(function(err) {
                if(err) throw err;
                done(null, user);
            });

           

        });

	}));


}