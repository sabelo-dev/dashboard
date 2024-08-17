import mongoose from'mongoose';

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function dbConnect(): Promise<void> {
    const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log('MONGO_URI is not defined in the environment variables.');
  }

  if (connection.isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  try {
    const db = await mongoose.connect(mongoUri!);

    connection.isConnected = db.connections[0].readyState;

    if (connection.isConnected === 1) {
      console.log('Database connection established.');
    } else {
      console.log('Database connection failed.');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    //process.exit(1); // Optionally exit the process if the connection fails
  }
}

export default dbConnect;
function thrownewError(arg0: string) {
    throw new Error('Function not implemented.');
}

