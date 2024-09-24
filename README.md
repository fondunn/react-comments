# (React + Vite) Comments

## Installation:

- Clone the repository.
- Install dependencies. For example: `pnpm install`.

## Starting Dev Mode:

- Use the following command in the terminal to start development mode: `npm run dev` or `pnpm dev`.
- The app will automatically start locally at: `http://localhost:5173/` (if this port is not already in use).

## Deployment:

### Build:

- To build the app for production, use the following command in the terminal: `npm run build` or `pnpm build`.
- After building, the production-ready files will be available in the `dist` folder.

### Start Production:

- You can start the built application in production mode using a static server. For example, you can use the following command to preview the build locally: `npm run preview`

- This command will start a local server to serve your app for production preview at: `http://localhost:4173/`

### Starting on VPS server:

If using Nginx, you can configure it to serve the static files like this:

```bash
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    root /path/to/your/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

You can also serve the app locally with a simple static file server like serve:

```bash
npm install -g serve
serve -s dist
```

For starting app in background on `VPS server` you can use `pm2`. Install `pm2` globally with:

```bash
npm install -g pm2
```

After building the app (using `npm run build` or `pnpm build`), you can serve the production build using a static file server. For example, using `serve`:

```bash
serve -s dist
```

To run this command in the background with pm2, use the following:

```bash
pm2 start serve --name "react-comments-app" -- -s dist
```

### Monitor and Manage the App:

- View running processes:

```bash
pm2 list
```

- View logs:

```bash
pm2 logs
```

- Restart the app:

```bash
pm2 restart react-comments-app
```

- Stop the app:

```bash
pm2 stop react-comments-app
```

### Save the PM2 Process List:

```bash
pm2 save
```

### Set PM2 to Start on Boot:

```bash
pm2 startup
```

## PS

### Using fake data:

- used fake `postId: 3` and fake `userId: 5` to imitate posting to server.
- Save printed username and full name into localStorage after adding comment.

### Logic

- I do not added logic for reset localStorage.
- Also I do not added logic for loading more comments.
