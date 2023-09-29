const database = require("./src/data/database");
const appBuilder = require("./src/appBuilder");
const app = appBuilder(database);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});