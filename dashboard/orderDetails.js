import { auth, onAuthStateChanged, reff, onValue, dbd, doc, getDoc, serverTimestamp, addDoc, db, collection, getDocs, signOut } from "../javascript/config.js";
// Get 'tid' from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const tid = urlParams.get('tid');

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


    const docRef = doc(db, "Transactions", tid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      document.getElementById("transaction_id").textContent = docSnap.id || 'N/A';
      if (docSnap.data().type == "akshrcard") {
        const doc = docSnap.data().akshrcardData;

        //  document.getElementById("getcard").style.display = "block";
        trackingStatus(data.actions);

        if (docSnap.data().akshrcardData.type == "customdesign") {
          createcustomCard(doc.frontImage, data.amount, data.paid_at, 
            
            );
        }
        else {
          createCard(
            doc.theme,
            doc.cardName,
            doc.designation,
            doc.tagline,
            doc.additionalColor, data.paid_at,
            data.amount);
        }


      }
      document.getElementById("awb-id").textContent = data.awbNumber || "Not generated";
      ShippingAddress(data.addressData);
      payment_method(data.payment_mode);
      orderSummary(data.order_summary);
      trackingStatus();

    } else {

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
    fontFamily: "'Montserrat', sans-serif",
    fontweight: 600,
    text_transform: null,
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2FVertex-Back.png?alt=media)'
  },
  Phantom: {
    backgroundColor: '#000',
    textColor: '#fff',
   fontFamily: "'Syne', sans-serif",
    fontweight: 500,
    text_transform: null,
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fphantom-back.png?alt=media)'
  },
  Matrix: {
    backgroundColor: '#000',
    textColor: '#fff',
    fontFamily: "'VCR_OSD_MONO', sans-serif",
    fontweight: 400,
    text_transform: "uppercase",
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fmatrix-back.png?alt=media)'
  },
  Pulse: {
    backgroundColor: '#fff',
    textColor: '#000',
    fontFamily: "'DM Sans', sans-serif",
    fontweight: 700,
    text_transform: 'null',
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fakshrcards%2Fpulse-back.png?alt=media)'
  },
  // Add more themes as needed
};

function createcustomCard(frontImage, amount, paid_at) {
  // Create the outer container
  const transactionList = document.getElementById("card-container");
  const dialog_box = document.getElementById("container_dialog_box");
  const outerDiv = document.createElement("div");
  outerDiv.classList.add("transaction_item");
  // Card visual section
  const cardSection = document.createElement("div");
  cardSection.classList.add("card_section");
  cardSection.innerHTML = `
        <div class="holder">
          <div class="card"
        style="background-image: url(${frontImage}); background-size: contain; background-repeat: no-repeat; background-position: center;">
        <div class="left-strip"></div>
        </div>
        </div>
      `;
  // Info grid section
  const infoSection = document.createElement("div");
  infoSection.style.margin = "auto";
  infoSection.innerHTML = `
        <div class='transaction_details'>
          <div>
        <strong>Custom Design</strong> <br> Name on Card:
          </div>
          <div>
        <strong>Custom Design</strong><br> Card Type:
          </div>
          <div>
        <strong>${paid_at.toDate().toISOString().slice(0, 10)}</strong> <br> Date of Ordering:
          </div>
          <div>
        <strong>₹${amount / 100}</strong> <br> Amount:
          </div>
        </div>
      `;
  outerDiv.appendChild(cardSection);
  outerDiv.appendChild(infoSection);
  const cloneDiv = outerDiv.cloneNode(true); // true means it copies all child nodes
  transactionList.appendChild(outerDiv);
  dialog_box.appendChild(cloneDiv);
 
}

