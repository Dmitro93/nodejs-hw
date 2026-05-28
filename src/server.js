import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());



const PORT = process.env.PORT ?? 3000;

app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);


const bootstrap = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

bootstrap();
