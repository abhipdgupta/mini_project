const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const { getjwt } = require("../utils/jwt");


const adminAuth=catchAsyncError(async(req,res,next)=>{

    const admin=true;
    console.log("Request Body : ",req.body);
    if(!admin){
        throw new ErrorHandler("UnAuthorized. Only Admin can access",400)
    }


  
    next()
})

const authCheck=catchAsyncError(async(req,res,next)=>{

    const authHeader = req.headers.authorization
		? req.headers.authorization.split(" ")[1]
		: "";

	const result = await getjwt(authHeader);
	req.username = result.username;

    next()
})

module.exports={
    adminAuth,
    authCheck,
}