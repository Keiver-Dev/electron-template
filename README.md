# Electron + React + Express Template

This project is a robust template for building desktop applications using **Electron**, **React (via Vite)**, and a **Node.js (Express)** backend.

It is designed to run the Frontend, Backend, and Electron main process concurrently for a seamless development experience.

## Project Structure

The project is divided into three main parts:

- **Root**: Contains the Electron main process configuration (`main.js`, `preload.cjs`) and scripts to run the application.
- **Frontend/**: A React application powered by Vite.
- **Backend/**: A Node.js Express server.

## Features

- **Electron**: Handles the desktop window and native integration.
- **React 19 + Vite**: Fast, modern frontend development.
- **Express**: specialized backend for handling API requests and business logic.
- **Automated Startup**: The Electron main process automatically spawns the Express backend server.

## Installation

Because the project is split into separate modules, you need to install dependencies for each part.

1. **Install Root Dependencies**:

   ```bash
   npm install
   ```

2. **Install Frontend Dependencies**:

   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

## Usage

To start the application in development mode:

```bash
npm run dev
```

### How it works:

- This command runs `npm run frontend:dev` and `npm run electron:dev` concurrently.
- **Frontend**: Starts the Vite development server on `http://localhost:5173`.
- **Electron**: Waits for the frontend to be ready, then launches the application window.
- **Backend**: The Electron main process (`main.js`) automatically starts the backend server from `Backend/server.js`.

## Building for Production

_(Add your build instructions here. Typically involves building the Vite app and then packaging with Electron Forge or Builder)_
