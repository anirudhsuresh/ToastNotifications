function showToast({ title, message, type, duration }) {
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
  progressBar.style.animation = `progress linear ${duration / 1000}s`;
  toast.appendChild(progressBar);

  let intervalId;
  let percentComplete = 100;

  // Animate the progress bar
  intervalId = setInterval(() => {
    percentComplete -= (100 / duration) * 0.1;
    progressBar.style.width = `${percentComplete}%`;

    if (percentComplete <= 0) {
      clearInterval(intervalId);
      closeToast();
    }
  }, 100);

  // Append the close button and toast to the body
  toast.appendChild(closeButton);
  document.body.appendChild(toast);

  // Function to close the toast and remove it from the DOM
  function closeToast() {
    clearInterval(intervalId);
    toast.classList.add('toast--hide');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }
}

// Show a success toast with a message and a title
showToast({
  title: 'Success!',
  message: 'Your action was successful.',
  type: 'success',
  duration: 2000,
});
