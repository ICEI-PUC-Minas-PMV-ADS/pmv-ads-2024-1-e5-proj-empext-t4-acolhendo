import mongoose from 'mongoose';

// Conecte-se ao MongoDB
mongoose.connect(process.env.MONGO_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));

db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});