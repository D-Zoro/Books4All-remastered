import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import  {sendOTP} from "@/lib/sendOTP";

export async function POST( req: Request ) {
    const {email }= await req.json();
    await connectDB();

    const otp = Math.floor(100000 + Math.random()* 900000).toString();
    await sendOTP(email,otp);
    
    const user = await User.findOne({ email });
    if(user){
        user.otp = otp;
        await user.save();
    } else{
        await User.create({ email, otp });
    }


return new Response(JSON.stringify({ success: true }), { status:200});

}