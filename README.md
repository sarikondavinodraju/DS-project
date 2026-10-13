# MBU Data Science Learning Portal

    npm install
    npm run dev

- Student details: `src/data/student.js` (replace the placeholders)
- Experiments / modules / tools / materials: `src/data/*.js`
- PDFs: drop files into `public/pdfs/` named like `m1-1.pdf` (see `src/data/materials.js`)
- Python backend: set `VITE_PY_API=http://localhost:8000/run` (POST `{code}` -> `{stdout, error}`) in a `.env` file. Without it the sandbox runs in demo mode and says so.
- Edits to experiments are saved in the browser's LocalStorage.
