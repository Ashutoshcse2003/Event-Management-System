TEMS Minimal Backend (MVP)

This is a tiny, dependency-free Node.js HTTP server to bootstrap development and allow quick local testing.

Files:

- `server.js` - minimal HTTP server with basic endpoints:
  - GET /api/events
  - POST /api/events/:id/register
  - GET /api/events/:id/participants

To run (requires Node 14+):

```cmd
cd "d:\Coding World\MyPractices\Ashu\temsv2\backend"
node server.js
```

The server listens on port 4000 by default. You can change it by setting the `PORT` environment variable.

Example requests (PowerShell or cmd):

List events:

```cmd
curl http://localhost:4000/api/events
```

Register for event `e1`:

```cmd
curl -X POST http://localhost:4000/api/events/e1/register -H "Content-Type: application/json" -d "{\"name\":\"Alice\",\"email\":\"alice@example.com\"}"
```

List participants for `e1`:

```cmd
curl http://localhost:4000/api/events/e1/participants
```
