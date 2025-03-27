// content.js

let automationActive = false;
let lastContinueY = 0; // vertical position boundary for tasks in previous module
let scrollAttempts = 0;
const maxScrollAttempts = 5; // maximum number of small scrolls in one go

function processAutomation() {
  if (!automationActive) return; // Stop if automation is deactivated.

  // Find all "Continue" buttons on the page.
  const continueButtons = Array.from(document.querySelectorAll('button'))
    .filter(btn => btn.textContent.trim().includes("Continue"));

  // When automation just started (lastContinueY == 0), ignore the boundary filter.
  const enabledContinue = continueButtons.find(btn => {
    const btnY = btn.getBoundingClientRect().top;
    return !btn.disabled && (lastContinueY === 0 || btnY > lastContinueY);
  });

  if (enabledContinue) {
    console.log("Enabled 'Continue' button found at Y:", enabledContinue.getBoundingClientRect().top);
    lastContinueY = enabledContinue.getBoundingClientRect().top; // update boundary
    enabledContinue.click();
    resetTaskMarkers();
    scrollAttempts = 0; // Reset scroll attempts on success.
    setTimeout(processAutomation, 1500);
    return;
  }

  // Look for a disabled Continue button (i.e. tasks pending) below the boundary.
  const disabledContinue = continueButtons.find(btn => {
    const btnY = btn.getBoundingClientRect().top;
    return btn.disabled && (lastContinueY === 0 || btnY > lastContinueY);
  });

  if (disabledContinue) {
    console.log("Disabled 'Continue' button detected at Y:", disabledContinue.getBoundingClientRect().top, ". Assuming tasks are pending.");

    // TASK 1: Right Swipe Menu
    let rightSwipe = document.querySelector('i.fa-angle-right.fa-4x.cursor-pointer.font-weight-900.text-primary');
    if (rightSwipe && (lastContinueY === 0 || rightSwipe.getBoundingClientRect().top > lastContinueY)) {
      console.log("Clicking Right Swipe Menu at Y:", rightSwipe.getBoundingClientRect().top);
      rightSwipe.click();
      setTimeout(processAutomation, 1000);
      return;
    }

    // TASK 2: Card Task
    let cards = Array.from(document.querySelectorAll('div.card__face.card__face--front.text-center'))
      .filter(card => (lastContinueY === 0 || card.getBoundingClientRect().top > lastContinueY));
    let unclickedCard = cards.find(card => !card.dataset.clicked);
    if (unclickedCard) {
      console.log("Clicking a Card at Y:", unclickedCard.getBoundingClientRect().top);
      unclickedCard.click();
      unclickedCard.dataset.clicked = "true";
      setTimeout(processAutomation, 1000);
      return;
    }

    // TASK 3: Image Hover-Card
    let imageHovers = Array.from(document.querySelectorAll('div.hover-card-onhover-bg-overlay'))
      .filter(hover => (lastContinueY === 0 || hover.getBoundingClientRect().top > lastContinueY));
    let unclickedHover = imageHovers.find(hover => !hover.dataset.clicked);
    if (unclickedHover) {
      console.log("Clicking an Image Hover-Card at Y:", unclickedHover.getBoundingClientRect().top);
      unclickedHover.click();
      unclickedHover.dataset.clicked = "true";
      setTimeout(processAutomation, 1000);
      return;
    }

    // TASK 4: Dropdown Div – click its icon.
    let dropdownIcons = Array.from(document.querySelectorAll('div.col-12.mb-2.card.bg-white i.fa-angle-right.app-fade.fa-3x'))
      .filter(icon => (lastContinueY === 0 || icon.getBoundingClientRect().top > lastContinueY));
    let unclickedDropdown = dropdownIcons.find(icon => !icon.dataset.clicked);
    if (unclickedDropdown) {
      console.log("Clicking Dropdown Icon at Y:", unclickedDropdown.getBoundingClientRect().top);
      unclickedDropdown.click();
      unclickedDropdown.dataset.clicked = "true";
      setTimeout(processAutomation, 1000);
      return;
    }

    // TASK 5: Face Card
    let faceCards = Array.from(document.querySelectorAll('div.flip-card'))
      .filter(faceCard => (lastContinueY === 0 || faceCard.getBoundingClientRect().top > lastContinueY));
    if (faceCards.length > 0) {
      console.log("Clicking Face Card at Y:", faceCards[0].getBoundingClientRect().top);
      faceCards[0].click();
      setTimeout(processAutomation, 1000);
      return;
    }

    console.log("No specific task elements found below the current boundary. Waiting for tasks to appear...");
    // Fall through to scroll check below.
  } // End of disabledContinue branch.

  // If no Continue button (enabled or disabled) is found below the current boundary,
  // check for text "below to continue" near the bottom of the visible page.
  const pageText = document.body.innerText;
  if (pageText.toLowerCase().includes("below to continue")) {
    console.log(`Found text "below to continue". Attempting to scroll.`);
    performScroll();
    return;
  }

  // Also, if no tasks found and no Continue button, then try scrolling.
  console.log("No 'Continue' button or tasks found below the current boundary. Scrolling as fallback.");
  performScroll();
}

function performScroll() {
  if (scrollAttempts < maxScrollAttempts) {
    scrollAttempts++;
    console.log("Scrolling down by 300 pixels. Attempt:", scrollAttempts);
    window.scrollBy(0, 300);
    setTimeout(processAutomation, 1500);
  } else {
    console.log("Max scroll attempts reached. Resetting scroll counter and rechecking.");
    scrollAttempts = 0;
    setTimeout(processAutomation, 1500);
  }
}

function resetTaskMarkers() {
  // Clear markers from card tasks.
  const cards = document.querySelectorAll('div.card__face.card__face--front.text-center');
  cards.forEach(card => delete card.dataset.clicked);
  // Clear markers from image hover tasks.
  const imageHovers = document.querySelectorAll('div.hover-card-onhover-bg-overlay');
  imageHovers.forEach(hover => delete hover.dataset.clicked);
  // Clear markers from dropdown icons.
  const dropdownIcons = document.querySelectorAll('div.col-12.mb-2.card.bg-white i.fa-angle-right.app-fade.fa-3x');
  dropdownIcons.forEach(icon => delete icon.dataset.clicked);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "start") {
    if (!automationActive) {
      automationActive = true;
      lastContinueY = 0; // Reset boundary when starting automation.
      scrollAttempts = 0; // Reset scroll counter.
      console.log("Automation started.");
      processAutomation();
    }
  } else if (message.command === "stop") {
    automationActive = false;
    console.log("Automation stopped by user.");
  }
});
