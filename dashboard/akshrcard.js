import { auth, onAuthStateChanged, reff, onValue, dbd, doc, getDoc, db, collection, getDocs, signOut } from "../javascript/config.js";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the input fields
var nameInput = document.getElementById("name");
var designationInput = document.getElementById("designation");
var bioInput = document.getElementById("bio");
var uid;
const sidebar = document.getElementById("sidebar");

document.getElementById("openbtn").addEventListener("click", () => {
  const openbtn = document.getElementById("openbtn");

  const isOpen = sidebar.classList.contains("open");

  if (isOpen) {
    sidebar.classList.remove("open");
    sidebar.style.width = "0";
    openbtn.style.color = "var(--Icon-Black)";

  } else {
    sidebar.classList.add("open");
    sidebar.style.width = "100%"; openbtn.style.color = "white";


  }
});


onAuthStateChanged(auth, async (user) => {
  if (user) {

    uid = user.uid;

    const docRef = doc(db, "Users", uid);
    const docSnap = await getDoc(docRef);
    const cardref = collection(db, "Users", uid, "akshrcard");
    const cardSnap = await getDocs(cardref);

    if (cardSnap.empty) {
      //  document.getElementById("getcard").style.display = "block";
    } else {

      cardSnap.forEach((doc) => {

        if (doc.data().type == "customdesign") {
          // If the card is not a custom design, create a card with the default theme
          createCustomCard(
            doc.data().frontImage,
            doc.id
          );
        }
        else {
          createCard(
            doc.data().theme,
            doc.data().cardName,
            doc.data().designation,
            doc.data().tagline,
            doc.id,
            doc.data().additionalColor);
        }
      });
    }
    // doc.data() will be undefined in this case
    if (docSnap.exists) {
      var data = docSnap.data();
      document.getElementById("fname").innerText = data.name;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // ...
  } else {
    // User is signed out
    // ...
    window.location.href = "../login.html";
  }
});


const themes = {
  Vertex: {
    backgroundColor: '#000',
    textColor: '#fff',
    conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FVertex.png?alt=media&token=ff993d30-b3c1-47f3-b4f1-c2538e496a5b)',
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2FVertex-Back.png?alt=media&token=47cbaa57-9781-4bb3-9248-60377b9be670)',
    fontFamily: "'Montserrat', sans-serif",
    fontweight: 600,
    text_transform: null,
  },
  Phantom: {
    backgroundColor: '#000', textColor: '#fff',
    conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FPhantom.png?alt=media&token=6d03270a-f623-484c-a2c4-54a7a00efcf4)',
    fontFamily: "'Syne', sans-serif",
    fontweight: 500,
    text_transform: null,
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fphantom-back.png?alt=media&token=69bbc015-eb27-498b-aa27-d0ad6e53936e)',
  },
  Matrix: {
    backgroundColor: '#000', textColor: '#fff',
    conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FMatrix.png?alt=media&token=c7bfe583-4b5f-4f3e-85d3-6cd08914acd4)',
    fontFamily: "'VCR_OSD_MONO', sans-serif",
    fontweight: 400,
    text_transform: "uppercase",
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fmatrix-back.png?alt=media)',
  },
  Pulse: {
    backgroundColor: '#fff', textColor: '#000',
    conatinerImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fgetakshrcard%2Fbackground%2FPulse.png?alt=media&token=94648dfb-474b-4e63-b57e-c0a048678090)',
    fontFamily: "'DM Sans', sans-serif",
    fontweight: 700,
    text_transform: 'null',
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fpulse-back.png?alt=media&token=14329b5b-296c-48af-8fdc-30da7efb1701)',
  },
  // Add more themes as needed
};
function createCard(theme, name, designation, tagline, id, additionalColor) {
  var aditionalColor = additionalColor;


  // Only apply additionalColor logic for the current card if theme is Vertex
  if (theme === "Vertex") {
    setTimeout(() => {
      // Find the last card element created (the one just appended)
      const card = cardDiv.querySelector('.card');
      if (additionalColor === "peace") {
        card.style.backgroundColor = 'rgb(0,0,0)';
        card.style.color = 'white';
        card.style.filter = 'invert(1)';
        console.log("Peace theme applied");
      }
      else if (additionalColor === "akshr") {
        card.style.backgroundColor = 'rgb(24, 99, 170)';
        card.style.color = 'white';
        card.style.filter = 'none';
      }
      else if (additionalColor === "classic") {
        card.style.backgroundColor = 'rgb(0,0,0)';
        card.style.color = 'rgb(255, 255, 255)';
        card.style.filter = 'none';
      }
      else if (additionalColor === "default" || additionalColor === undefined || additionalColor === null) {
        // Default theme, no additional styles needed
        card.style.backgroundColor = 'rgb(0,0,0)';
        card.style.color = 'rgb(255, 255, 255)';
        card.style.filter = 'none';
      }

    }, 0);
  }

  const selectedTheme = themes[theme];

  const cardContainer = document.getElementById('card-container');

  const cardHTML = `

      <div class="holder">
          <div class="card" style="font-family:${selectedTheme.fontFamily};font-weight:${selectedTheme.fontweight};text-transform:${selectedTheme.text_transform}; background-image: ${selectedTheme.backgroundImage}; color: ${selectedTheme.textColor};background-size: cover;">
              <div class="left-strip">
              </div>
              <div class="main-content">
                  <h1>${name}</h1>
                  <p class="title">${designation}</p>
                  <p class="tagline">${tagline}</p>
              </div>
          </div>
      </div>
      <div class="buttons">
          <button onclick="preview('${id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M13.3333 7.33333C13.1565 7.33333 12.987 7.40357 12.8619 7.5286C12.7369 7.65362 12.6667 7.82319 12.6667 8V12C12.6667 12.1768 12.5964 12.3464 12.4714 12.4714C12.3464 12.5964 12.1768 12.6667 12 12.6667H4C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H8C8.17681 3.33333 8.34638 3.2631 8.4714 3.13807C8.59643 3.01305 8.66667 2.84348 8.66667 2.66667C8.66667 2.48986 8.59643 2.32029 8.4714 2.19526C8.34638 2.07024 8.17681 2 8 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V8C14 7.82319 13.9298 7.65362 13.8047 7.5286C13.6797 7.40357 13.5101 7.33333 13.3333 7.33333Z" fill="black"/>
<path d="M10.6673 3.33333H11.7206L7.52728 7.52C7.46479 7.58198 7.4152 7.65571 7.38135 7.73695C7.3475 7.81819 7.33008 7.90533 7.33008 7.99333C7.33008 8.08134 7.3475 8.16848 7.38135 8.24972C7.4152 8.33096 7.46479 8.40469 7.52728 8.46667C7.58925 8.52915 7.66299 8.57875 7.74423 8.61259C7.82547 8.64644 7.9126 8.66387 8.00061 8.66387C8.08862 8.66387 8.17576 8.64644 8.25699 8.61259C8.33823 8.57875 8.41197 8.52915 8.47394 8.46667L12.6673 4.28V5.33333C12.6673 5.51014 12.7375 5.67971 12.8625 5.80474C12.9876 5.92976 13.1571 6 13.3339 6C13.5108 6 13.6803 5.92976 13.8053 5.80474C13.9304 5.67971 14.0006 5.51014 14.0006 5.33333V2.66667C14.0006 2.48986 13.9304 2.32029 13.8053 2.19526C13.6803 2.07024 13.5108 2 13.3339 2H10.6673C10.4905 2 10.3209 2.07024 10.1959 2.19526C10.0708 2.32029 10.0006 2.48986 10.0006 2.66667C10.0006 2.84348 10.0708 3.01305 10.1959 3.13807C10.3209 3.2631 10.4905 3.33333 10.6673 3.33333Z" fill="black"/>
</svg>
           Preview
          </button>
          <button onclick="edit('${id}')">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M10.0404 1.9646C10.2757 1.71464 10.5949 1.57422 10.9276 1.57422C11.2604 1.57422 11.5794 1.71464 11.8148 1.9646L13.3678 3.6146C13.4844 3.73842 13.5768 3.88543 13.64 4.04723C13.703 4.20903 13.7355 4.38246 13.7355 4.5576C13.7355 4.73274 13.703 4.90617 13.64 5.06797C13.5768 5.22977 13.4844 5.37678 13.3678 5.5006L5.90549 13.4293L1.90234 14.1466L2.57811 9.89327L10.0404 1.9646ZM9.89672 4.0026L11.4497 5.6526L12.4805 4.55727L10.9276 2.90793L9.89672 4.0026ZM10.5618 6.59593L9.00949 4.94593L3.74893 10.5353L3.43333 12.5199L5.30125 12.1853L10.5618 6.59593Z" fill="black"/>
</svg>
 Edit
          </button>
      </div>
   
  `;

  const cardDiv = document.createElement('div');
  cardDiv.innerHTML = cardHTML;
  cardDiv.classList = "container";
  cardContainer.appendChild(cardDiv);
}

