const horizontalPositionEl = document.getElementById("horizontal-position");
const verticalPositionEl = document.getElementById("vertical-position");
const toastTypeEl = document.getElementById("toast-type");
const toastMessageEl = document.getElementById("toast-message");
const showToastButtonEl = document.querySelector(".show-toast");
const durationEl = document.getElementById("duration");
const durationOutputEl = document.getElementById("duration-output");

// Toast containers
const leftTopContainer = document.querySelector(".tc-left-top");
const leftBottomContainer = document.querySelector(".tc-left-bottom");
const rightTopContainer = document.querySelector(".tc-right-top");
const rightBottomContainer = document.querySelector(".tc-right-bottom");

// Update the duration label
durationEl.addEventListener("input", () => {
  durationOutputEl.textContent = durationEl.value;
});

// Enable or disable the button based on the input
toastMessageEl.addEventListener("input", () => {
  showToastButtonEl.disabled = toastMessageEl.value.trim().length === 0;
});

// Show the toast
showToastButtonEl.addEventListener("click", () => {
  const message = toastMessageEl.value.trim();
  const type = toastTypeEl.value;
  const horizontalPosition = horizontalPositionEl.value;
  const verticalPosition = verticalPositionEl.value;
  const duration = Number(durationEl.value) * 1000;

  showToast(message, type, duration, horizontalPosition, verticalPosition);
});

// Display the toast
function showToast(
  message,
  type,
  duration,
  horizontalPosition,
  verticalPosition
) {
  const toast = createToast(message, type, duration);
  let container;

  if (horizontalPosition === "left") {
    container =
      verticalPosition === "top" ? leftTopContainer : leftBottomContainer;
  } else {
    container =
      verticalPosition === "top" ? rightTopContainer : rightBottomContainer;
  }

  container.appendChild(toast);
}

// Create a toast element
function createToast(message, type, duration) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="remove">&times;</button>
  `;

  const removeButton = toast.querySelector(".remove");
  removeButton.addEventListener("click", () => removeToast(toast));

  setTimeout(() => removeToast(toast), duration);

  return toast;
}

// Remove toast with animation
function removeToast(toast) {
  toast.classList.add("fade-out");
  toast.addEventListener("transitionend", () => toast.remove());
}
