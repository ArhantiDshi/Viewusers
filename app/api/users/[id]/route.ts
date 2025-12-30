import { NextRequest, NextResponse } from 'next/server';

type User = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  website?: string;
};

// Reference the same in-memory storage
let users: User[] = [];

async function initializeUsers() {
  if (users.length === 0) {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      users = data.slice(0, 6);
    } catch (error) {
      console.error('Failed to initialize users:', error);
    }
  }
}

// GET - Fetch a single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeUsers();
  const { id } = await params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

// PUT - Update a user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeUsers();
  const { id } = await params;
  const userId = parseInt(id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, phone, website } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    users[userIndex] = {
      ...users[userIndex],
      name,
      email,
      phone,
      website,
    };

    return NextResponse.json(users[userIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

// DELETE - Delete a user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await initializeUsers();
  const { id } = await params;
  const userId = parseInt(id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  users.splice(userIndex, 1);
  return NextResponse.json({ message: 'User deleted successfully' });
}
