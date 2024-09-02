const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user.model');
const ServerConfig = require('./server.config');

function generateRandomPassword() {
  const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8; 
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

function initPassport(passport) {
  passport.use(
    new OAuth2Strategy(
      {
        clientID: ServerConfig.OAUTH2_CLIENT_ID,
        clientSecret: ServerConfig.OAUTH2_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await User.findOne({
            where: {
              googleId: profile.id,
            },
          });
          console.log(accessToken);
          console.log(refreshToken);
          if (!user) {
            // 2 Cases :
            // Registered Manually
            const checkUser = await User.findOne({
              where: {
                email: profile.emails[0].value,
              },
            });
            if (checkUser) {
              // Already Registered Manually:
              const updatedUser = await checkUser.update({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
              });
              return done(null, updatedUser);
            } else {
              // First Time Register
              // Sign Up With Google
              const password = generateRandomPassword();
              const createdUser = await User.create({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                password: password,
              });

              console.log('New User Created ', createdUser);
              // Send Email:
              //   await sendEmail(
              //     profile.emails[0].value,
              //     'Mantra Tantra | New Password',
              //     `
              //       <p>This is your new password. Use this to login to the website.</p>
              //       <p>Password : <strong>${password}</strong></p>
              //     `
              //   );
              return done(null, createdUser);
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = initPassport;