import { NextResponse } from "next/server";
import type { User } from "@/types/user";

export async function GET() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users: User[] = data.map((u: any) => ({
      id: u.id.toString(),
      name: u.name,
      email: u.email,
      avatar: `https://i.pravatar.cc/150?u=${u.id}`,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ users: [] });
  }
}
