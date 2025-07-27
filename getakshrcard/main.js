import { auth, signInWithEmailAndPassword, dbd, storage, uploadBytes, getDownloadURL, ref, set, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, provider, OAuthProvider, signInWithPopup, appleprvoider } from "../javascript/config.js";

import { onValue, doc, getDoc, db, collection, setDoc, getDocs, signOut } from "../javascript/config.js";
// JavaScript solution to run in browser console or Node.js
// document.querySelectorAll('img[src^="./images/"]').forEach(img => {
//     const imageName = img.src.split('/').pop();
//     img.src = `https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2F${encodeURIComponent(imageName)}?alt=media`;
// });
document.querySelectorAll('img[src*="/images/akshrcards/"]').forEach(img => {
    // Extract just the filename without query parameters
    const imagePath = img.src.split('/images/akshrcards/')[1];
    const imageName = imagePath.split('?')[0].split('#')[0];
    console.log(imageName);
    img.src = `https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2F${encodeURIComponent(imageName)}?alt=media`;
});
const images = document.querySelectorAll('.images img');
function showImage(option) {
    images.forEach(img => img.classList.remove('active'));
    document.getElementById('customcarddesign').style.display = "none";
    document.getElementById('image' + option).classList.add('active');
    const dropdown = document.getElementById("style");
    document.getElementById('step1_submit').disabled = false;
    document.getElementById('nextbuttonformobile').disabled = false;

    dropdown.selectedIndex = option - 1; // Set the dropdown index based on the option
}

function customcarddesign() {
    const customCardContainer = document.getElementById('customcarddesign');
    customCardContainer.style.display = "flex";
    images.forEach(img => img.classList.remove('active'));
    document.getElementById('step1_submit').disabled = true;
    document.getElementById('nextbuttonformobile').disabled = true;
    document.getElementById('more_options').style.display = "none";


}


function updateProgressBar(currentStep) {
    const steps = document.querySelectorAll('.step');
    if (currentStep === 5 || currentStep === 6) currentStep = 2;
    // Clamp step to a valid range
    currentStep = Math.max(1, Math.min(currentStep, steps.length));

    steps.forEach((step, index) => {
        const iconDisabled = step.querySelector('.icon-disabled');
        const iconActive = step.querySelector('.icon-active');
        const iconCompleted = step.querySelector('.icon-completed');

        // Hide all icons first
        if (iconDisabled) iconDisabled.style.display = 'none';
        if (iconActive) iconActive.style.display = 'none';
        if (iconCompleted) iconCompleted.style.display = 'none';

        if (index < currentStep - 1) {
            // Completed step
            if (iconCompleted) iconCompleted.style.display = 'inline-block';
            step.classList.remove('active');
        } else if (index === currentStep - 1) {
            // Current (active) step
            if (iconActive) iconActive.style.display = 'inline-block';
            step.classList.add('active');
        } else {
            // Yet to come (disabled)
            if (iconDisabled) iconDisabled.style.display = 'inline-block';
            step.classList.remove('active');
        }
    });

    // Progress bar fill calculation
    const progressBarFill = document.getElementById('progress-bar-fill');
    const percentage = ((currentStep - 1) / (steps.length - 1)) * 100;
    progressBarFill.style.width = (steps.length === 1 ? 100 : percentage) + '%';
}

// Example usage:
updateProgressBar(1); // To show step 1 as active


function hideAllBanners() {
    // Show/hide progress bar based on #authForm active state
    const progressBar = document.querySelector('.progress-bar');
    const authForm = document.getElementById('authForm');
    const container3 = document.getElementById('container3');

    if (authForm && progressBar) {
        if (authForm.classList.contains('active') && container3.classList.contains('active')) {
            progressBar.style.display = 'none';
            document.body.style.backgroundColor = ' var(--Neutral-200, #E7EBEF)';
            authForm.style.backgroundColor = 'white';


        } else {
            progressBar.style.display = 'flex';
            document.body.style.backgroundColor = 'white';


        }
    }
}
const radios = document.querySelectorAll('input[name="option"]');
const radios_vertex = document.querySelectorAll('input[name="vertex"]');
var additionalColor;
const dropdown = document.getElementById('style');