function createCustomCard(frontImage, id) {
  console.log(frontImage, id);
  const cardContainer = document.getElementById('card-container');
  const cardHTML = `
    <div class="holder">
      <div class="card" style="background-image: url('${frontImage}'); background-size: contain; background-position: center;background-repeat: no-repeat;">
      </div>
    </div>
    <div class="buttons">
      <button onclick="preview('${id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M13.3333 7.33333C13.1565 7.33333 12.987 7.40357 12.8619 7.5286C12.7369 7.65362 12.6667 7.82319 12.6667 8V12C12.6667 12.1768 12.5964 12.3464 12.4714 12.4714C12.3464 12.5964 12.1768 12.6667 12 12.6667H4C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12V4C3.33333 3.82319 3.40357 3.65362 3.5286 3.5286C3.65362 3.40357 3.82319 3.33333 4 3.33333H8C8.17681 3.33333 8.34638 3.2631 8.4714 3.13807C8.59643 3.01305 8.66667 2.84348 8.66667 2.66667C8.66667 2.48986 8.59643 2.32029 8.4714 2.19526C8.34638 2.07024 8.17681 2 8 2H4C3.46957 2 2.96086 2.21071 2.58579 2.58579C2.21071 2.96086 2 3.46957 2 4V12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14H12C12.5304 14 13.0391 13.7891 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12V8C14 7.82319 13.9298 7.65362 13.8047 7.5286C13.6797 7.40357 13.5101 7.33333 13.3333 7.33333Z" fill="black"/>
          <path d="M10.6673 3.33333H11.7206L7.52728 7.52C7.46479 7.58198 7.4152 7.65571 7.38135 7.73695C7.3475 7.81819 7.33008 7.90533 7.33008 7.99333C7.33008 8.08134 7.3475 8.16848 7.38135 8.24972C7.4152 8.33096 7.46479 8.40469 7.52728 8.46667C7.58925 8.52915 7.66299 8.57875 7.74423 8.61259C7.82547 8.64644 7.9126 8.66387 8.00061 8.66387C8.08862 8.66387 8.17576 8.64644 8.25699 8.61259C8.33823 8.57875 8.41197 8.52915 8.47394 8.46667L12.6673 4.28V5.33333C12.6673 5.51014 12.7375 5.67971 12.8625 5.80474C12.9876 5.92976 13.1571 6 13.3339 6C13.5108 6 13.6803 5.92976 13.8053 5.80474C13.9304 5.67971 14.0006 5.51014 14.0006 5.33333V2.66667C14.0006 2.48986 13.9304 2.32029 13.8053 2.19526C13.6803 2.07024 13.5108 2 13.3339 2H10.6673C10.4905 2 10.3209 2.07024 10.1959 2.19526C10.0708 2.32029 10.0006 2.48986 10.0006 2.66667C10.0006 2.84348 10.0708 3.01305 10.1959 3.13807C10.3209 3.2631 10.4905 3.33333 10.6673 3.33333Z" fill="black"/>
        </svg>
        Preview
      </button>
      <button onclick="edit('${id}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10.0404 1.9646C10.2757 1.71464 10.5949 1.57422 10.9276 1.57422C11.2604 1.57422 11.5794 1.71464 11.8148 1.9646L13.3678 3.6146C13.4844 3.73842 13.5768 3.88543 13.64 4.04723C13.703 4.20903 13.7355 4.38246 13.7355 4.5576C13.7355 4.73274 13.703 4.90617 13.64 5.06797C13.5768 5.22977 13.4844 5.37678 13.3678 5.5006L5.90549 13.4293L1.90234 14.1466L2.57811 9.89327L10.0404 1.9646ZM9.89672 4.0026L11.4497 5.6526L12.4805 4.55727L10.9276 2.90793L9.89672 4.0026ZM10.5618 6.59593L9.00949 4.94593L3.74893 10.5353L3.43333 12.5199L5.30125 12.1853L10.5618 6.59593Z" fill="black"/>
        </svg>
        Edit
      </button>
    </div>
  `;
  const cardDiv = document.createElement('div');
  cardDiv.innerHTML = cardHTML;
  cardDiv.classList = "container";
  cardContainer.appendChild(cardDiv);
}

