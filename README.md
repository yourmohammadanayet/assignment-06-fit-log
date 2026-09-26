# FitLog

FitLog is a responsive workout library and daily workout planner built with Next.js. Users can browse workouts, view workout details, add exercises to today's plan, save workouts for later, and manage their workout routine with sorting, search, local persistence, and toast feedback.

## Features

- Browse 12 workouts from the FitLog API
- View detailed workout information and exercise instructions
- Add workouts to Today's Plan
- Save workouts for later
- Maximum 5 workouts in Today's Plan
- Plan and Saved counters in the navbar
- Mark planned workouts as done
- Remove workouts from Plan or Saved
- View Exercises, Minutes, and Calories metrics
- Sort workouts by Duration, Calories, or Rating
- Search workouts by name, equipment, or muscle group
- LocalStorage support for Plan and Saved workouts
- Toast notifications for workout actions
- Responsive layout for mobile, tablet, and desktop
- Custom 404 page

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Hot Toast
- Next.js App Router
- LocalStorage
- FitLog REST API

## API

### All Workouts

https://api.abcz.workers.dev/api/fitlog

### Single Workout

https://api.abcz.workers.dev/api/fitlog/:id

## Routes

- `/` — Home and workout library
- `/workout/:id` — Workout details
- `/my-plan` — Today's Plan and Saved workouts

## Getting Started

Clone the repository:

git clone https://github.com/yourmohammadanayet/assignment-06-fit-log.git

Go to the project directory:

cd assignment-06-fit-log

Install dependencies:

npm install

Start the development server:

npm run dev

## Available Scripts

npm run dev
npm run lint
npm run build
npm run start

## Repository

https://github.com/yourmohammadanayet/assignment-06-fit-log
