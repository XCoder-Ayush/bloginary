const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");
const ServerConfig = require("./server.config");

function generateRandomPassword() {
  const length = Math.floor(Math.random() * (16 - 8 + 1)) + 8;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
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
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find a user by Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Check if the user already exists based on the email
            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              // User exists, update their Google ID
              user.googleId = profile.id;
              user.fullName = profile.displayName;
              await user.save();
              return done(null, user);
            } else {
              // New user, sign up with Google
              const password = generateRandomPassword();
              user = new User({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                password: password, // Store a random password or use a strategy for OAuth-only users
              });

              await user.save();
              console.log("New User Created", user);

              // Optionally send a welcome email with the new password
              // await sendEmail(user.email, 'Welcome', `Your password is: ${password}`);

              return done(null, user);
            }
          }

          return done(null, user);
        } catch (error) {
          console.error("Error in OAuth2Strategy:", error);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize by user ID
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Find user by ID
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // passport.serializeUser((user, done) => {
  //   done(null, user);
  // });

  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });
}

module.exports = initPassport;
