import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors'
import { postRouter } from './routes/postsRoutes';
import { authRouter } from './routes/authRoutes';

dotenv.config({ path: '../.env'})

const app = express();
const port = process.env.PORT;
app.use(cors())
app.use(express.json())
app.use('/v1/api/user',authRouter)
app.use('/v1/api/',postRouter)



app.listen(port,() => {
  console.log("Server running on: ", port);
})  