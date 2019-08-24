const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;

let connect =()=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true }, function(err) {
              if (err) {
                return reject( {
                        message: `Connection erorr to MongoDB at ${process.env.mongoUrl}` +err
                    }
                )
            } else {
                console.log('Successfully GaneshaPinjarat connected mongodb...');
                resolve(`Mongo connected at ${process.env.mongoUrl}`);
            }
        });
    });

}

module.exports = {
    connect
}