window.preview = function (id) {
  // Your function code here
  location.href = "https://card.akshr.in?cardid=" + id;
};
window.edit = function (id) {
  // Implement the edit functionality here
  location.href = "./card.html" + "?cid=" + id;
}
// function to hide all the sections 
function hideAllSections() {
  const sections = document.querySelectorAll(".main-content-home, .transactions, .profile");
  sections.forEach(section => {
    section.style.display = "none";
  });
  document.querySelectorAll("a.selected").forEach(a => a.classList.remove("selected"));
}

//Handle Home Section
document.getElementById("home_button").addEventListener("click", async () => {
  hideAllSections();
  const isOpen = sidebar.classList.contains("open");
  if (isOpen) {
    sidebar.classList.remove("open");
    sidebar.style.width = "0";
    openbtn.style.color = "var(--Icon-Black)";
  }
  document.getElementById("home_button").classList.add("selected");
  document.getElementsByClassName("main-content-home")[0].style.display = "block";

});

// Handle Transactions
document.getElementById("transaction_button").addEventListener("click", async () => {
  hideAllSections();
  const isOpen = sidebar.classList.contains("open");
  if (isOpen) {
    sidebar.classList.remove("open");
    sidebar.style.width = "0";
    openbtn.style.color = "var(--Icon-Black)";
  }

  document.getElementById("transaction_button").classList.add("selected");
  document.getElementsByClassName("transactions")[0].style.display = "block";

  const docRef = doc(db, "Users", uid);
  const transactionRef = collection(db, "Users", uid, "Transactions");
  console.log("Fetching transactions for user:", uid);
  const transactionSnap = await getDocs(transactionRef);

  if (transactionSnap.empty) {
    //  document.getElementById("getcard").style.display = "block";
  } else {
    var transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ""; // Clear previous transactions
    transactionSnap.forEach(async (doc) => {

      const transaction = doc.data();

      if (transaction.akshrcardData.type == "customdesign") {
        // Create the outer container
        const outerDiv = document.createElement("div");

        outerDiv.classList.add("transaction_item");

        // Card visual section
        const cardSection = document.createElement("div");
        cardSection.classList.add("card_section");
        cardSection.innerHTML = `
        <div class="holder">
          <div class="card"
        style="background-image: url(${transaction.akshrcardData.frontImage});background-size: contain;
    background-repeat: no-repeat;
    background-position: center;">
        <div class="left-strip"></div>
       
          </div>
        </div>
      `;

        // Info grid section
        const infoSection = document.createElement("div");
        infoSection.style.margin = "auto 1vw";
        infoSection.innerHTML = `
        <div class='transaction_details'>
          <div>
        <strong>${transaction.akshrcardData.cardName || ''}</strong> <br> Name on Card
          </div>
          <div>
        <strong>${transaction.akshrcardData.type}</strong><br> Card Type
          </div>
          <div>
        <strong>${transaction.paid_at.toDate().toISOString().slice(0, 10)}</strong> <br> Date of Ordering
          </div>
          <div>
        <strong>₹${transaction.amount / 100}</strong> <br> Amount
          </div>
        </div>
      `;

        outerDiv.appendChild(cardSection);
        outerDiv.appendChild(infoSection);

        var detailButton = document.createElement("span");
        detailButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.9287 4.92849C13.3191 4.53806 13.9522 4.53826 14.3428 4.92849L20.707 11.2927C21.0976 11.6833 21.0976 12.3163 20.707 12.7068L14.3428 19.0711C13.9522 19.4613 13.3191 19.4615 12.9287 19.0711C12.5383 18.6806 12.5385 18.0476 12.9287 17.657L17.5859 12.9998H4C3.44772 12.9998 3 12.5521 3 11.9998C3 11.4475 3.44772 10.9998 4 10.9998H17.5859L12.9287 6.34255C12.5385 5.952 12.5383 5.31891 12.9287 4.92849Z" fill="#121A21"/>
</svg>`;
        detailButton.classList.add("view_details");
        detailButton.addEventListener("click", () => {
          // Handle the click event to show transaction details
          window.location.href = "./orderHistory.html?tid=" + doc.id;
        });
        outerDiv.appendChild(detailButton);
        transactionList.appendChild(outerDiv);
      }
      else {

        // Create the outer container
        const outerDiv = document.createElement("div");

        outerDiv.classList.add("transaction_item");

        // Card visual section
        const cardSection = document.createElement("div");
        cardSection.classList.add("card_section");
        cardSection.innerHTML = `
        <div class="holder">
          <div class="card"
        style="background-image: ${themes[transaction.akshrcardData.theme]?.backgroundImage || ''};font-family:${themes[transaction.akshrcardData.theme].fontFamily}; color: ${themes[transaction.akshrcardData.theme]?.textColor || '#000'}; background-size: cover;">
        <div class="left-strip"></div>
        <div class="main-content">
          <h1>${transaction.akshrcardData.cardName || ''}</h1>
          <p class="title">${transaction.akshrcardData.designation || ''}</p>
          <p class="tagline">${transaction.akshrcardData.tagline || ''}</p>
        </div>
          </div>
        </div>
      `;

        // Info grid section
        const infoSection = document.createElement("div");
        infoSection.style.margin = "auto 1vw";
        infoSection.innerHTML = `
        <div class='transaction_details'>
          <div>
        <strong>${transaction.akshrcardData.cardName || ''}</strong> <br> Name on Card
          </div>
          <div>
        <strong>${transaction.akshrcardData.theme}</strong><br> Card Type
          </div>
          <div>
        <strong>${transaction.paid_at.toDate().toISOString().slice(0, 10)}</strong> <br> Date of Ordering
          </div>
          <div>
        <strong>₹${transaction.amount / 100}</strong> <br> Amount
          </div>
        </div>
      `;

        outerDiv.appendChild(cardSection);
        outerDiv.appendChild(infoSection);
        var additionalColor = transaction.akshrcardData.additionalColor;
        if (transaction.akshrcardData.theme === "Vertex") {
          setTimeout(() => {
            // Find the last card element created (the one just appended)
            const cardDiv = outerDiv.querySelector('.holder');
            const card = cardDiv.querySelector('.card');
            if (additionalColor === "peace") {
              card.style.backgroundColor = 'rgb(0,0,0)';
              card.style.color = 'white';
              card.style.filter = 'invert(1)';
              console.log("Peace theme applied");
            }
            else if (additionalColor === "akshr") {
              card.style.backgroundColor = 'rgb(24, 99, 170)';
              card.style.color = 'white';
              card.style.filter = 'none';
            }
            else if (additionalColor === "classic") {
              card.style.backgroundColor = 'rgb(0,0,0)';
              card.style.color = 'rgb(255, 255, 255)';
              card.style.filter = 'none';
            }
            else if (additionalColor === "default" || additionalColor === undefined || additionalColor === null) {
              // Default theme, no additional styles needed
              card.style.backgroundColor = 'rgb(0,0,0)';
              card.style.color = 'rgb(255, 255, 255)';
              card.style.filter = 'none';
            }

          }, 0);
        }
        var detailButton = document.createElement("span");
        detailButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.9287 4.92849C13.3191 4.53806 13.9522 4.53826 14.3428 4.92849L20.707 11.2927C21.0976 11.6833 21.0976 12.3163 20.707 12.7068L14.3428 19.0711C13.9522 19.4613 13.3191 19.4615 12.9287 19.0711C12.5383 18.6806 12.5385 18.0476 12.9287 17.657L17.5859 12.9998H4C3.44772 12.9998 3 12.5521 3 11.9998C3 11.4475 3.44772 10.9998 4 10.9998H17.5859L12.9287 6.34255C12.5385 5.952 12.5383 5.31891 12.9287 4.92849Z" fill="#121A21"/>
</svg>`;
        detailButton.classList.add("view_details");
        detailButton.addEventListener("click", () => {
          // Handle the click event to show transaction details
          window.location.href = "./orderHistory.html?tid=" + doc.id;
        });
        outerDiv.appendChild(detailButton);
        transactionList.appendChild(outerDiv);
      }


    });
  }
});

//Handling profile Section
document.getElementById("profile_button").addEventListener("click", async () => {
  hideAllSections(); document.getElementsByClassName("profile")[0].style.display = "block";
  document.getElementById("profile_button").classList.add("selected");

  const docRef = doc(db, "Users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    nameInput.value = data.name || "";
    designationInput.value = data.designation || "";
    bioInput.value = data.bio || "";
  } else {
    console.log("No such document!");
  }
});

// Handle Sign Out
document.getElementById("signout").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "../login.html";
  }).catch((error) => {
    // An error happened.
    console.error("Sign out error:", error);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  handleSidebarClose();
});

window.addEventListener('resize', () => {
  handleSidebarClose();
});

function handleSidebarClose() {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.getElementById('closebtn');

  if (sidebar && closeBtn) {
    const sidebarWidth = window.getComputedStyle(sidebar).width;

    if (sidebarWidth === '100%') {
      closeBtn.click();
    }
  }
}
