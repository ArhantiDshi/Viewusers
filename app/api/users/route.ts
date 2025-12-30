import { NextRequest, NextResponse } from 'next/server';

export type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

// In-memory storage (in production, use a real database)
let users: User[] = [];
let nextId = 1;

// Initialize with some sample data
async function initializeUsers() {
  if (users.length === 0) {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      users = data.slice(0, 6); // Get first 6 users
      nextId = Math.max(...users.map(u => u.id)) + 1;
    } catch (error) {
      console.error('Failed to initialize users:', error);
    }
  }
}

// GET - Fetch all users
export async function GET() {
  await initializeUsers();
  return NextResponse.json(users);
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  await initializeUsers();
  
  try {
    const body = await request.json();
    const { name, email, phone, website } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser: User = {
      id: nextId++,
      name,
      email,
      phone,
      website,
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
