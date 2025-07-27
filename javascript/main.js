




const teamMembers = [
  {
    name: "Hardfdfdsh Tiwari",
    designation: "Technical Head",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fteam_members%2Fharsh.jpg?alt=media",
    linkedin: "https://www.linkedin.com/in/harshtiwari09/",
    facebookUrl: "#",
    emailUrl: "htiwari702@gmail.com"
  },
  {
    name: "Shoury Jain",
    designation: "Design Head",

    photoUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fteam_members%2Fshoury.jpeg?alt=media",
    linkedin: "https://www.linkedin.com/in/harshtiwari09/",

    facebookUrl: "#",
    emailUrl: "#"
  },
  {
    name: "Rishika Singh",
    designation: "Legal Head",

    photoUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fteam_members%2Frishika.jpg?alt=media",
    linkedin: "https://www.linkedin.com/in/harshtiwari09/",

    facebookUrl: "#",
    emailUrl: "#"
  },
  {
    name: "Anuj Punekar",
    designation: "Developer",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fteam_members%2Fanuj.jpg?alt=media",
    linkedin: "https://www.linkedin.com/in/anuj-punekar",

    facebookUrl: "#",
    emailUrl: "anujkakarot@gmail.com"
  },
  {
    name: "Rishabh <br>Vishwakarma",
    designation: "Developer",
    linkedin: "https://www.linkedin.com/in/rishabhvishwakarma28",

    photoUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fteam_members%2Frishabh.jpg?alt=media",
    facebookUrl: "https://www.instagram.com/rish_vish_28_rr?igsh=NjY0bjVxYXR2OW83",
    emailUrl: "ectopdash@gmail.com"

  }
];


function createTeamMemberHtml(member) {
  return `
    <div class="member">
      <img src="${member.photoUrl}" alt="${member.name}">
      <h2 class="name">${member.name}</h2>
      <h3 class="designation">${member.designation}</h3>
      <div class="social">
      <a href="${member.linkedin}"><i class="fab fa-linkedin"></i></a>
      <a href="${'mailto:' + member.emailUrl}"><i class="fa-solid fa-envelope"></i></a>

      <a href="${member.facebookUrl}"><i class="fab fa-instagram"></i></a>
        <!-- Add more social media links as needed -->
      </div>
    </div>
    `;
}

function addTeamMembers() {
  const teamSection = document.querySelector('.team');
  teamMembers.forEach(member => {
    const memberHtml = createTeamMemberHtml(member);
    teamSection.insertAdjacentHTML('beforeend', memberHtml);
  });
}

addTeamMembers();


window.addEventListener('scroll', function () {
  var sections = document.querySelectorAll('#homeScreen, #moto, #team, #product,#services');
  sections.forEach(function (section) {
    var rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      section.classList.remove('hidden');
      section.classList.add('visible');
    } else {
      section.classList.remove('visible');
      section.classList.add('hidden');
    }
  });
});


// Close modal if clicked outside the modal content
window.onclick = function (event) {
  var modals = document.getElementsByClassName('modal');
  for (var i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = 'none';
    }
  }
}





// Get the modal
const modal = document.getElementById('myModal'); // Get the button that opens the modal 
const openBtn = document.getElementById('showallMemebers'); // Get the button that closes the modal 
const closeBtn = document.getElementById('closeModal'); // When the user clicks the button, open the modal 
openBtn.onclick = function () {
  modal.showModal();
  document.body.style.overflow = 'hidden'; // Disable body scrolling
  }
// When the user clicks the close button, close the modal 
closeBtn.onclick = function () {
  modal.close();
  document.body.style.overflow = 'auto'; // Enable body scrolling
  } // When the user clicks outside the modal, close it 
window.onclick = function (event) { if (event.target === modal) { modal.close(); } }
