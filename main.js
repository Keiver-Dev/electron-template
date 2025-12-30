import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

const isDev = process.env.NODE_ENV === "development";

function createBackend() {
  const backendPath = path.join(__dirname, "backend", "server.js");

  console.log("Starting backend...");
  backendProcess = spawn("node", [backendPath], {
    cwd: path.join(__dirname, "backend"),
    stdio: "inherit",
  });

  backendProcess.on("error", (err) => {
    console.error("Failed to start backend:", err);
  });
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "frontend/dist/index.html"));
  }
};

app.whenReady().then(() => {
  createBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
