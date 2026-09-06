# YTSync

A real-time YouTube watch-together app with server-authoritative synchronization, clock offset estimation, drift correction, live chat, and configurable playback permissions.

> **Status :** Active Development  
> **Based on :** [yt-cowatch](https://github.com/GitUtk/yt-cowatch) by GitUtk — substantially refactored and extended.

---

## Features

- Synchronized YouTube playback — play, pause, seek, and switch videos in sync
- Server-authoritative room state
- Client/server clock offset estimation using RTT measurements
- Periodic resynchronization to reduce drift over time
- Latency-compensated playback position calculation
- Configurable playback control — `admin` or `everyone` mode
- Automatic reconnection with room state restoration
- Persistent `clientId` to prevent duplicate users after reconnect
- Live room chat
- YouTube search directly from the app with debounced requests
- Responsive UI built with Tailwind CSS and shadcn/ui
- Clear loading and connection state feedback

---

## Tech Stack

**Frontend** — React 19, Tailwind CSS, shadcn/ui, Socket.IO Client, Axios

**Backend** — Node.js, Express, Socket.IO, youtubei.js

**APIs** — YouTube IFrame Player API, YouTube internal search via youtubei.js

---

## Architecture

```
┌──────────────────────┐
│      React Client    │
│  UI / Player / Chat  │
│  Context / Hooks     │
└──────────┬───────────┘
           │ Socket.IO
┌──────────▼───────────┐
│    Node.js Server    │
│  Room & Playback     │
│  State Management    │
│  Clock Sync          │
│  YouTube Search      │
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│       YouTube        │
│  IFrame Player API   │
│  Search / Metadata   │
└──────────────────────┘
```

---

## How Synchronization Works

YTSync does not broadcast `play()` / `pause()` commands and assume all browsers execute them simultaneously. Instead, the server maintains authoritative playback state and clients use synchronized time to determine where playback should be.

### 1. Clock Synchronization

The client exchanges timestamps with the server:

```
t1 = client sends request
t2 = server receives request
t3 = server sends response
t4 = client receives response
```

```
RTT    = (t4 - t1) - (t3 - t2)
offset = ((t2 - t1) + (t3 - t4)) / 2
```

The client estimates server time as:

```
serverTime ≈ Date.now() + clockOffset
```

Multiple measurements can be taken and compared by RTT — lower RTT samples give better estimates. Clock sync runs periodically during a session to reduce long-term drift.

### 2. Playback State

The server maintains:
- Current video ID
- Current playback position
- Playing / paused state
- Last sync timestamp
- Playback control mode

Clients use room state + estimated server time to calculate their expected playback position.

### 3. Drift Correction

Clients periodically report their playback status. If local playback drifts beyond **0.5 seconds**, the client corrects its position. Small differences from normal browser/network timing are tolerated without forcing a seek.

---

## Playback Control

Each room has a configurable control mode:

**`admin`** — Only the room admin controls playback and video changes. Useful for watch parties, classes, or presentations.

**`everyone`** — All participants can control playback and change the video.

The server validates actions according to the room's permission mode — not just the frontend UI.

---

## YouTube Search

Search runs on the backend via `youtubei.js`:

```
User types query
      │
      ▼
Debounced frontend request
      │
      ▼
Backend (shared Innertube client)
      ├── Search YouTube
      ├── Ignore stale requests via request ID
      └── Normalize and return results
      │
      ▼
Frontend displays results
```

Innertube is initialized once and shared. Request IDs prevent older, slower responses from overwriting newer results.

---

## Reconnection & Room Management

When a socket disconnects:

1. Client detects connection loss and updates UI
2. Socket.IO attempts reconnection
3. Client rejoins using its existing `clientId`
4. Server updates the user's socket ID — no duplicate user created
5. Client requests latest playback state
6. Synchronization resumes

---

## Project Structure

```
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

## Improvements Over Original

The main improvements focus on synchronization accuracy, reliability, room control, and maintainability:

- Reworked synchronization around server-maintained room state
- Added clock offset estimation using RTT timestamp measurements
- Added periodic clock resynchronization during active sessions
- Reduced drift threshold from ~1 second to 0.5 seconds
- Added configurable `admin` / `everyone` playback permissions
- Added `sync-request` for recovering playback state after reconnect
- Added persistent `clientId` to prevent duplicate users
- Added explicit leave-room handling and improved disconnect behavior
- Refactored YouTube search around a shared `youtubei.js` initialization promise
- Added stale request protection for async search results
- Added defensive YouTube result mapping and error handling
- Improved loading, connection, and sync state feedback throughout the UI
- Upgraded to React 19 and current shadcn-compatible components
- Improved component structure and responsive layout

---

## Getting Started

```bash
# Clone
git clone https://github.com/manish-850/ytsync.git
cd ytsync

# Frontend
cd frontend
npm install
npm run dev

# Backend (separate terminal)
cd backend
npm install
npm run dev
```

Create `.env` files for both frontend and backend before starting.

---

## Deployment

```
                 ┌─────────────────┐
                 │     Browser     │
                 └────────┬────────┘
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
       ┌───────────┐             ┌───────────┐
       │  Vercel   │             │  Render   │
       │ Frontend  │◄───────────►│  Backend  │
       └───────────┘   Socket.IO └───────────┘
                                      │
                                      ▼
                                  YouTube
```
---

## Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

## Credits

Originally forked from [GitUtk/yt-cowatch](https://github.com/GitUtk/yt-cowatch). The synchronization system, reconnection handling, playback permissions, YouTube search, and overall architecture have been substantially reworked.

---

## License

This project is licensed under the MIT License.