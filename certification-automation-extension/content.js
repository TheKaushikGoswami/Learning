let automationActive = false;

function processAutomation() {
  if (!automationActive) return;
  
  // 1. Check for a "Download Certificate" button; if found, stop automation.
  const downloadBtn = Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.trim().toLowerCase().includes("download certificate"));
  if (downloadBtn) {
    automationActive = false;
    observer.disconnect();
    return;
  }
  
  // 2. Look for a Continue button.
  let continueBtn = Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.trim().toLowerCase() === "continue");
  if (continueBtn) {
    if (continueBtn.disabled) {
      continueBtn.disabled = false;
    }
    continueBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    continueBtn.click();
    requestAnimationFrame(processAutomation);
    return;
  }
  
  // 3. If no Continue button exists, check for arrow containers.
  let arrowsPrimary = Array.from(document.querySelectorAll("div.arrow-container.arrow-container-primary"));
  let arrowsSecondary = Array.from(document.querySelectorAll("div.arrow-container.arrow-container-secondary"));
  let arrows = arrowsPrimary.concat(arrowsSecondary);
  if (arrows.length > 0) {
    let arrow = arrows[0];
    arrow.scrollIntoView({ behavior: "smooth", block: "center" });
    arrow.click();
    requestAnimationFrame(processAutomation);
    return;
  }
  
  // 4. Otherwise, assume an MCQ is present. Look for a "Check" button.
  let checkBtn = Array.from(document.querySelectorAll("button"))
    .find(btn => btn.textContent.trim().toLowerCase() === "check");
  if (checkBtn) {
    if (checkBtn.disabled) {
      checkBtn.disabled = false;
    }
    checkBtn.scrollIntoView({ behavior: "smooth", block: "center" });
    checkBtn.click();
    
    // Immediately check for a "Show Answer" button.
    let showAnswerBtn = Array.from(document.querySelectorAll("button"))
      .find(btn => btn.textContent.trim().toLowerCase() === "show answer");
    if (showAnswerBtn) {
      if (showAnswerBtn.disabled) {
        showAnswerBtn.disabled = false;
      }
      showAnswerBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      showAnswerBtn.click();
    }
    requestAnimationFrame(processAutomation);
    return;
  }
  
  requestAnimationFrame(processAutomation);
}

// MutationObserver to trigger processing on DOM changes.
const observer = new MutationObserver(mutations => {
  if (!automationActive) return;
  processAutomation();
});

function initObserver() {
  observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    if (!automationActive) {
      automationActive = true;
      initObserver();
      requestAnimationFrame(processAutomation);
    }
  } else if (message.command === "stop") {
    automationActive = false;
    observer.disconnect();
  }
});
