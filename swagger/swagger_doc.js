
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swagger_doc=YAML.load(`${__dirname}/swagger.yml`);

module.exports=(app)=>{
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_doc));
}