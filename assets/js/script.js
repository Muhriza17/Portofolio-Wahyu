// typed.js (existing)
let typed = new Typed(".teks", {
  strings: ["Sedang Belajar CyberSecurity", "Fresh Graduate IT"],
  typeSpeed: 60,
  backSpeed: 60,
  backDelay: 1000,
  loop: true,
});

// Helper: animate radial circles and linear bars when section visible
document.addEventListener("DOMContentLoaded", function () {
  const radialCards = document.querySelectorAll(".radial-card");
  const linearBars = document.querySelectorAll(".linear-bar");

  // Prepare radial SVG: calculate circumference
  radialCards.forEach(card => {
    const progressCircle = card.querySelector(".progress");
    const r = progressCircle.getAttribute("r");
    const circumference = 2 * Math.PI * r;
    progressCircle.style.strokeDasharray = `${circumference}`;
    progressCircle.style.strokeDashoffset = `${circumference}`;
    // visually style stroke using gradient via CSS (we used solid colors)
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // If the observed element is skills-section or one of its children
        // Animate radials
        radialCards.forEach(card => {
          const percent = parseInt(card.dataset.percent, 10) || 0;
          const progress = card.querySelector(".progress");
          const r = progress.getAttribute("r");
          const circumference = 2 * Math.PI * r;
          // calculate offset for percent
          const offset = circumference - (percent / 100) * circumference;
          // animate (transition is in CSS)
          progress.style.strokeDashoffset = offset;
          // update percentage number with counting animation
          const percentEl = card.querySelector(".percent");
          animateCount(percentEl, 0, percent, 1100);
        });

        // Animate linear bars
        linearBars.forEach(bar => {
          const pct = parseInt(bar.dataset.percent, 10) || 0;
          const fill = bar.querySelector(".linear-fill");
          // trigger width change
          setTimeout(() => {
            fill.style.width = pct + "%";
          }, 80);
        });

        // Once animated, unobserve to prevent re-run
        observer.disconnect();
      }
    });
  }, observerOptions);

  // start observing the skills-section container
  const skillsSection = document.querySelector(".skills-section");
  if (skillsSection) observer.observe(skillsSection);

  // simple number counting animation
  function animateCount(el, start, end, duration) {
    const range = end - start;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * range + start);
      el.textContent = value + "%";
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end + "%";
      }
    }
    window.requestAnimationFrame(step);
  }
});