const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    teacher: [{
        type: Schema.Types.ObjectId, 
        ref: 'teachers',
        required: [true , "Teacher Id is required"] ,

    }],

    category: {
        type : Schema.Types.ObjectId,
        ref : 'categorys',
        required: [true , "Category is required"],
    },
    description: {
        type: String,
        required : [true , "Description is required"],
    },
    photo :{
        data : Buffer,
        contentType: String,
    },
    
    price: {
        type: String,
        required: true,
    },
    
    sections : [{
        type : mongoose.Types.ObjectId,
       ref:'Sections',
       required:[true , 'Sections are required'], 
    }],

    ratings :{
        type : Number,
        default : 0,
    }
    ,
    quizes :[
        {
            type : mongoose.Types.ObjectId,
            ref : 'quizes',
        }
    ]
    


    
},
    {
        timestamps : true,
    }

)



module.exports = mongoose.model("courses", courseSchema);