radios.forEach(radio => {
    radio.addEventListener('change',
        function () {
            dropdown.value = this.nextElementSibling.textContent.trim();

        });
});
radios_vertex.forEach(radio => {
    radio.addEventListener('change',
        
        function () {
            dropdown.value = "Vertex";
            document.getElementById('more_options_vertex').style.display = "block";

        });
});
const themes = {
    Vertex: {
        backgroundColor: '#000',
        textColor: '#fff',
        conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FVertex.webp?alt=media)',
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2FVertex-Back.png?alt=media)',
        fontFamily: "'Montserrat', sans-serif",
        fontweight: 600,
        text_transform: null,
        backgroundImage1: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2FVertex-Front.png?alt=media)'
    },
    Phantom: {
        backgroundColor: '#000', textColor: '#fff',
        conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FPhantom.webp?alt=media)',
        fontFamily: "'Syne', sans-serif",
        fontweight: 500,
        text_transform: null,
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fphantom-back.png?alt=media)',
        backgroundImage1: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fphantom-front.png?alt=media)'
    },
    Matrix: {
        backgroundColor: '#000', textColor: '#fff',
        conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FMatrix.webp?alt=media)',
        fontFamily: "'VCR_OSD_MONO', sans-serif",
        fontweight: 400,
        text_transform: "uppercase",
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fmatrix-back.png?alt=media)',
        backgroundImage1: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fmatrix-front.png?alt=media)'
    },
    Pulse: {
        backgroundColor: '#fff', textColor: '#000',
        conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FPulse.webp?alt=media)',
        fontFamily: "'DM Sans', sans-serif",
        fontweight: 700,
        text_transform: 'null',
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fpulse-back.png?alt=media)',
        backgroundImage1: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fpulse-front.png?alt=media)'
    },
};


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('styledForm');
    const cardName = document.getElementById('cardName');
    const cardDesignation = document.getElementById('cardDesignation');
    const cardTagline = document.getElementById('cardTagline');
    const cardb = document.getElementById('cardb');
    const cardf = document.getElementById('cardf');

    // Add event listeners to the radio buttons in "more_options"
    document.querySelectorAll('#more_options input[name="vertex"]').forEach((radio) => {
        radio.addEventListener('change', () => {
            // Map the selected radio button in "more_options" to the corresponding radio button in "more_options_vertex"
            if (radio.id === 'classic') {
                document.getElementById('classic_color').checked = true;
                additionalColor = "classic";
                applyStyles("black", "white", false); // Apply styles for classic variant
            } else if (radio.id === 'akshr') {
                document.getElementById('akshr_color').checked = true;
                additionalColor = "akshr";
                applyStyles("#1863AA", "white", false); // Apply styles for akshr variant
            } else if (radio.id === 'peace') {
                additionalColor = "peace";
                document.getElementById('peace_color').checked = true;
                applyStyles("black", "white", true); // Apply styles for peace variant
            }
        });
    });
    // Add event listeners for the radio buttons
    const designOptions = document.querySelectorAll('input[name="design"]');
    designOptions.forEach((radio, index) => {
        radio.addEventListener('click', () => {
            if (radio.id === 'option1') {
                showImage(1);
                document.getElementById('more_options').style.display = "block";
                const theme = themes.Vertex;
                applyThemeToCardHolder(theme);
            }
            else if (radio.id === 'design2') {
                document.getElementById('more_options').style.display = "none";
                showImage(2);
                const theme = themes.Pulse;
                applyThemeToCardHolder(theme);
            }
            else if (radio.id === 'design3') {
                document.getElementById('more_options').style.display = "none";
                showImage(3);
                const theme = themes.Phantom;
                applyThemeToCardHolder(theme);
            }
            else if (radio.id === 'design4') {
                document.getElementById('more_options').style.display = "none";
                showImage(4);
                const theme = themes.Matrix;
                applyThemeToCardHolder(theme);
            }
            else {
                customcarddesign();
            }
        });

        function applyThemeToCardHolder(theme) {
            const cardHolder = document.querySelector(".cardholder");
            const cardb = document.getElementById("cardb");
            const cardf = document.getElementById("cardf");

            cardHolder.style.backgroundImage = theme.conatinerImage;
            cardHolder.style.fontFamily = theme.fontFamily;
            cardHolder.style.fontWeight = theme.fontweight;
            cardHolder.style.textTransform = theme.text_transform;

            cardb.style.backgroundColor = theme.backgroundColor;
            cardb.style.color = theme.textColor;
            cardb.style.backgroundImage = theme.backgroundImage;

            cardf.style.backgroundColor = theme.backgroundColor;
            cardf.style.color = theme.textColor;
            cardf.style.backgroundImage = theme.backgroundImage1;
            if (theme === themes.Pulse) {
                document.getElementsByClassName("tagline")[1].style.color = "white";
            }
        }
    });

    const additionalDesignOptions = document.querySelectorAll('input[name="vertex"]');
    additionalDesignOptions.forEach((radio) => {
        radio.addEventListener('click', () => {
            if (radio.id === 'classic') showImage(1);
            else if (radio.id === 'akshr') showImage(6);
            else if (radio.id === 'peace') showImage(5);
        });
    });

    form.addEventListener('input',
        function () {
            document.querySelectorAll('h1[name="cardName"').forEach(element => {
                element.textContent = document.getElementById('name').value;
            });
            document.querySelectorAll('span[class="title"]').forEach(element => {
                element.textContent = document.getElementById('designation').value;
            });
            document.querySelectorAll('span[class="tagline"]').forEach(element => {
                element.textContent = document.getElementById('tagline').value;
            });
            const style = document.getElementById('style').value;
            var cardcontainer = document.getElementsByClassName("cardholder")[0];
            var holder = document.getElementsByClassName("holder")[0];
            const theme = themes[style];
            cardcontainer.style.backgroundImage = themes[style].conatinerImage;
            cardcontainer.style.fontweight = themes[style].fontweight;
            cardcontainer.style.textTransform = themes[style].text_transform;
            cardcontainer.style.fontFamily = themes[style].fontFamily;
            cardb.style.backgroundColor = theme.backgroundColor;
            cardb.style.color = theme.textColor;
            cardb.style.backgroundImage = theme.backgroundImage;
            cardf.style.backgroundColor = theme.backgroundColor;
            cardf.style.color = theme.textColor;
            cardf.style.backgroundImage = theme.backgroundImage1;
            if (style === "Matrix") {
                document.querySelectorAll('h1[name="cardName"]').forEach(element => {
                    element.style.fontWeight = "400";
                    element.style.textTransform = "uppercase";
                });
                document.querySelectorAll('span[class="tagline"]').forEach(element => {
                    element.style.fontFamily = "'DM Sans', sans-serif";
                    element.style.fontWeight = "600";
                    element.style.textTransform = "uppercase";
                });
            } else {
                document.querySelectorAll('h1[name="cardName"]').forEach(element => {
                    element.style.fontWeight = ""; // Reset to default
                    element.style.textTransform = ""; // Reset to default
                });
                document.querySelectorAll('span[class="tagline"]').forEach(element => {
                    element.style.fontFamily = ""; // Reset to default
                    element.style.fontWeight = ""; // Reset to default
                    element.style.textTransform = ""; // Reset to default
                });
            }
            if (dropdown.value === "Vertex") {
                document.getElementById("more_options_vertex").style.display = "block";
            } else {
                document.getElementById("more_options_vertex").style.display = "none";
                additionalColor = "None";
            }

        });



    const classicOption = document.getElementById("classic_color");
    const akshrOption = document.getElementById("akshr_color");
    const peaceOption = document.getElementById("peace_color");
    const holder = document.querySelector("#cardb");


    function applyStyles(backgroundColor, textColor, invert = false) {
        holder.style.backgroundColor = backgroundColor;
        holder.style.color = textColor;
        holder.style.filter = invert ? "invert(1)" : "none";
    }

    function resetStyles() {
        holder.style.backgroundColor = ""; // Reset to default
        holder.style.color = ""; // Reset to default
        holder.style.filter = "none"; // Remove invert
    }

    // Add event listeners for the color options
    classicOption.addEventListener("click", () => {
        applyStyles("black", "white", false);
        additionalColor = "classic"
    });

    akshrOption.addEventListener("change", () => {
        applyStyles("#1863AA", "white");
        additionalColor = "akshr"

        console.log("blue is checked")
    });

    peaceOption.addEventListener("click", () => {
        applyStyles("black", "white", true);
        additionalColor = "peace"

    });

    // Add event listener for the dropdown
    dropdown.addEventListener("change", (e) => {
        const selectedValue = e.target.value;
applyThemeToCardHolder();
        if (selectedValue === "Vertex") {
            // Keep the styles for Vertex
            document.getElementById("more_options_vertex").style.display = "block";
        } else {
            // Revert styles for other options
            resetStyles();
            document.getElementById("more_options_vertex").style.display = "none";
        }
    });
});

