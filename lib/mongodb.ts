import mongoose from "mongoose";    

let cached = ( global as any ).mongoose || { conn: null, promise: null };

export async function connectDB() {
   try{
    if(cached.conn)
        return cached.conn;
    if(!cached.promise){
        cached.promise = mongoose.connect(process.env.MONGO_URI!,{
            dbName: "Books4All",
            bufferCommands: false,             
        });
    }

    cached.conn = await cached.promise;
    console.log("db connected");
    return cached.conn;

   }catch(err){
    console.log("error in connecting",err);
   }
}