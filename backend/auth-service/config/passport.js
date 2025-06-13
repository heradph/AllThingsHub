const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.getUserByGoogleId(profile.id);
        if (!user) {
          await User.createUserGoogle(
            profile.id,
            profile.emails?.[0]?.value || "",
            profile.displayName,
            profile.photos?.[0]?.value || ""
          );
          user = await User.getUserByGoogleId(profile.id);
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
