# YTSync

A real-time YouTube synchronization application that allows multiple users to watch videos together with synchronized playback and live chat.

Built with **React**, **Express**, **Socket.IO**, the **YouTube IFrame API**, and **YouTube.js**.

> **Status :** Active Development

> **Acknowledgement :** This project is a fork of [yt-cowatch](https://github.com/GitUtk/yt-cowatch) by GitUtk.

---

# Features

- Real-time synchronized YouTube playback
- Server-authoritative synchronization algorithm
- Automatic playback drift detection and correction
- Play, pause, seek, and video change synchronization
- Create and join rooms instantly
- Admin-controlled playback
- Live room chat
- Search YouTube videos directly from the application
- Debounced search to reduce unnecessary API requests
- Select videos without manually pasting YouTube URLs
- Automatic room restoration after page refresh
- Persistent user identity using `clientId`
- Username persistence with Local Storage
- Shared room state across all participants
- Responsive UI
- Reusable UI components powered by **shadcn/ui**
- Modular React architecture using custom hooks

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS v4
- shadcn/ui
- Context API
- Custom Hooks
- Socket.IO Client
- Axios

## Backend

- Node.js
- Express
- Socket.IO
- YouTube.js

## APIs

- YouTube IFrame API for video playback
- YouTube.js / Innertube for searching YouTube videos

## Deployment

- **Frontend:** Vercel
- **Backend:** Render

---

# Architecture

```text
                         Admin
                           │
                           │ Playback Controls
                           ▼
                 ┌─────────────────────┐
                 │       Server        │
                 │   Source of Truth   │
                 └──────────┬──────────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   Maintains Room     Calculates Expected   Detects Playback
   Playback State     Playback Position         Drift
                            │
                            ▼
                   Sends Synchronization
                      When Required
                            │
                            ▼
                       Participants

```

The server is responsible for maintaining the authoritative playback state, while clients periodically report their playback status. Participants are only resynchronized when playback drift exceeds the allowed threshold, reducing unnecessary synchronization events.

# How It Works

## Room Creation

- A unique room Id is generated.
- The first participant automatically becomes the room admin.
- Other users can join using the room Id.

## YouTube Search
Users can search for YouTube videos directly from the application instead of manually copying and pasting video URLs.
```text
            User types a search query
                  │
                  ▼
            Debounced search
                  │
                  ▼
            Backend API
                  │
                  ▼
            YouTube.js / Innertube
                  │
                  ▼
            YouTube search results
                  │
                  ▼
            User selects a video
                  │
                  ▼
            Video ID is sent to the room
                  │
                  ▼
            All participants load the selected video

```
## Synchronization

ytsync uses a **server-authoritative synchronization model**.

- The room owner (admin) controls playback.
- The server maintains the authoritative playback state.
- Clients periodically report their playback status.
- The server calculates playback drift for every participant.
- Clients exceeding the allowed drift threshold are automatically resynchronized.
- `serverTime` is used to compensate for network latency when calculating the expected playback position.

This approach keeps playback synchronized even under unstable network conditions.

## Automatic Reconnection

After refreshing the page:

- `clientId` is restored from Local Storage.
- Username is restored automatically.
- The user rejoins the existing room.
- Room state is synchronized without creating duplicate users.

---

# Project Structure

```text
            ytsync
            │
            ├── frontend
            │   ├── src
            │   │   ├── api
            │   │   ├── components
            │   │   ├── context
            │   │   ├── hooks
            │   │   ├── pages
            │   │   ├── services
            │   │   ├── utils
            │   │   └── ui
            │   │
            │   └── public
            │
            ├── backend
            │   ├── server.js
            │   ├── rooms.js
            │   └── package.json
            │
            └── README.md
```

---

# Improvements Over Original Project

- Completely refactored project architecture
- Modular React component structure
- Extensive use of reusable custom hooks
- Dedicated Socket.IO service layer
- Improved Context API state management
- Automatic room restoration after refresh
- Persistent user identity using `clientId`
- Server-authoritative synchronization algorithm
- Playback drift detection and automatic correction
- Improved synchronization under network latency
- Direct YouTube video search
- Debounced search requests
- Video selection without manually pasting URLs
- Reusable UI components with shadcn/ui
- Better maintainability and scalability

---

# Getting Started

## Clone the repository

```bash
git clone https://github.com/manish-850/ytsync.git
cd ytsync
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm start
```

---

# Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add awesome feature"
```

4. Push the branch.

```bash
git push origin feature/my-feature
```

5. Open a Pull Request.

```bash
git commit -m "feat: add awesome feature"
```

# Credits

Original project: https://github.com/GitUtk/yt-cowatch

This repository continues development with significant architectural improvements, redesigned synchronization logic, reusable UI components, and additional real-time features.

---

# License

This project is licensed under the MIT License.