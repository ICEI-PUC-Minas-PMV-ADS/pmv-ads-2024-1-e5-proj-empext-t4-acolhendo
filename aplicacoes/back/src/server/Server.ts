import express from 'express';
import { router } from './routes';
import './shared/services/SetLocaleYup';
import cors from 'cors';
//import './mongo-database/index';

const server = express()

// server.use(cors({
//     origin: process.env.APPLICATION_URL?.split('|') || []
// }))
server.use(express.json())
server.use('/api/v1/', router);

export { server }