const flipButton = document.getElementById('flipbutton');
const holders = document.querySelectorAll('.holder');
let isFlipped = false;

flipButton.addEventListener('click', () => {
    flipButton.style.transition = 'transform 0.5s';
    if (!isFlipped) {
        flipButton.style.transform = 'rotate(180deg)';

        holders[0].style.transition = 'transform 1s, opacity 0.5s';
        holders[0].style.transform = 'rotateX(90deg) rotateY(90deg) rotateZ(90deg)';
        //  holders[0].style.opacity = '0';

        setTimeout(() => {
            holders[0].style.display = 'none';
            holders[1].style.display = 'block';
            holders[1].style.transform = 'rotateX(-90deg) rotateY(-90deg) rotateZ(-90deg)';

            setTimeout(() => {
                holders[1].style.transition = 'transform 1s, opacity 0.5s';
                holders[1].style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
                holders[1].style.opacity = '1';
            }, 50);
        }, 0);
    } else {
        flipButton.style.transform = 'rotate(0deg)';

        holders[1].style.transition = 'transform 1s, opacity 0.5s';
        holders[1].style.transform = 'rotateX(90deg) rotateY(90deg) rotateZ(90deg)';
        //  holders[1].style.opacity = '0';

        setTimeout(() => {
            holders[1].style.display = 'none';
            holders[0].style.display = 'block';
            holders[0].style.transform = 'rotateX(-90deg) rotateY(-90deg) rotateZ(-90deg)';

            setTimeout(() => {
                holders[0].style.transition = 'transform 1s, opacity 0.5s';
                holders[0].style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
                holders[0].style.opacity = '1';
            }, 50);
        }, 500);
    }
    isFlipped = !isFlipped;
});
// Function to toggle between Sign In and Sign Up forms
function toggleForms() {
    document.getElementsByClassName("login_box_content")[0].style.display = "none";
    const signInForm = document.getElementById('signInForm').parentElement;
    const signUpForm = document.getElementById('signUpFormContainer');
    if (signInForm.style.display === 'none') {
        signInForm.style.display = 'block';
        signUpForm.style.display = 'none';
    } else {
        signInForm.style.display = 'none';
        signUpForm.style.display = 'block';
    }
}
// Add event listeners to all elements with class 'toggleForm
document.querySelectorAll('.toggleForm').forEach(toggle => {
    toggle.addEventListener('click', toggleForms);
});
// Add event listeners to all elements with class 'backtologin'
document.querySelectorAll('.backtologin').forEach(toggle => {
    toggle.addEventListener('click', () => {
        const signInForm = document.getElementById('signInForm').parentElement;
        const signUpForm = document.getElementById('signUpFormContainer');
        document.getElementsByClassName("login_box_content")[0].style.display = "block";
        signUpForm.style.display = 'none';
        signInForm.style.display = 'none';



    });

});
// // Handling singUPButton
// document.getElementById("signUpButton").addEventListener("click", function () {
//     document.getElementsByClassName("login_box_content")[0].style.display = "none";
//     const signUpForm = document.getElementById('signUpFormContainer');
//     signUpForm.style.display = 'block';

