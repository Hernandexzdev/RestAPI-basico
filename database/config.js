import mongoose from "mongoose";
import colors from "colors";


mongoose.set('strictQuery', true);

 const dbConnection = async() => {
    try {

       await mongoose.connect(process.env.MONGODB);
       
       console.log(`Conexion Exitosa`.green);
    } catch (error) {
        console.log(error);
        throw new Error(`Error al conectarse a la base de datos`.red)
    }
}

export default dbConnection;