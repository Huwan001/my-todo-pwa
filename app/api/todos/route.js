import { NextResponse } from 'next/server';
import { createTodo, deleteTodo, listTodos, updateTodo } from '../../../lib/todoDatabase';

export async function GET() {
  const todos = await listTodos();
  return NextResponse.json({ todos });
}

export async function POST(request) {
  const body = await request.json();

  if (!body?.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }

  const todo = await createTodo(body.title.trim());
  return NextResponse.json({ todo }, { status: 201 });
}

export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const body = await request.json();
  const updates = {};

  if (typeof body.title === 'string') {
    updates.title = body.title.trim();
  }

  if (typeof body.completed === 'boolean') {
    updates.completed = body.completed;
  }

  const todo = await updateTodo(id, updates);

  if (!todo) {
    return NextResponse.json({ error: 'todo not found' }, { status: 404 });
  }

  return NextResponse.json({ todo });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const deleted = await deleteTodo(id);

  if (!deleted) {
    return NextResponse.json({ error: 'todo not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