// });

// Handling Sign with Google
document.getElementById("ContinueWithGoogle").addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // Structure user data in the specified format
            console.log(user);
            const userData = {
                name: user.displayName || '',
                email: user.email || '',
                phone: user.phoneNumber || '',
                createdAt: new Date()
            };
            const userId = user.uid; // Get the UID of the newly created user
            // Store user data in Firestore
            const userRef = doc(db, 'Users', userId);
            setDoc(userRef, userData, { merge: true }) // Use merge to avoid overwriting existing data
                .then(() => {
                    console.log('User data stored successfully in Firestore');
                })
                .catch((error) => {
                    console.error('Error storing user data in Firestore:', error);
                });
            // Redirect or handle signed-in user

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            alert(errorMessage);
        });
});
// Handle Sign In
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    // Get the password input from the shadow DOM inside #signInPassword
    const passwordInputElement = document.getElementById('signInPassword');
    let password = '';
    if (passwordInputElement && passwordInputElement.shadowRoot) {
        const passwordInput = passwordInputElement.shadowRoot.getElementById('password');
        if (passwordInput) {
            password = passwordInput.value;
        }
    }

    if (isEmailValid(email) && isPasswordValid(password)) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Redirect or handle signed-in user

            })
            .catch((error) => {
                alert(error.message);
            });
    } else {
        alert("Invalid email or password");
    }
});
var dpiHeight = 0;
var dpiWidth = 0;
// Handle Front Image Upload
document.getElementById("frontimage").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    // Check file size (1 MB = 1048576 bytes)
    if (file.size > 2048576) {
        document.getElementById("invalid_size").showModal();
        fileInput.value = ""; // Clear the file input
        return;
    }
    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
        document.getElementById("invalid_type").showModal();
        fileInput.value = ""; // Clear the file input
        return;
    }
    // Check for low DPI, if less than 72 then show a modal with the message

    document.getElementsByClassName("box_panel")[0].style.display = "flex";
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            // Get image dimensions in pixels
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Assuming standard print size of 3.5x2 inches (business card size)
            const printWidthInInches = 3.5;
            const printHeightInInches = 2;

            // Calculate DPI
            dpiWidth = width / printWidthInInches;
            dpiHeight = height / printHeightInInches;

            console.log(`DPI (Width): ${dpiWidth}`);
            console.log(`DPI (Height): ${dpiHeight}`);
            if (dpiWidth < 72 || dpiHeight < 72) {
                document.getElementById("invalid_dpi").showModal();
                fileInput.value = ""; // Clear the file input
                return;
            }
            // Update file name and DPI in the UI
            const fileNameElement = document.getElementById("fileName_frontside");
            fileNameElement.textContent = ` ${file.name}, DPI: ${Math.round(dpiWidth)}x${Math.round(dpiHeight)}`;
        };


        img.src = e.target.result;
        console.log(e.target.result);
        document.getElementById("previewFront").src = e.target.result;
        document.getElementsByClassName("uploadicon")[0].style.display = "none";
        document.getElementById("previewFront").style.display = "block";
    };
    reader.readAsDataURL(file);
});
// Handle Back Image Upload
document.getElementById("backimage").addEventListener("change", function (event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    // Check file size (1 MB = 1048576 bytes)
    if (file.size > 2048576) {
        document.getElementById("invalid_size").showModal();
        fileInput.value = ""; // Clear the file input
        return;
    }
    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
        document.getElementById("invalid_type").showModal();
        fileInput.value = ""; // Clear the file input
        return;
    }
    // Check for low DPI, if less than 72 then show a modal with the message

    document.getElementsByClassName("box_panel")[1].style.display = "flex";
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            // Get image dimensions in pixels
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // Assuming standard print size of 3.5x2 inches (business card size)
            const printWidthInInches = 3.5;
            const printHeightInInches = 2;

            // Calculate DPI
            dpiWidth = width / printWidthInInches;
            dpiHeight = height / printHeightInInches;

            console.log(`DPI (Width): ${dpiWidth}`);
            console.log(`DPI (Height): ${dpiHeight}`);
            if (dpiWidth < 72 || dpiHeight < 72) {
                document.getElementById("invalid_dpi").showModal();
                fileInput.value = ""; // Clear the file input
                return;
            }
            // Update file name and DPI in the UI
            const fileNameElement = document.getElementById("fileName_backside");
            fileNameElement.textContent = ` ${file.name}, DPI: ${Math.round(dpiWidth)}x${Math.round(dpiHeight)}`;
        };


        img.src = e.target.result;
        console.log(e.target.result);
        document.getElementById("previewBack").src = e.target.result;
        document.getElementsByClassName("uploadicon")[1].style.display = "none";
        document.getElementById("previewBack").style.display = "block";
    };
    reader.readAsDataURL(file);
});
// Handle Sign Up
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').shadowRoot.querySelector('.input-field').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('signUpPhone').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // User created successfully, now store additional user data in Firestore
            if (!user || !user.uid) {
                throw new Error('User UID is missing');
            }

            // Structure user data in the specified format
            const userData = {
                name: name,
                email: email,
                phone: phone,
                createdAt: new Date()
            };
            const userId = user.uid; // Get the UID of the newly created user
            // Store user data in Firestore
            const userRef = doc(db, 'Users', userId);
            setDoc(userRef, userData, { merge: true }) // Use merge to avoid overwriting existing data
                .then(() => {
                    console.log('User data stored successfully in Firestore');
                })
                .catch((error) => {
                    console.error('Error storing user data in Firestore:', error);
                });
        })


});
var uid = '';
// Monitor Auth State
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // User is signed in
        uid = user.uid;
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);


        if (docSnap.exists) {
            console.log("Document data:", docSnap.data());
            var data = docSnap.data();
            document.querySelectorAll('.userName').forEach(element => {
                element.textContent = data.name || 'N/A';
            });
            document.getElementById('userEmail').textContent = data.email || 'N/A';
            document.getElementById('userPhone').textContent = data.phone || 'N/A';
        } else {
        }



        document.querySelectorAll('#authForm').forEach(form => form.classList.remove('active'));
        document.getElementById("addressFormContainer").style.display = "grid";
        document.querySelectorAll('#addressFormContainer').forEach(form => form.classList.add('active'));
        hideAllBanners(); // Hide banners when user is signed in
    }
    else {
        document.getElementById("addressFormContainer").style.display = "none";

    }
});

