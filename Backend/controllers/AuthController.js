const userSchema = require('../models/user.js');

const teacherSchema = require('../models/teacher.js');

const {hashPassword , comparePassword} = require('../helper/authhelper.js');

const multer = require('multer');

const JWT  = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename
    },
  });

  const upload = multer({ storage: storage });

exports.registerController = async (req,res) => {
    try{
       
        const {firstName  , lastName , email , password , role , resume} = req.body;
        if(role==="User"){
           
            if(!firstName || !lastName || !email || !password){
                return res.status(409).send({success : false ,  message : "Please fill all the details "});
            }
            
            const existingUser = await userSchema.findOne({email : email});
            

           
         if(existingUser){
            return res.status(400).send({success : false , message :"User already exist please login" });
         }

            const hashedPassword = await hashPassword(password);
            const user = new userSchema({firstName , lastName,
            email ,password : hashedPassword , role});
            await user.save();
                
                return res.status(200).send({success : true , message : "User Registered Successfully" , user});
        }
        else{
          
            if(!firstName || !lastName || !email || !password){
                return res.status(409).send({success : false ,  message : "Please fill all the details "});
            }

           
            const existingTeacher = await teacherSchema.findOne({email : email});
            
                console.log("here further is coming");
           
         if(existingTeacher){
            return res.status(400).send({success : false , message :"User already exist please login" });
         }


            const hashedPassword = await hashPassword(password);

            const teacher = await teacherSchema({firstName  ,
            lastName , email , password : hashedPassword  , role});
           
            await teacher.save();
             
            return res.status(200).send({success : true , message : "Teacher registered successfully "});



        }
    }
    catch(error){
        return res.status(500).send({success : false , message : "Error While registering"})
    }

}

exports.loginController = async(req , res) =>{
    try{

        const {email , password , role} = req.body;

        if(role==="User"){
            

            const user = await userSchema.findOne({email});
            if(!user){
                return res.status(404).send({success : false , message : "User not registered please register first"});
            }
           
            console.log(user);

            const check = await comparePassword(password , user.password);
            console.log(check);
            if(!check){
                return res.status(404).send({success : false , message : "Your Details didn't match" });

            }
        
            const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
             
            return res.status(200).send({success  : true , message : "Login Successfully " , user , token});


        }
        else{
           const teacher = await teacherSchema.findOne({email});
           if(!teacher){
            return res.status(404).send({success : false , message : "Teacher not registered "});

           }
           const check = await comparePassword(password , teacher.password) ;

           if(!check){
            return res.status(400).send({success  : false , message : "Your Details didn't match"});

           }

           const token = await JWT.sign({ _id: teacher._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
        return res.status(200).send({success  : true , message : "Login Successfully " , teacher , token});


        }


    }
    catch(error){

        return  res.status(500).send({success : false , message : "Error while login"});
    }
}

exports.forgotPassword = async(req , res) =>{
    try{
        const {email , password , role} = req.body;
        if(role==="User"){
            const user = await userSchema.find({email});
            if(!user){
                return res.status(404).send({success : false , message : "User not found with this email id"});

            }
            const hashedPassword = await hashPassword(password);
            await userSchema.findByIdUpdate(user._id , {password : hashedPassword} , {new : true});

            return res.status(201).send({success : true , message : "User updated successfully" , user});

        }
        else{
            const teacher = await teacherSchema.find({email});
            if(!teacher){
                return res.status(404).send({success : false , message : "User not found with this email id"});

            }
            const hashedPassword = await hashPassword(password);
            await teacherSchema.findByIdAndUpdate(user._id , {password : hashedPassword} , {new : true});

            return res.status(201).send({success : true , message : "User updated successfully" , user});

        }

    }
    catch(error){
        return res.status(500).send({success : false  , message : "Error while updating the password"});
    }
}

exports.updateProfile = async(req , res) =>{
    try{
        const newData = req.body;

        if(req.user.role==="User"){
            const user =  await userSchema.findById(req.user._id);
            if(!user){
                return res.status(404).send({success : false , message : "User Not found"});
            
            }
            for (const field in newData) {
                if (newData.hasOwnProperty(field) && user[field] !== newData[field]) {
                  user[field] = newData[field];
                }
              }
            const updatedUser = await user.save();
            return res.status(201).send({success : true , message : "User updated successfully"  , updatedUser});


        }
        else{
            const teacher =  await teacherSchema.findById(req.user._id);
            if(!teacher){
                return res.status(404).send({success : false , message : "Teacher Not found"});
            
            }
            for (const field in newData) {
                if (newData.hasOwnProperty(field) && teacher[field] !== newData[field]) {
                  teacher[field] = newData[field];
                }
              }
            const updatedUser = await teacher.save();
            return res.status(201).send({success : true , message : "User updated successfully"  , updatedUser});


        }

    }
    catch(error){
        return res.status(500).send({success : false , message : "Error while updating the profile"});
    }
}






