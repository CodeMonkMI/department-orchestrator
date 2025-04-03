# Department Orchestrator

The Department Orchestrator is a comprehensive management system designed to streamline operations across multiple departments. Featuring secure role-based access control, department-specific dashboards, and intelligent resource allocation, this tool ensures efficient coordination between teams.

## Features

- Role-based access (Super Admin, Department Admin, User)
- Department profiles with activity history
- Resource allocation and scheduling
- Priority management for critical tasks
- Operational workflow tracking
- Analytics dashboard with department metrics
- Mobile-responsive design

# Project Monorepo
This monorepo contains all the components of the Department Orchestrator project:

- Backend API Service
- Frontend Application

## Project Structure

```
├── apps/
│   ├── backend/     # Backend API service
│   ├── frontend/    # Frontend application
└── README.md
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development servers:
   ```bash
   npm run dev
   ```

3. Build all packages:
   ```bash
   npm run build
   ```

## Available Scripts

- `docker-compose -f docker/docker-compose.yaml up -d` - Run database with docker-compose
- `npm run dev` - Start all projects in development mode
- `npm run build` - Build all projects
- `npm run start` - Start all projects in production mode
- `npm run lint` - Run linting across all projects

## Package-specific Commands

You can run commands for specific packages using the workspace syntax:

```bash
npm run dev -w @do/backend
npm run dev -w @do/frontend
```