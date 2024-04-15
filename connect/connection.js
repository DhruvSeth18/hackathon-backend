import mongoose from 'mongoose';

const connectDB = (username,password)=>{
    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jb6pz7m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Connection is Successfull'))
    .catch(err=>{console.log('Connection is Unsuccessfull')})
}
export default connectDB;