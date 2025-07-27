
import { db, collection, addDoc } from "../javascript/config.js";
const images = [
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%201.png?alt=media", className: "hideLeft" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%202.png?alt=media", className: "prevLeftSecond" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%203.webp?alt=media", className: "prev" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%204.webp?alt=media", className: "selected" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%205.webp?alt=media", className: "next" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%201.png?alt=media", className: "nextRightSecond" },
  { src: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2FCarousel%202.png?alt=media", className: "hideRight" }
];

// Generate the carousel
const carousel = document.getElementById("carousel");

// Iterate through the images array and create elements
images.forEach(image => {
  const div = document.createElement("div");
  div.className = image.className;

  const img = document.createElement("img");
  img.src = image.src;

  div.appendChild(img);
  carousel.appendChild(div);
});



// Place the moveToSelected function at the top level of your script
function moveToSelected(element) {
  let selected;

  if (element === "next") {
    selected = document.querySelector(".selected").nextElementSibling;
  } else if (element === "prev") {
    selected = document.querySelector(".selected").previousElementSibling;
  } else {
    selected = element;
  }

  if (!selected) return;

  const next = selected.nextElementSibling;
  const prev = selected.previousElementSibling;
  const prevSecond = prev ? prev.previousElementSibling : null;
  const nextSecond = next ? next.nextElementSibling : null;

  document.querySelectorAll(".selected, .prev, .next, .nextRightSecond, .prevLeftSecond, .hideRight, .hideLeft")
    .forEach(el => el.className = "");

  selected.classList.add("selected");

  if (prev) prev.classList.add("prev");
  if (next) next.classList.add("next");
  if (nextSecond) nextSecond.classList.add("nextRightSecond");
  if (prevSecond) prevSecond.classList.add("prevLeftSecond");

  if (nextSecond) {
    let current = nextSecond.nextElementSibling;
    while (current) {
      current.classList.add("hideRight");
      current = current.nextElementSibling;
    }
  }

  if (prevSecond) {
    let current = prevSecond.previousElementSibling;
    while (current) {
      current.classList.add("hideLeft");
      current = current.previousElementSibling;
    }
  }
}

// Drag, touch, and scroll handlers (add these after the function is defined)
let startX, isDragging = false;

function handleDragStart(e) {
  startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  isDragging = true;
}

function handleDragMove(e) {
  if (!isDragging) return;

  const x = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
  const diff = x - startX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      moveToSelected("prev");
    } else {
      moveToSelected("next");
    }
    isDragging = false;
  }
}

function handleDragEnd() {
  isDragging = false;
}

function handleScroll(e) {
  const deltaY = e.deltaY || e.detail || e.wheelDelta;

  if (deltaY > 0) {
    moveToSelected("next");
  } else {
    moveToSelected("prev");
  }
}

// Add event listeners

carousel.addEventListener("touchstart", handleDragStart);
carousel.addEventListener("touchmove", handleDragMove);
carousel.addEventListener("touchend", handleDragEnd);

carousel.addEventListener("mousedown", handleDragStart);
carousel.addEventListener("mousemove", handleDragMove);
carousel.addEventListener("mouseup", handleDragEnd);
carousel.addEventListener("mouseleave", handleDragEnd);

carousel.addEventListener("wheel", handleScroll);




const data = [
  {
    alt: "Android",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2FAndroid.png?alt=media"
  },
  {
    alt: "Image 2",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2Fios.png?alt=media"
  },
  {
    alt: "kaios",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2Fkaios.png?alt=media"
  },
  {
    alt: "linux",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2Flinux.png?alt=media"
  },
  {
    alt: "windows",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2Fwindows.png?alt=media"
  },
  {
    alt: "smartTv",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2FsmartTv.png?alt=media"
  },
  {
    alt: "macOS",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FMacOs_Logo.png?alt=media"
  },
  {
    alt: "webos",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fsoftware-development%2Fplatform%2Fwebos.png?alt=media"
  },

];

const container = document.getElementById('platform-container');

data.forEach(item => {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'grid-item';

  const img = document.createElement('img');
  img.src = item.imageUrl;
  img.alt = item.alt;


  itemDiv.appendChild(img);
  container.appendChild(itemDiv);
});


// Add event listener to the "Service Requests" link const FUNCTION_URL = 'https://asia-south1-<YOUR_PROJECT>.cloudfunctions.net/submitServiceRequest';

document
  .getElementById('callback-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    // Form validation
    const interest = document.getElementById('interest').value.trim();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const preferredContact = document.querySelector('input[name="preferred_contact"]:checked')?.value || '';
    const contactDate = document.getElementById('contact-date').value.trim();
    const contactTime = document.getElementById('contact-time').value.trim();

    let errors = [];
    if (!interest) errors.push('Please select your interest.');
    if (!name) errors.push('Name is required.');
    if (!phone) errors.push('Phone number is required.');
    if (!/^\d{7,15}$/.test(phone)) errors.push('Enter a valid phone number.');
    if (!email) errors.push('Email is required.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Enter a valid email address.');
    if (!preferredContact) errors.push('Please select a preferred contact method.');
    if (!contactDate) errors.push('Please select a contact date.');
    if (!contactTime) errors.push('Please select a contact time.');

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    // 1️⃣ get the recaptcha token
    const token = await grecaptcha.execute('6LeB4X0rAAAAAGr1EXW-328lXsB0nM8gZlCL_WZR', { action: 'submit' });

    // 3️⃣ build payload
    const payload = {
      interest,
      name,
      phone,
      email,
      preferredContact,
      contactDate,
      contactTime,
      recaptchaToken: token
    };

    try {
      // 4️⃣ POST to your Cloud Function
      const resp = await fetch('https://akshr.in/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || resp.statusText);

      alert(json.message); // “Service request submitted!”
      document.getElementById('callback-form').reset();
     document.getElementById('callback-modal').close();
    } catch (err) {
      console.error(err);
      alert('Submission failed: ' + err.message);
    }
  });