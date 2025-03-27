document.getElementById("startBtn").addEventListener("click", () => {
    console.log("Start button clicked.");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) {
        console.error("No active tab found.");
        return;
      }
      console.log("Active tab found:", tabs[0]);
      chrome.tabs.sendMessage(tabs[0].id, { command: "start" }, (response) => {
        console.log("Response from content script (start):", response);
      });
      document.getElementById("status").innerText = "Active";
    });
  });
  
  document.getElementById("stopBtn").addEventListener("click", () => {
    console.log("Stop button clicked.");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || !tabs[0]) {
        console.error("No active tab found.");
        return;
      }
      console.log("Active tab found:", tabs[0]);
      chrome.tabs.sendMessage(tabs[0].id, { command: "stop" }, (response) => {
        console.log("Response from content script (stop):", response);
      });
      document.getElementById("status").innerText = "Inactive";
    });
  });
  