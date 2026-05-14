import { connectDB } from "@/lib/db";
import { User } from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "USER",
    });

    return Response.json(
      {
        message: "Registration successful",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}