// Handle Sign Out
const signOutButton = document.getElementById('signOutButton');
signOutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // Redirect or reset UI after sign out
            document.querySelectorAll('#authForm').forEach(form => form.classList.add('active'));
            document.querySelectorAll('#addressFormContainer').forEach(form => form.classList.remove('active'));
        })
        .catch((error) => {
            alert(error.message);
        });
});
// Add event listeners to all buttons with class 'backbutton'
document.querySelectorAll('.backbutton').forEach(button => {
    button.addEventListener('click', prevContainer);
});
// Handle Address Form Submission
let nextContainerId = null;
let prevContainerId = null;
// Handle button clicks to navigate between containers
function nextContainer() {
    const prevContainerIdValue = document.querySelector('.container.active').id;
    const nextContainerIdValue = 'container' + nextContainerId;

    document.querySelector('.container.active').classList.remove('active');
    document.getElementById(nextContainerIdValue).classList.add('active');
    updateProgressBar(nextContainerId);
}
// Handle button clicks to navigate between containers
function prevContainer() {
    if (prevContainerId == 4) {
        prevContainerId = 1;

    }
    if (prevContainerId == 5) {
        prevContainerId = 1;

    }


    const nextContainerIdValue = document.querySelector('.container.active').id;
    const prevContainerIdValue = 'container' + prevContainerId;

    document.querySelector('.container.active').classList.remove('active');
    document.getElementById(prevContainerIdValue).classList.add('active');
    updateProgressBar(prevContainerId);
    prevContainerId = prevContainerId - 1;


}
// Add event listeners to boxes
const boxes = document.querySelectorAll('.box');
// Add click event listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        // Remove 'activebox' class from all boxes
        boxes.forEach(b => b.classList.remove('activebox'));
        document.getElementById('step1_submit').disabled = false;
        document.getElementById('nextbuttonformobile').disabled = false;

        // Add 'activebox' class to the clicked box
        box.classList.add('activebox');
        // Set step1 based on the clicked box
        if (index === 5) {
            step1 = 'hire';
        } else if (index === 4) {
            step1 = 'customdesign';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.querySelector('.progress-bar');
    const authForm = document.getElementById('authForm');
    const container3 = document.getElementById('container3');
        const container4 = document.getElementById('container4');

    function updateProgressBarVisibility() {
        if (authForm.classList.contains('active') && container3.classList.contains('active')) {
            progressBar.style.display = 'none';
            document.body.style.backgroundColor = 'var(--Neutral-200, #E7EBEF)';
            document.getElementById('offers').style.display = 'none';

        } else {
            progressBar.style.display = 'flex';
            document.body.style.backgroundColor = 'white';
            document.getElementById('offers').style.display = 'flex';

        }
    }

    // Initial check
    updateProgressBarVisibility();
    // Observe class changes
    const observer = new MutationObserver(updateProgressBarVisibility);
    observer.observe(authForm, { attributes: true, attributeFilter: ['class'] });
    observer.observe(container3, { attributes: true, attributeFilter: ['class'] });

    function successfullyPayment() {
        if (container4.classList.contains('active')) {
            progressBar.style.display = 'none';
            document.body.style.backgroundColor = 'var(--Neutral-200, #E7EBEF)';
            document.getElementById('offers').style.display = 'none';

        } else {
            progressBar.style.display = 'flex';
            document.body.style.backgroundColor = 'white';
            document.getElementById('offers').style.display = 'flex';

        }
    }
    successfullyPayment();
      const observer1 = new MutationObserver(successfullyPayment);
    observer1.observe(container4, { attributes: true, attributeFilter: ['class'] });


});
// Price and Delivery Fee Variables
var cardPrice = 500;
const deliveryFee = 70;
const couponDiscount = 100;
let step1 = ''; // Initialize step1 variable

