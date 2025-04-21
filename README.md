# Pinterest Clone (Work in Progress) 🛠️

This is a personal fullstack project — a Pinterest-inspired app built with modern web technologies. It is currently in early development stages, and many features are still experimental or in active construction.

The goal of this project is to deepen my skills in building scalable and maintainable applications using the following stack:

- **Frontend:** Next.js (React)
- **Backend:** NestJS
- **Database:** PostgreSQL
- **Realtime:** WebSocket with namespaces (via `@nestjs/websockets`)

---

## 🚧 Project Status

> ⚠️ This project is in its early phase. Think of it as a "foundation being laid" — much of the core architecture is being explored and refined.

Because of that, **you will NOT be able to run the project out-of-the-box** without setting up a few things on your own:

### 🗄️ PostgreSQL Database

You need to set up your own PostgreSQL instance and connect it to the backend. Environment variables or configuration files related to the database are not publicly shared yet.

<!-- ### 🔐 SSL Certificates

This project currently assumes that SSL certificates are available for secure connections. You will need to generate your own certificates and place them in the appropriate location for the server to run. -->

---

## 📦 Project Structure

```bash
/
├── client/           # Frontend app (Next.js)
├── server/           # Backend app (NestJS)
├── init.bash         # Project initializer (starts both frontend and backend)
├── cert.bash         # Create ssl certificates
└── README.md         # You're here

# If you can't executy bash files, give them executable permissions ->
# sudo chmod +x "bash_file"

🚀 Quick Start

Make sure you’ve prepared the following before launching the project:
	•	Your own PostgreSQL database (with connection credentials configured)

Then simply run:
bash init.bash
This script will start both the backend and frontend servers.


🧠 Features in Progress
	•	Pinterest-style pin creation & browsing
	•	User authentication (planned)
	•	WebSocket-based realtime updates
	•	API support for third-party Pinterest data

🙋 Why So Manual Right Now?

This project is still young and raw — more of a sandbox than a polished product. My focus is on building the architecture right before making the developer experience smoother.

Once the core parts stabilize, I’ll introduce easier setup steps, proper environment templates, and maybe even Docker support for zero-config startup.


📌 Stay Tuned

I’m actively working on this, so expect frequent updates and architectural changes. Feel free to explore, fork, and share feedback — but don’t be surprised if things break along the way 😅


Author: Kira (Heroku228)
License: MIT
```
