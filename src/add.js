const electron = require("electron");
const path = require("path");
const ipc = electron.ipcRenderer;
const remote = electron.remote;

const closeBtn = document.getElementById("closeBtn");

if (closeBtn) {
	closeBtn.addEventListener("click", function (event) {
		var window = remote.getCurrentWindow();
		window.close();
	});
}

const updateBtn = document.getElementById("updateBtn");

if (updateBtn) {
	updateBtn.addEventListener("click", function (event) {
		ipc.send("update-notify-value", document.getElementById("notifyVal").value);

		var window = remote.getCurrentWindow();
		window.close();
	});
}
