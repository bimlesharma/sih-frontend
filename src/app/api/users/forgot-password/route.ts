import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import sendMail from "@/helper/mailer";
import { NextRequest, NextResponse } from "next/server";


dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    await sendMail({
      email: user.email,
      emailType: "reset",
      userId: user._id.toString(),
    });

    return NextResponse.json({
      message: "Reset password email sent successfully.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
