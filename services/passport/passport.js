const GoogleStrategy = require("passport-google-oauth20").Strategy;

//Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log("passport7 profile email===", profile);
  console.log("passport8 request====", request);
  console.log("passport9 accessToken====", accessToken);
  console.log("passport10 refreshToken====", refreshToken);

  //check if a user exists with this email or not
  // user.findOne({ email: profile.emails[0].value }).then(data => {
  //   if (data) {
  //     //user exists
  //     //update data
  //   } else {
  //     // create a user
  //     user({
  //       username: "",
  //       email: profile.emails[0].value,
  //       googleId: profile.Id,
  //       password: null,
  //       provider: "google",
  //       isverified: true,
  //     }).save((err, dats) => {
  //       return done(null, data);
  //     });
  //   }
  // });
  return done(null, profile);
};

//Use "GoogleStrategy" as the Authentication Strategy

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      authUser
    )
  );

  passport.serializeUser((user, done) => {
    // console.log(`\n--------> Serialize User:`);
    // console.log(user);
    // The USER object is the "authenticated user" from the done() in authUser function.
    // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.

    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    // console.log("\n--------- Deserialized User:");
    // console.log(user);
    // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
    // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

    done(null, user);
  });
};

// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));