function createCard(theme, cardName, designation, tagline, additionalColor, paid_at, amount) {
  // Create the outer container
  const transactionList = document.getElementById("card-container");
  const dialog_box = document.getElementById("container_dialog_box");
  const outerDiv = document.createElement("div");

  outerDiv.classList.add("transaction_item");

  // Card visual section
  const cardSection = document.createElement("div");
  cardSection.classList.add("card_section");
  cardSection.innerHTML = `
        <div class="holder">
          <div class="card"
        style="background-image: ${themes[theme]?.backgroundImage || ''};font-family:${themes[theme]?.fontFamily}; color: ${themes[theme]?.textColor || '#000'}; background-size: cover;">
        <div class="left-strip"></div>
        <div class="main-content">
          <h1>${cardName || ''}</h1>
          <p class="title">${designation || ''}</p>
          <p class="tagline">${tagline || ''}</p>
        </div>
          </div>
        </div>
      `;

  // Info grid section
  const infoSection = document.createElement("div");
  infoSection.style.margin = "auto";
  infoSection.innerHTML = `
        <div class='transaction_details'>
          <div>
        <strong>${cardName || ''}</strong> <br> Name on Card:
          </div>
          <div>
        <strong>${theme}</strong><br> Card Type:
          </div>
          <div>
        <strong>${paid_at.toDate().toISOString().slice(0, 10)}</strong> <br> Date of Ordering:
          </div>
          <div>
        <strong>₹${amount / 100}</strong> <br> Amount:
          </div>
        </div>
      `;

  outerDiv.appendChild(cardSection);
  outerDiv.appendChild(infoSection);
  var additionalColor = additionalColor;
  if (theme === "Vertex") {
    setTimeout(() => {
      // Helper function to apply Vertex color logic
      function applyVertexColor(card) {
        if (!card) return;
        if (additionalColor === "peace") {
          card.style.backgroundColor = 'rgb(0,0,0)';
          card.style.color = 'white';
          card.style.filter = 'invert(1)';
          card.querySelectorAll('h1, p').forEach(el => {
            el.style.color = 'inherit';
            el.style.filter = 'none';
          });
          console.log("Peace theme applied");
        }
        else if (additionalColor === "akshr") {
          card.style.backgroundColor = 'rgb(24, 99, 170)';
          card.style.color = 'white';
          card.style.filter = 'none';
          card.querySelectorAll('h1, p').forEach(el => {
            el.style.color = 'inherit';
            el.style.filter = 'none';
          });
        }
        else if (additionalColor === "classic") {
          card.style.backgroundColor = 'rgb(0,0,0)';
          card.style.color = 'rgb(255, 255, 255)';
          card.style.filter = 'none';
          card.querySelectorAll('h1, p').forEach(el => {
            el.style.color = 'inherit';
            el.style.filter = 'none';
          });
        }
        else if (additionalColor === "default" || additionalColor === undefined || additionalColor === null) {
          card.style.backgroundColor = 'rgb(0,0,0)';
          card.style.color = 'rgb(255, 255, 255)';
          card.style.filter = 'none';
          card.querySelectorAll('h1, p').forEach(el => {
            el.style.color = 'inherit';
            el.style.filter = 'none';
          });
        }
      }

      // Apply to original
      const cardDiv = outerDiv.querySelector('.holder');
      const card = cardDiv.querySelector('.card');
      applyVertexColor(card);

      // Apply to clone
      const cloneCardDiv = cloneDiv.querySelector('.holder');
      const cloneCard = cloneCardDiv.querySelector('.card');
      applyVertexColor(cloneCard);

    }, 0);
  }
  const cloneDiv = outerDiv.cloneNode(true); // true means it copies all child nodes
  transactionList.appendChild(outerDiv);
  dialog_box.appendChild(cloneDiv);



}
function ShippingAddress(addressData) {
  if (addressData) {
    document.getElementById("fullname").textContent = addressData.fullname || '';
    document.getElementById("addressLine1").textContent = addressData.addressLine1 || '';
    document.getElementById("addressLine2").textContent = addressData.addressLine2 || '';
    document.getElementById("city").textContent = addressData.city || '';
    document.getElementById("state").textContent = addressData.state || '';
    document.getElementById("pincode").textContent = addressData.pincode || '';
    document.getElementById("mobile").textContent = addressData.mobile || '';
  }
}
function payment_method(method) {
  const paymentMethodElement = document.getElementById("payment_method");
  paymentMethodElement.textContent = method.toUpperCase() || 'Not specified';
}
function orderSummary(orderSummary) {
  const orderSummaryElement = document.querySelector(".order-summary");
  if (orderSummary) {
    // Assign values to respective elements
    document.getElementById("basePriceValue").textContent = `₹${orderSummary.basePrice || 0}`;
    document.getElementById("deliveryFeeValue").textContent = `₹${orderSummary.deliveryFee || 0}`;
    document.getElementById("discountValue").textContent = `-₹${orderSummary.discount || 0}`;

    // Calculate total amount
    let totalAmount = 0;
    if (orderSummary.basePrice) totalAmount += Number(orderSummary.basePrice);
    if (orderSummary.deliveryFee) totalAmount += Number(orderSummary.deliveryFee);
    if (orderSummary.discount) totalAmount -= Number(orderSummary.discount);

    document.getElementById("totalAmountValue").textContent = `₹${totalAmount}`;
  }
  if (orderSummary) {
    // Clear previous items to avoid duplicates
    var totalAmount = 0;
    const itemTotal = document.createElement("div");
    console.log(orderSummary);
    Object.entries(orderSummary).forEach(([k, v]) => {
      if (k === "discount") {
        totalAmount -= Number(v);
      } else {
        totalAmount += Number(v);
      }
    });




  }
}
const concernDialog = document.getElementById('raise_a_concern_dialog');

