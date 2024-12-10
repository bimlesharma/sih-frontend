import dbConnnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

dbConnnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, newPassword } = reqBody;

    const user = await User.findOne({ forgotPasswordToken: token });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    if (user.forgotPasswordExpires < Date.now()) {
      return NextResponse.json({ message: "Token expired" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      forgotPasswordToken: null,
      forgotPasswordExpires: null,
    });

    return NextResponse.json({ message: "Password reset successful", success: true });
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
