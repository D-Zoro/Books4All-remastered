import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { email, otp, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) {
    return new Response("Invalid OTP", { status: 400 });
  }

  user.password = await bcrypt.hash(password, 10);
  user.verified = true;
  user.otp = "";
  await user.save();

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
