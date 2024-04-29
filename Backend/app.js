const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors  = require('cors');
// const fileUpload = require('express-fileupload');
const path = require('path');
const morgan=require('morgan')
let rfs=require('rotating-file-stream');
const multer = require("multer");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const express = require('express');
// const swaggerAutogen = require('swagger-autogen')();



dotenv.config();


const swaggerFile = require('./swagger-output.json')



const app = express();

let accessLogStream=rfs.createStream("access.log",{interval:'1d',path:path.join(__dirname,'log')})

app.use(morgan(':date[iso] :method :url :status :response-time ms', { stream: accessLogStream}));
app.use('/images',express.static(__dirname+'/images'));



const AuthRoutes = require("./routes/AuthRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");
const paymentRoutes = require("./routes/PaymentRoutes.js");
const TeacherRoutes = require('./routes/TeacherRoutes.js');
const courseRoutes = require("./routes/CourseRoutes.js");
const AdminRoutes = require('./routes/AdminRoutes.js');
const connectDb = require('./database/db.js');


const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); 
// app.use(upload.single('file'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use(bodyParser.raw())
app.use(cors());


connectDb();



app.use('/api/v1/user', AuthRoutes)
app.use('/api/v1/user', UserRoutes)
app.use('/api', paymentRoutes)
app.use('/api/v1/teacher', TeacherRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/v1/admin' , AdminRoutes);


app.get('/test', (req,res)=>{
  return res.send("This is Working")
})


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = 8000;
app.listen(PORT, (req, res) => {
    console.log(`server is listening on PORT number ${PORT}`);
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

 