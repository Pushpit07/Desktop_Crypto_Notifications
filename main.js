const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const url = require("url");
const shell = require("electron").shell;
const ipc = require("electron").ipcMain;

let win;

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});

	// and load the index.html of the app.
	win.loadURL(
		url.format({
			pathname: path.join(__dirname, "src/index.html"),
			protocol: "file:",
			slashes: true,
		})
	);

	win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});

	var menu = Menu.buildFromTemplate([
		{
			label: "Menu",
			submenu: [
				{ label: "Adjust Notification Value" },
				{
					label: "CoinMarketCap",
					click() {
						shell.openExternal("https://coinmarketcap.com");
					},
				},
				{
					type: "separator",
				},
				{
					label: "Exit",
					click() {
						app.quit();
					},
				},
			],
		},
		{
			label: "Info",
			submenu: [
				{
					type: "separator",
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipc.on("update-notify-value", function (event, arg) {
	win.webContents.send("targetPriceVal", arg);
});