document.getElementById("raise_a_concern").addEventListener("click", async () => {
  document.getElementById("success_message").style.display = "none";

  document.getElementById("raise_a_concern_dialog").showModal();
  document.getElementById("form-content").style.display = "block";

});
document.getElementById("raise_a_concern_submit").addEventListener("click", async () => {
  submitConcern();
});

// creating the function to handle the raise a concern form

async function submitConcern() {
  // Get form values
  const concernType = concernDialog.querySelector('select').value;
  const subject = concernDialog.querySelector('input[type="text"]').value.trim();
  const message = concernDialog.querySelector('textarea').value.trim();
  const transactionId = concernDialog.querySelector('#container_dialog_box strong')?.textContent || null;

  // Validate inputs
  if (!concernType) {
    alert('Please select a concern type');
    return;
  }
  if (!subject) {
    alert('Please enter a subject');
    return;
  }
  if (!message) {
    alert('Please enter your message');
    return;
  }

  try {
    // Create concern data object
    const concernData = {
      type: concernType,
      subject: subject,
      message: message,
      transactionId: tid,
      generatedby: "userDashboard",
      status: 'open',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: auth.currentUser?.uid || null // Assuming you have auth initialized
    };

    // Add to Firestore
    await addDoc(collection(db, 'concern'), concernData)
      .then(() => {
        // Success, do nothing here as alert and dialog close are handled below    

        document.getElementById("form-content").style.display = "none";
        document.getElementById("success_message").style.display = "block";

      })
      .catch((error) => {
        console.error('Error submitting concern:', error);
        alert('Failed to submit concern. Please try again.');
        throw error; // rethrow to exit the try block
      });
    // Show success and close dialog


    // Reset form
    concernDialog.querySelector('select').value = '';
    concernDialog.querySelector('input[type="text"]').value = '';
    concernDialog.querySelector('textarea').value = '';
    document.getElementById('container_dialog_box').innerHTML = '';

  } catch (error) {
    console.error('Error submitting concern:', error);
    alert('Failed to submit concern. Please try again.');
  }
}



document.getElementById("download_invoice").addEventListener("click", () => {
  location.href = `./invoice.html?tid=${tid}`;
});
function trackingStatus(actions) {
  const stepMap = {
    1: 'order',    // assumed always done
    2: 'print',
    3: 'package',
    4: 'ship',
    5: 'delivery'
  };

  // Convert ISO/Unix timestamp to readable format
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options); // Example: 14 Jun, 2025
  }

  // Determine the highest step reached
  let currentStep = 1;
  for (let i = 2; i <= 5; i++) {
    if (actions[stepMap[i]]) {
      currentStep = i;
    }
  }

  const steps = document.querySelectorAll('.step');

  steps.forEach((step, index) => {
    const stepNum = index + 1;

    if (stepNum <= currentStep) {
      setTimeout(() => {
        const circle = step.querySelector('.circle');
        circle.innerHTML = '<i class="fa-solid fa-check"></i>';
        step.classList.add('active');

        if (index > 0) {
          steps[index - 1].classList.add('completed');
        }
        if (stepNum === 5) {
          step.classList.add('completed');

        }
        const dateElem = step.querySelector('.step-date');
        const actionKey = stepMap[stepNum];
        if (dateElem && actions[actionKey]) {
          dateElem.textContent = formatDate(actions[actionKey].toDate().toISOString().slice(0, 10));
          step.classList.add('show-date');
        }
      }, index * 500);
    }

  });


}


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
