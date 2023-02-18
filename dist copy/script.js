// Toasts
function showToast({ title, message, type, duration }) {
  // Check if there is an existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    // If there is, remove it first with an animation
    existingToast.style.animation = 'fadeOut linear 0.5s';
    setTimeout(() => {
      existingToast.remove();
    }, 500);
  }

  // Create the toast container
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(`toast--${type}`);

  // Create the close button
  const closeButton = document.createElement('span');
  closeButton.classList.add('toast__close');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    closeToast();
  });

  // Create the title
  if (title !== '') {
    const titleElement = document.createElement('div');
    titleElement.classList.add('toast__title');
    titleElement.innerHTML = title;
    toast.appendChild(titleElement);
  }

  // Create the message and icon
  const messageElement = document.createElement('div');
  messageElement.classList.add('toast__message');
  const icon = document.createElement('i');
  switch (type) {
    case 'success':
      icon.classList.add('fas', 'fa-check-circle');
      break;
    case 'warning':
      icon.classList.add('fas', 'fa-exclamation-triangle');
      break;
    case 'error':
      icon.classList.add('fas', 'fa-times-circle');
      break;
  }
  messageElement.appendChild(icon);
  const messageTextElement = document.createElement('span');
  messageTextElement.innerHTML = message;
  messageElement.appendChild(messageTextElement);
  toast.appendChild(messageElement);

  // Create the progress bar
  const progressBar = document.createElement('div');
  progressBar.classList.add('toast__progress');
  progressBar.classList.add(`toast__progress--${type}`);
  progressBar.style.width = 'calc(100% - 20px)'; // Subtract 20px for gutter
  toast.appendChild(progressBar);

  let intervalId;
  let start;
  let percentComplete = 100;

  // Animate the progress bar
  intervalId = setInterval(() => {
    if (!start) {
      start = Date.now();
    }
    const elapsed = Date.now() - start;
    percentComplete = Math.max(0, 100 - (elapsed / duration) * 100);
    progressBar.style.width = `calc(${percentComplete}% - 20px)`; // Subtract 20px for gutter
    if (percentComplete <= 0) {
      clearInterval(intervalId);
      closeToast();
    }
  }, 1);

  // Append the close button and toast to the body
  toast.appendChild(closeButton);
  document.body.appendChild(toast);

  // Function to close the toast and remove it from the DOM with an animation
  function closeToast() {
    clearInterval(intervalId);
    toast.style.animation = 'fadeOut linear 0.1s';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 5);
  }
}

showToast({
  title: 'Success!',
  message: 'Your action was successful.',
  type: 'warning',
  duration: 4000,
});
