er# Local Dev Notes (Fix Console Errors)

## Why you see these errors (file:// origin)
When you open `index.html` directly via **file://...**, the browser treats it as a unique security origin (`origin = null`).
That causes:
- Manifest fetch CORS block
- Browser storage / security restrictions
- API calls fail (`127.0.0.1:4000 ... ERR_CONNECTION_REFUSED`) if backend is not running
- Missing image paths like `default-avatar.png` if file doesn’t exist

## Fix 1: Run with a local server (recommended)
Use any simple server so URL becomes http://...

From inside this folder:
1) Open VSCode terminal
2) Run:

`npx serve -l 5500`

Then open:
`http://localhost:5500`

## Fix 2: Create missing default-avatar image
Your console shows:
`default-avatar.png: Failed to load ... ERR_FILE_NOT_FOUND`

Check if this file exists:
`RAJ Project/GYM WEBSITE/images/default-avatar.png`

If not, add it (any avatar image), or change HTML/JS to use an existing file.

## Fix 3: Backend errors (127.0.0.1:4000)
Errors:
`ERR_CONNECTION_REFUSED`
means your `raj-gym-backend` server is not running.

To run backend:
- cd into `raj-gym-backend`
- install deps if needed
- start server

(If you don’t want backend now, the UI will still work for QR generation and local features.)

## QR specific note
QR should work even without backend as long as `qrcodejs` loads and you are not on `file://`.

- Open DevTools Console
- Click **Generate My QR**
- If QR fails, check if `QRCode` global exists (log it in console).

