async function getTodos() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/todos`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.todos || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const todos = await getTodos();

  return (
    <main>
      <h1>Todo 後台資料庫已建立</h1>
      <p>已建立可用的後端 API 與本機 JSON 資料庫。</p>
      <h2>目前資料庫內容</h2>
      {todos.length === 0 ? (
        <p>目前沒有待辦事項，可透過 API 新增。</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}（{todo.completed ? '完成' : '未完成'}）
            </li>
          ))}
        </ul>
      )}
      <pre>
        {`POST /api/todos\nPATCH /api/todos?id=<todoId>\nDELETE /api/todos?id=<todoId>`}
      </pre>
    </main>
  );
}
