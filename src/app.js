const ServerConfig = require("./config/server.config");
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const client = require("prom-client");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");

// Static Middlewares
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(
  session({
    secret: ServerConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const apiRouter = require("./routes/index");
const webRouter = require("./routes/web");

app.use(morgan("dev"));

app.use("/api", apiRouter);
app.use("/", webRouter);

app.get("/health", (req, res) => {
  res.json({ message: "Thala For A Reason !!" });
});

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

//Passport Config
const initPassport = require("./config/passport.config");
initPassport(passport);

// Google OAuth2 Login Routes
// This is hit when sign in with google button is pressed
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// This route is called by the Google server (Not by us) Kind of a webhook
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failure",
  }),
  (req, res) => {
    const CLIENT_URL = ServerConfig.CLIENT_URL;
    const token = req.user.generateAccessToken();
    // const options = {
    //   httpOnly: true,
    // };
    res.cookie("accessToken", token);
    res.redirect(CLIENT_URL);
  }
);
app.get("/api/v1/login/success", (req, res) => {
  console.log(req.user);

  if (!req.user) {
    return res.redirect("/api/v1/login/failure");
  }

  return res.status(200).json(req.user);
});

app.get("/api/v1/login/failure", (req, res) => {
  return res.status(401).json({ message: "Login Failed" });
});

//Prometheus Client
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({
  register: client.register,
});

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

module.exports = app;
