import express from "express"
import {AppDataSource} from "./data-source"
import cors from "cors"
import routerContato from "./routes/contato";

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!")
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

const app = express()
const port = 3001
app.use(express.json())
app.use(cors())

app.use("/", routerContato)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
