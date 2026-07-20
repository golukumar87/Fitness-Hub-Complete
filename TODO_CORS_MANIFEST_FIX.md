# TODO: Fix manifest.json CORS + default-avatar errors (GYM WEBSITE)

## Cause
- `index.html` ko **file://** se open kiya ja raha hai → browser `origin = null` treat karta hai.
- `manifest.json`/assets ko fetch karte waqt CORS/storage restrictions aati hain.

## Steps
1. **Local server run** (recommended)
   - Folder: `RAJ Project/GYM WEBSITE/`
   - Command: `npx serve -l 5500`
   - Open: `http://localhost:5500`

2. **default-avatar check**
   - Verify file exists: `images/default-avatar.png`
   - If missing: `images/default-avatar.png` add karo OR HTML/JS me path change karo.

3. **Backend errors (optional/next)**
   - Console me `127.0.0.1:4000 ... ERR_CONNECTION_REFUSED` aata hai.
   - Backend run karo: `RAJ Project/GYM WEBSITE/raj-gym-backend/` (server start command project ke README/LOCAL_DEV follow karke).

## Acceptance Criteria
- `manifest.json` console error should disappear when using `http://localhost:5500`.
- `default-avatar.png ERR_FILE_NOT_FOUND` should disappear after adding the missing image.
- Backend related API errors disappear only when backend is running.
