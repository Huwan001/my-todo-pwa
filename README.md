# my-todo-pwa

My Todo App（Next.js 14）

## 後台資料庫

已新增一個可直接在本機使用的「後台資料庫」：

- 儲存位置：`data/todos.json`
- 後端 API：`/api/todos`
- 支援操作：查詢、新增、更新、刪除

## API 範例

### 取得 todos

```bash
curl http://localhost:3000/api/todos
```

### 新增 todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"title":"寫測試"}'
```

### 更新 todo

```bash
curl -X PATCH 'http://localhost:3000/api/todos?id=<todo_id>' \
  -H 'Content-Type: application/json' \
  -d '{"completed":true}'
```

### 刪除 todo

```bash
curl -X DELETE 'http://localhost:3000/api/todos?id=<todo_id>'
```
