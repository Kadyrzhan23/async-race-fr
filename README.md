# Async Race

**Score: 300/400** *(100 pts code quality awarded by reviewer)*

**Deployed:** https://kadyrzhan23.github.io/async-race-fr/

> Backend: clone and run [async-race-api](https://github.com/mikhama/async-race-api) locally on port 3000.

## Checklist 300/400 pts

### 🚀 UI Deployment

- [x] **Deployment Platform:** Deployed to GitHub Pages

### ✅ Requirements to Commits and Repository

- [x] **Commit guidelines compliance:** All commits follow Conventional Commits format
- [x] **Checklist included in README.md**
- [x] **Score calculation**
- [x] **UI Deployment link in README.md**

### Basic Structure (80 points)

- [x] **Two Views (10 points):** "Garage" and "Winners" views implemented via React Router
- [x] **Garage View Content (30 points):** Name, car creation/editing panel, race control panel, garage section
- [x] **Winners View Content (10 points):** Name, winners table, pagination
- [x] **Persistent State (30 points):** Page number and input state preserved when switching between views

### Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Create, update, delete cars. Empty and too-long names (>30 chars) handled. Deleted cars also removed from winners.
- [x] **Color Selection (10 points):** RGB color picker with live preview on car SVG
- [x] **Random Car Creation (20 points):** Generates 100 cars with names from 10 brands × 10 models, random hex colors
- [x] **Car Management Buttons (10 points):** Select and Delete buttons on each car card
- [x] **Pagination (10 points):** 7 cars per page
- [x] **EXTRA (20 points):**
  - [x] **Empty Garage:** "Garage is empty, add cars in it" message shown when no cars
  - [x] **Empty Garage Page:** Automatically navigates to previous page when last car on page is deleted

### 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** Winners shown in table after each race
- [x] **Pagination for Winners (10 points):** 10 winners per page
- [x] **Winners Table (15 points):** Columns: №, car icon, name, wins, best time. Wins increment and best time updates on repeat wins.
- [x] **Sorting Functionality (10 points):** Sort by wins and best time ASC/DESC, applied server-side via API query params

### 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** Click ▶ → wait for velocity response → animate car → drive request. On 500 error animation stops at broken position.
- [x] **Stop Engine Animation (20 points):** Click ■ → API stop request → car returns to start position
- [x] **Responsive Animation (30 points):** Fluid animations on screens as small as 500px. Track width recalculated on window resize.
- [x] **Start Race Button (10 points):** Races all cars on the current page only (max 7)
- [x] **Reset Race Button (15 points):** Returns all current-page cars to starting positions
- [x] **Winner Announcement (5 points):** Banner shown with winner name and finish time
- [x] **Button States (20 points):** ▶ disabled while car is driving or finished. ■ disabled when car is at start.
- [x] **Actions during the race (50 points):** Select, Delete, ▶ buttons blocked during active race. Status messages shown for starting/resetting states.

### 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** `format` and `ci:format` scripts in package.json
- [x] **ESLint Configuration (5 points):** Airbnb style guide via `eslint-config-airbnb-base` with `@eslint/eslintrc` FlatCompat. `lint` script configured. TypeScript strict mode with `noImplicitAny`.

### 🌟 Overall Code Quality (100 points) *Skip during self-check*

- [ ] **(Up to 100 points)** Discretionary points awarded by reviewer

## Tech Stack

- React 19 + TypeScript (strict mode)
- Zustand (state management)
- React Router v7
- Vite + CSS Modules

## Run Locally

```bash
# 1. Start the backend
git clone https://github.com/mikhama/async-race-api
cd async-race-api && npm install && npm start

# 2. Start the frontend (in a separate terminal)
npm install
npm run dev
```
