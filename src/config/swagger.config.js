const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Bloginary",
    version: "1.0.0",
    description: "Bloginary API",
  },
  servers: [
    {
      url: "/api/v1",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, "../routes/v1/routes/user.route.js")],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
