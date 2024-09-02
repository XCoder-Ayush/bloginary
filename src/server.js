const ServerConfig = require("./config/server.config");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const client = require("prom-client");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({
  register: client.register,
});
const PORT = ServerConfig.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "ejs");

const apiRouter = require("./routes/index");
const webRouter = require("./routes/web");
const connectToDatabase = require("./config/db.config");

// app.get('/',(req,res)=>{
//     res.json({'message' : 'Thala'})
// })

// app.post('/api/v1/blog/:id',(req,res)=>{
//     //URL Params
//     console.log(req.params);
//     // Query Params
//     console.log(req.query);
//     // Req Body:
//     console.log(req.body);

//     res.json({'message' : `Service Is Healthy :) And ${req.params.id}`})
// })

app.use("/api", apiRouter);
app.use("/", webRouter);

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

app.listen(PORT, () => {
  console.log(`Server Started At ${PORT}`);
  connectToDatabase();
});
