import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'data', 'todos.json');

async function ensureDatabase() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });

  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify({ todos: [] }, null, 2), 'utf8');
  }
}

async function readDatabase() {
  await ensureDatabase();
  const raw = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(raw);
}

async function writeDatabase(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export async function listTodos() {
  const data = await readDatabase();
  return data.todos;
}

export async function createTodo(title) {
  const data = await readDatabase();
  const newTodo = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  data.todos.push(newTodo);
  await writeDatabase(data);
  return newTodo;
}

export async function updateTodo(id, updates) {
  const data = await readDatabase();
  const index = data.todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return null;
  }

  data.todos[index] = {
    ...data.todos[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await writeDatabase(data);
  return data.todos[index];
}

export async function deleteTodo(id) {
  const data = await readDatabase();
  const initialLength = data.todos.length;
  data.todos = data.todos.filter((todo) => todo.id !== id);

  if (data.todos.length === initialLength) {
    return false;
  }

  await writeDatabase(data);
  return true;
}
