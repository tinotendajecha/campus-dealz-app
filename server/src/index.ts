import express, { Express, Request, Response, NextFunction} from 'express'
import dotenv from 'dotenv'

import routes from './routes/routes'
// import { json } from 'stream/consumers'

dotenv.config()

const app: Express = express()

app.use(express.json())

const port = process.env.PORT || 3000



// app.get('/', (req: Request, res: Response) => {
//   res.send('My Typescript express server is now running okay and fine')
// })

app.use('/', routes)

app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
  res.status(500).json({message: err.message})
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