let step2 = ''; // Initialize step2 variable
// Handle form submission
const designForm = document.getElementById('designForm');
designForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const designOptions = document.querySelectorAll('input[name="design"]');

    designOptions.forEach((radio, index) => {
        if (radio.checked) {
            if (index >= 0 && index <= 3) {
                step1 = 'prebuild';
            }
        }
    });

    // Navigate to respective containers based on step1 value
    if (step1 === 'prebuild') {
        document.getElementById("shown_amount").textContent = "₹400";

        nextContainerId = 2;
        prevContainerId = 1;
    } else if (step1 === 'hire') {
        nextContainerId = 5;
        prevContainerId = 1;
    } else if (step1 === 'customdesign') {
        nextContainerId = 6;
        document.getElementById("shown_amount").textContent = "₹600";

        prevContainerId = 1;
    }

    console.log(step1, prevContainerId, nextContainerId);
    nextContainer();

    let additionalItem = { name: "", price: 0 };

    if (step1 === "hire") {
        additionalItem = { name: "Professional Design", price: 400 };
        document.getElementById("shown_amount").textContent = "₹800";
    } else if (step1 === "customdesign") {
        additionalItem = { name: "Custom Design Upload", price: 200 };

    }

    // Set card price
    document.getElementById("cardPrice").textContent = `₹${cardPrice}`;

    // Set additional item if applicable
    if (additionalItem.name) {
        document.getElementById("additionalItemName").textContent = additionalItem.name;
        document.getElementById("additionalItemPrice").textContent = `₹${additionalItem.price}`;
    }

    // Calculate total
    const subtotal = cardPrice + additionalItem.price + deliveryFee;
    const total = subtotal - couponDiscount;
    document.getElementById("totalPrice").textContent = `₹${total}`;
    document.getElementById("couponValue").textContent = `- ₹${couponDiscount}`;
});
// Declaring the values for the form that will be used for creating thecard
const form = document.getElementById('styledForm');
const nameInput = form.elements['name'];
const designationInput = form.elements['designation'];
const taglineInput = form.elements['tagline'];
const styleSelect = form.elements['style'];
// Function to validate the styled form and enable/disable the submit button
function validateStyledForm() {

    const submitButton = document.querySelector('#styledForm button[type="submit"]');
    const submitButtonForMobile = document.querySelector('#styleFormButtonForMobile');

    const isFormValid = nameInput.value.trim() !== "" &&
        designationInput.value.trim() !== "" &&
        taglineInput.value.trim() !== "" &&
        styleSelect.value.trim() !== "";

    submitButton.disabled = !isFormValid;
    submitButtonForMobile.disabled = !isFormValid;
    // Enable/disable the "Next" button based on form validity
}

// Add event listeners to form inputs for validation
document.getElementById('styledForm').addEventListener('input', validateStyledForm);
form.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
});
// Enable navigation when the form is valid
document.getElementById('styledForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Prevent form submission on Enter key

    if (!document.querySelector('#styledForm button[type="submit"]').disabled) {
        nextContainerId = 3; // Set the next container ID
        prevContainerId = 2; // Set the previous container ID
        nextContainer(); // Navigate to the next container
    }
});

// Initial validation on page load
validateStyledForm();


// Handle Hire Professional Form Submission
const hireProfessionalForm = document.getElementById('hireProfessional');
const hireSubmitButton = hireProfessionalForm.querySelector('button[type="submit"]');
const hireSubmitButttonForMobile = document.querySelector('.mobile-only button[type="submit"]');
// Function to validate the hire professional form
function validateHireForm() {
    const name = hireProfessionalForm.querySelector('input[name="name"]').value.trim();
    const phone = hireProfessionalForm.querySelector('input[name="phone"]').value.trim();
    const email = hireProfessionalForm.querySelector('input[name="email"]').value.trim();
    const mode = hireProfessionalForm.querySelector('input[name="mode"]:checked')?.value;
    const date = hireProfessionalForm.querySelector('input[type="date"]').value;
    const time = hireProfessionalForm.querySelector('input[type="time"]').value;

    const isFormValid = name && phone && email && mode && date && time &&
        validateEmail(email) && validatePhone(phone);

    hireSubmitButton.disabled = !isFormValid;
    hireSubmitButttonForMobile.disabled = !isFormValid;
}

