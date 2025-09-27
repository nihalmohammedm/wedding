// Simplified Countdown Function
window.simplyCountdown = function(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    console.error('No elements found with selector:', selector);
    return;
  }

  // Default settings
  const defaults = {
    year: 2024,
    month: 10,
    day: 15,
    hours: 10,
    minutes: 0,
    seconds: 0,
    words: {
      days: { singular: 'Day', plural: 'Days' },
      hours: { singular: 'Hour', plural: 'Hours' },
      minutes: { singular: 'Minute', plural: 'Minutes' },
      seconds: { singular: 'Second', plural: 'Seconds' }
    },
    plural: true,
    zeroPad: true,
    onEnd: () => {}
  };

  const settings = { ...defaults, ...options };

  function updateCountdown(element, targetDate) {
    const now = new Date();
    let diff = targetDate - now;

    if (diff <= 0) {
      diff = 0;
      if (typeof settings.onEnd === 'function') {
        settings.onEnd();
      }
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * 1000 * 60 * 60 * 24;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * 1000 * 60 * 60;
    
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * 1000 * 60;
    
    const seconds = Math.floor(diff / 1000);

    element.innerHTML = `
      <div class="simply-section">
        <div>
          <span class="simply-amount">${settings.zeroPad ? String(days).padStart(2, '0') : days}</span>
          <span class="simply-word">${days === 1 ? settings.words.days.singular : settings.words.days.plural}</span>
        </div>
      </div>
      <div class="simply-section">
        <div>
          <span class="simply-amount">${settings.zeroPad ? String(hours).padStart(2, '0') : hours}</span>
          <span class="simply-word">${hours === 1 ? settings.words.hours.singular : settings.words.hours.plural}</span>
        </div>
      </div>
      <div class="simply-section">
        <div>
          <span class="simply-amount">${settings.zeroPad ? String(minutes).padStart(2, '0') : minutes}</span>
          <span class="simply-word">${minutes === 1 ? settings.words.minutes.singular : settings.words.minutes.plural}</span>
        </div>
      </div>
      <div class="simply-section">
        <div>
          <span class="simply-amount">${settings.zeroPad ? String(seconds).padStart(2, '0') : seconds}</span>
          <span class="simply-word">${seconds === 1 ? settings.words.seconds.singular : settings.words.seconds.plural}</span>
        </div>
      </div>
    `;
  }

  const targetDate = new Date(
    settings.year,
    settings.month - 1, // Months are 0-indexed
    settings.day,
    settings.hours,
    settings.minutes,
    settings.seconds
  );

  // Initialize immediately
  elements.forEach(element => {
    updateCountdown(element, targetDate);
  });

  // Update every second
  const intervalId = setInterval(() => {
    elements.forEach(element => {
      updateCountdown(element, targetDate);
    });
  }, 1000);

  // Return cleanup function
  return {
    stop: () => {
      clearInterval(intervalId);
    }
  };
};

// Initialize countdown
simplyCountdown('.simply-countdown', {
  year: 2025,
  month: 12,
  day: 6,
  hours: 12,
  minutes: 0,
  seconds: 0,
  zeroPad: true
});


// Navigation handling
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasNavbar'));
    if (offcanvas) offcanvas.hide();
  });
});