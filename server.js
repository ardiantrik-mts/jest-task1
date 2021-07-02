const app = require("./index");

const {
    APP_PORT
} = process.env

app.listen(APP_PORT, () => {
    console.log(`App is running on port ${APP_PORT}`)
})