// Add input event listeners to form fields for validation
hireProfessionalForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', validateHireForm);
});

// Initial validation on page load
validateHireForm();
// Handle hiring professional form submission
hireProfessionalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = hireProfessionalForm.querySelector('input[name="name"]').value.trim();
    const phone = hireProfessionalForm.querySelector('input[name="phone"]').value.trim();
    const email = hireProfessionalForm.querySelector('input[name="email"]').value.trim();
    const mode = hireProfessionalForm.querySelector('input[name="mode"]:checked')?.value;
    const date = hireProfessionalForm.querySelector('input[type="date"]').value;
    const time = hireProfessionalForm.querySelector('input[type="time"]').value;

    if (!name || !phone || !email || !mode || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Invalid email format.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Invalid phone number format.");
        return;
    }

    // Process the form data (e.g., send to server or navigate to the next container)
    console.log({ name, phone, email, mode, date, time });

    nextContainerId = 3; // Set the next container ID
    prevContainerId = 5; // Set the previous container ID
    nextContainer(); // Navigate to the next container
});
// Function to validate signup form and enable/disable submit button
function validateSignupForm() {
    const fullNameValid = fullNameInput.value.trim() !== "";
    const emailValid = validateEmail(signUpEmailInput.value.trim());
    const phoneValid = validatePhone(phoneNumberInput.value.trim());
    const passwordValid = validatePassword(signUpPasswordInput.value);

    signUpSubmitButton.disabled = !(fullNameValid && emailValid && phoneValid && passwordValid);
}

// Enable the "Next" button only if both images are uploaded or checkbox is checked
function validateUploadForm() {
    const frontImage = document.getElementById('frontimage').files.length > 0;
    const backImage = document.getElementById('backimage').files.length > 0;
    const checkbox = document.querySelector('input[type="checkbox"]').checked;
    const nextButton = document.querySelector('#nextButtonForContainer');
    const nextButtonforMobile = document.querySelector('#nextButtonForContainerForMobile');

    if ((frontImage && backImage) || (checkbox && frontImage)) {
        nextButton.disabled = false;
        nextButton.addEventListener('click', () => {
            nextContainerId = 3; // Set the next container ID
            prevContainerId = 6; // Set the previous container ID
            nextContainer(); // Navigate to the next container
        });
    } else {
        nextButton.disabled = true;
        nextButton.removeEventListener('click', nextContainer);
    }
    if ((frontImage && backImage) || (checkbox && frontImage)) {
        nextButtonforMobile.disabled = false;
        nextButtonforMobile.addEventListener('click', () => {
            nextContainerId = 3; // Set the next container ID
            prevContainerId = 6; // Set the previous container ID
            nextContainer(); // Navigate to the next container
        });
    } else {
        nextButtonforMobile.disabled = true;
        nextButtonforMobile.removeEventListener('click', nextContainer);
    }
}

// Add event listeners to file inputs and checkbox for validation
document.getElementById('frontimage').addEventListener('change', validateUploadForm);
document.getElementById('backimage').addEventListener('change', validateUploadForm);
document.querySelector('input[type="checkbox"]').addEventListener('change', validateUploadForm);

// Initial validation on page load
validateUploadForm();


// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number format
function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

// Function to validate password (you can customize the validation logic)
function validatePassword(password) {
    return password.length >= 6;
}



// Function to check if the email is valid
function isEmailValid(email) {
    // Add your email validation logic here
    return /\S+@\S+\.\S+/.test(email);
}

// Function to check if the password is valid
function isPasswordValid(password) {
    // Add your password validation logic here
    return password.length >= 6;
}

// Handling the pincode input 
document.getElementById("pincode").addEventListener("blur", async function () {
    const pincode = this.value.trim();
    if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            document.getElementById("city").value = postOffice.District;
            document.getElementById("state").value = postOffice.State.toUpperCase();
        } else {
            alert("Invalid Pincode");
        }
    }
});
//handling the pay button
const payButton = document.getElementById('payButton');

// Function to validate address form
function validateAddressForm() {
    const addressForm = document.querySelector('.address-form');
    if (!addressForm) return false;
    return (
        addressForm.fullname.value.trim() !== "" &&
        addressForm.mobile.value.trim().match(/^\d{10}$/) &&
        addressForm.state.value.trim() !== "" &&
        addressForm.addressLine1.value.trim() !== "" &&
        addressForm.city.value.trim() !== "" &&
        addressForm.pincode.value.trim().match(/^\d{6}$/)
    );
}

// Enable/disable pay button based on address form validity
function updatePayButtonState() {
    payButton.disabled = !validateAddressForm();
}

// Listen for input changes on address form fields
document.querySelectorAll('.address-form input, .address-form select').forEach(el => {
    el.addEventListener('input', updatePayButtonState);
});

// Initial state
updatePayButtonState();

