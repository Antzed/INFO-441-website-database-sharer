import mongoose from 'mongoose';

let models = {};

main().catch((error) => console.log(error));



async function main(){
    let url = "mongodb+srv://anthoz3:S126MvybyYUvChAL@cluster0.3aaffil.mongodb.net/?retryWrites=true&w=majority"
    console.log("Connecting to MongoDB...");
    await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('Connected to MongoDB');

    const postSchema = new mongoose.Schema({
        name: String,
        url: String,
        description: String, 
        created_date: Date
      });
    
    
      models.Post = mongoose.model('Post', postSchema);
      console.log("Post model created");
}

export default models