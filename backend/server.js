import app from "./src/app.js"
import connectToDB from "./src/db/db.js"
import config from "./src/config/config.js"


connectToDB()
app.listen(config.PORT, () => {
  console.log(`Server Running on PORT ${config.PORT}`)
})