payButton.addEventListener('click', async () => {

    if (payButton.disabled) return; // Prevent click if disabled

    var userId = uid;
    // saving the address to users collection 
    const useraddress = collection(db, `Users/${userId}/address`);
    const addressForm = document.querySelector('.address-form');
    const addressData = {
        type: "home",
        fullname: addressForm.fullname.value.trim(),
        mobile: addressForm.mobile.value.trim(),
        state: addressForm.state.value,
        addressLine1: addressForm.addressLine1.value.trim(),
        addressLine2: addressForm.addressLine2.value.trim(),
        city: addressForm.city.value.trim(),
        pincode: addressForm.pincode.value.trim()
    };
    // Save address data to Firestore
    await setDoc(doc(useraddress, "home"), addressData);

    const akshrcardId = userId + Date.now();
    var akshrCardData = {};

    if (step1 === 'prebuild') {
        cardPrice = 500;
        akshrCardData = {
            akshrcardId: akshrcardId,
            cardName: nameInput.value,
            additionalColor: additionalColor,
            designation: designationInput.value,
            theme: styleSelect.value,
            tagline: taglineInput.value,
            createdAt: new Date()
        };
    }
    if (step1 === 'hire') {
        cardPrice = 800;
        const name = hireProfessionalForm.querySelector('input[name="name"]').value.trim();
        const phone = hireProfessionalForm.querySelector('input[name="phone"]').value.trim();
        const email = hireProfessionalForm.querySelector('input[name="email"]').value.trim();
        const mode = hireProfessionalForm.querySelector('input[name="mode"]:checked')?.value;
        const date = hireProfessionalForm.querySelector('input[type="date"]').value;
        const time = hireProfessionalForm.querySelector('input[type="time"]').value;
        akshrCardData = {
            name: name,
            phone: phone,
            email: email,
            mode: mode,
            date: date,
            time: time,
            type: 'Hired Professional',
            akshrcardId: akshrcardId,
            createdAt: new Date()
        };
    }
    if (step1 === 'customdesign') {
        cardPrice = 600;
        var frontImageFile = document.getElementById('frontimage').files[0];
        var backImageFile = document.getElementById('backimage').files[0];
        var frontImageURL = '';
        var backImageURL = '';
        var isFrontandBackSame = document.getElementById('frontSameAsBack');
        if (isFrontandBackSame.checked) {
            backImageFile = frontImageFile;
        }
        if (frontImageFile && backImageFile) {
            const frontImageRef = ref(storage, `Users/${userId}/akshrCards/${akshrcardId}/front_${Date.now()}_${frontImageFile.name}`);
            await uploadBytes(frontImageRef, frontImageFile)
                .then(async (snapshot) => {
                    await getDownloadURL(snapshot.ref).then(async (frontImageUrl) => {
                        if (!isFrontandBackSame.checked) {
                            const backImageRef = ref(storage, `Users/${userId}/akshrCards/${akshrcardId}/back_${Date.now()}_${backImageFile.name}`);
                            await uploadBytes(backImageRef, backImageFile)
                                .then(async (snapshot) => {
                                    await getDownloadURL(snapshot.ref).then(async (backImageUrl) => {
                                        akshrCardData = {
                                            frontImage: frontImageUrl,
                                            backImage: backImageUrl,
                                            isFrontandBackSame: isFrontandBackSame.checked,
                                            type: 'customdesign',
                                            akshrcardId: akshrcardId,
                                            createdAt: new Date()
                                        };
                                    });
                                }).catch(error => {
                                    console.error('Error uploading back image:', error);
                                });
                        }
                        else {
                            akshrCardData = {
                                frontImage: frontImageUrl,
                                backImage: frontImageUrl,
                                isFrontandBackSame: isFrontandBackSame.checked,
                                type: 'customdesign',
                                akshrcardId: akshrcardId,
                                createdAt: new Date()
                            };
                        }
                    });
                }).catch(error => {
                    console.error('Error uploading front image:', error);
                });
        } else {
            console.error('Both front and back images are required.');
        }
    }
    if (step1 === 'customdesign') {
        while (
            (!akshrCardData.frontImage || !akshrCardData.backImage) &&
            document.getElementById('frontimage').files.length > 0
        ) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    try {
        const response = await fetch('https://asia-south1-main-control-panel.cloudfunctions.net/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                step: step1,
                user_id: userId,
                user_data: akshrCardData,
                location: addressForm.state.value,
                order_summary: {
                    basePrice: cardPrice,
                    deliveryFee: 70,
                    discount: couponDiscount,
                },
                addressData: addressData
            })
        });

        const data = await response.json();
        if (!data.order_id || !data.amount) {
            alert("Something went wrong. Please try again.");
            return;
        }

        const options = {
            key: data.key,
            amount: data.amount,
            currency: data.currency,
            name: data.name || "Akshr Company",
            description: data.description || "Selected Package",
            order_id: data.order_id,
            handler: function (response) {
                alert("Payment successful!");
                document.getElementById('container3').classList.remove('active');
                document.getElementsByClassName('progress-bar')[0].style.display = 'none';
                document.getElementById('container4').classList.add('active');
            },
            prefill: {
                name: document.getElementById("fullname").value,
                email: document.getElementById("userEmail").value,
                contact: document.getElementById("userPhone").value
            },
            theme: {
                color: '#3399cc'
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

    } catch (err) {
        console.error("Payment init failed:", err);
        alert("Error initiating payment. Please try again later.");
    }
});

