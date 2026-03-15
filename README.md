# Second Brain – Personal Knowledge Management App

A modern **personal knowledge management system** that helps users store, search, and organize notes, ideas, and resources efficiently.

The app allows users to create notes, tag information, search across stored knowledge, and access notes through a public API.

---

# Live Demo

https://secondbrainapp-q0zm7oiny-shashikanth-reddy-baddams-projects.vercel.app

---

# Features

• Create and store notes
• Add tags for categorization
• Search notes instantly
• AI-generated tags and summaries
• Clean dashboard UI
• Public API for querying stored knowledge
• MongoDB persistent storage
• Fully deployed on Vercel

---

# Tech Stack

Frontend
• Next.js 16
• React
• TypeScript
• Tailwind CSS

Backend
• Next.js API Routes

Database
• MongoDB
• Mongoose

Deployment
• Vercel

---

# Project Structure

```
app/
 ├─ api/
 │   ├─ notes/
 │   └─ public/brain/query
 ├─ dashboard/
 ├─ create-note/
 └─ docs/

components/
 ├─ NoteCard.tsx
 ├─ SearchBar.tsx
 └─ TypeFilter.tsx

lib/
 ├─ db.ts
 └─ models/Note.ts
```

---

# Installation

Clone the repository

```
git clone https://github.com/shashiskr14-creator/second-brain-ai.git
cd second-brain-ai
```

Install dependencies

```
npm install
```

Create environment variables

```
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_key
```

Run locally

```
npm run dev
```

Open

```
http://localhost:3000
```

---

# API Endpoints

### Create Note

```
POST /api/notes
```

Request Body

```
{
"title": "React Hooks Guide",
"content": "useState and useEffect are important hooks",
"type": "note",
"tags": ["react", "hooks"]
}
```

---

### Fetch Notes

```
GET /api/notes
```

---

### Public Brain Query API

This endpoint allows external applications to query stored knowledge.

```
GET /api/public/brain/query?q=react
```

Example response

```
{
"success": true,
"query": "react",
"results": [
{
"title": "React Hooks Guide",
"tags": ["react","hooks"]
}
]
}
```

---

# Deployment

The application is deployed on **Vercel**.

Steps used:

1. Push project to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

---

# Author

Baddam Shashikanth Reddy
GitHub: https://github.com/shashiskr14-creator
