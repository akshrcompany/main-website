// // Initialize GSAP ScrollTrigger
// gsap.registerPlugin(ScrollTrigger);

// const images = Array.from({ length: 60 }, (_, i) => `images/akshrcardanim/${String(i + 1).padStart(4, '0')}.webp`);
// const textDescriptions = [
//     "<h1>Tap to Connect</h1> <p>Instantly share your professional details by tapping your card on any smartphone.</p>",
//     "<h1>Show your Akshrs</h1> <p>Personalize your Akshr Card according to your personality.</p>",
//     "<h1>Seamless Networking</h1> <p>Share yourself with the world with custom links.</p>",

// ];


// let currentImageIndex = 0;

// // Update image and text content
// function updateContent(index) {
//     document.getElementById('image').src = images[index];
//     const textIndex = Math.floor(index / 20);
//     document.getElementById('text').innerHTML = textDescriptions[textIndex];
// }


// // ScrollTrigger to manage animation and text/image changes
// gsap.registerPlugin(ScrollTrigger);


// gsap.to(".animation-section", {
//     scrollTrigger: {
//         trigger: ".animation-section",
//         start: "top top",
//         end: "bottom top",
//         scrub: true,
//         pin: true,
//         onUpdate: (self) => {
//             let progress = self.progress * (images.length - 1);
//             let newIndex = Math.round(progress);
//             if (newIndex !== currentImageIndex) {
//                 currentImageIndex = newIndex;
//                 updateContent(currentImageIndex);
//             }
//         },
//         onLeave: () => {
//             document.querySelector('.bottom-section').hidden = false;
//         }
//     }
// });

document.querySelectorAll('.dot_containter').forEach(dot => {
    dot.addEventListener('click', function () {
        document.querySelectorAll('.dot_containter').forEach(d => d.classList.remove('active'));

        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        this.classList.add('active');
    });
});



document.querySelectorAll('input[name="design"]').forEach(input => {
    input.addEventListener('click', function () {
        document.querySelectorAll('.radio').forEach(radio =>
            radio.classList.remove('active'));
        var more_options = document.getElementById("more_options");
        const color = this.getAttribute('data-color');
        const image = this.getAttribute('data-image');
        const card = this.getAttribute('data-card');
        const cardName = this.getAttribute('data-name');

        const parentDiv = document.querySelector('.card_customization');
        parentDiv.style.backgroundImage = `url("${image}")`;

        parentDiv.style.color = color === 'black' ? 'white' : 'black'; // Adjust text color for better visibility
        console.log(cardName);
        const imageDisplay = document.getElementById('image-display');
        imageDisplay.src = card;
        if (cardName === 'Matrix') {
            parentDiv.style.color = 'white'; // Set text color to white for better visibility
        }
        if (cardName === 'Vertex') {
            more_options.style.display = "grid";
        }
        else {
            more_options.style.display = "none";
        }
    });
});
document.querySelectorAll('input[name="vertex"]').forEach(input => {
    input.addEventListener('click', function () {
        document.querySelectorAll('.colorbutton').forEach(button => button.classList.remove('active'));
        this.classList.add('active');

        const color = this.getAttribute('data-color');
        const image = this.getAttribute('data-image');
        const card = this.getAttribute('data-card');

        const parentDiv = document.querySelector('.card_customization');
        if (image) {
            parentDiv.style.backgroundImage = `url("${image}")`;
        }

        if (color) {
            parentDiv.style.color = color === 'black' ? 'white' : 'black'; // Adjust text color for better visibility
        }

        const imageDisplay = document.getElementById('image-display');
        if (card) {
            imageDisplay.src = card;
        }
    });
});
// Function to handle animation and iframe loading on scrolling to .interaction section
function handleInteractionSection() {
    const interactionSection = document.querySelector('.interaction');
    const iframe = document.querySelector('.interaction iframe');

    if (interactionSection && iframe) {
        // Set the iframe's initial src to an empty string
        iframe.src = "";

        let triggered = false; // Flag to ensure it triggers only once

        gsap.to(interactionSection, {
            scrollTrigger: {
                trigger: interactionSection,
                start: "top 90%",
                onEnter: () => {
                    if (!triggered) {
                        triggered = true; // Set the flag to true
                        document.getElementsByClassName('hands')[0].classList.add('hands_animation'); // Add animation class
                        document.getElementsByClassName('iframe_container')[0].classList.add('animate'); // Add animation class

                        setTimeout(() => {
                            iframe.src = iframe.getAttribute('data-src'); // Load iframe content


                        }, 3000); // Delay of 1 second
                    }
                }
            }
        });
    }
}

// Call the function to initialize the behavior
handleInteractionSection();