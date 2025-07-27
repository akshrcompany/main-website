const data = [
    {
        title: "Akshr",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FLogos%2Fakshr.png?alt=media&token=66d0ed39-5f8a-48ce-a5be-21a1826b4476",
        onClickUrl: "https://www.behance.net/gallery/157582169/Akshr-Logo-Design",
        description:"Our very own logo—crafted with a story that reflects who we are and how our journey began."
    },
    {
        title: "RS Group",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FLogos%2Frs_group.png?alt=media&token=1342546b-51f9-456a-a440-6141e9e6b5f8",
        onClickUrl: "https://www.behance.net/gallery/157582509/RS-Group-Brand-Identity",
                description:"A minimalistic logo designed for Advocate Ravindra Singh's EPF consultancy, reflecting professionalism with simplicity."

        
    },
    {
        title: "Since21",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FLogos%2Fsince21.png?alt=media&token=6b44552a-9e26-44ea-ac30-ffb905216ad8",
        onClickUrl: "https://www.instagram.com/p/Ce9eDJYowZB/?img_index=1",
                description:"A bold, classy logo for an uptown fashion brand, created to establish a strong, stylish presence on social media."

    },
    {
        title: "Twin Decor",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FLogos%2Ftwin_decor.png?alt=media&token=8401a32a-a4e8-4f5f-87d9-784e04c66d1b",
        onClickUrl: "https://www.behance.net/gallery/157581623/Twin-Decor-Logo-Design",
        description:"An elegant logo for a home interiors and furniture brand, designed to mirror their aesthetic and sophisticated style."

    }
    // Add more items as needed
];

const Logocontainer = document.getElementById('Logocontainer');
const Artcontainer = document.getElementById('Artcontainer');
const Vistcontainer = document.getElementById('Artcontainer');

function createDynamicContent(data, container) {
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        const itemhr = document.createElement('hr');
        itemDiv.className = 'logos'; const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        const title = document.createElement('h4');
        const desc=document.createElement('p');
        title.innerHTML = `${item.title} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <g clip-path="url(#clip0_4119_6658)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.63585 18.8637C5.42488 18.6528 5.30635 18.3666 5.30635 18.0682C5.30635 17.7699 5.42488 17.4837 5.63585 17.2727L14.853 8.05561L6.52234 8.05561C6.23102 8.04533 5.95507 7.92237 5.75262 7.71265C5.55017 7.50292 5.43703 7.22281 5.43703 6.93131C5.43703 6.63981 5.55017 6.35969 5.75262 6.14997C5.95507 5.94025 6.23102 5.81729 6.52234 5.80701L17.5683 5.80701C17.8664 5.80719 18.1523 5.92571 18.3631 6.13651C18.5739 6.34732 18.6924 6.63318 18.6926 6.93131L18.6926 17.9772C18.6823 18.2686 18.5593 18.5445 18.3496 18.747C18.1399 18.9494 17.8598 19.0626 17.5683 19.0626C17.2768 19.0626 16.9967 18.9494 16.7869 18.747C16.5772 18.5445 16.4543 18.2686 16.444 17.9772L16.444 9.6466L7.22684 18.8637C7.01587 19.0747 6.72972 19.1932 6.43135 19.1932C6.13298 19.1932 5.84683 19.0747 5.63585 18.8637Z" fill="#1863AA"/>
  </g>
  <defs>
    <clipPath id="clip0_4119_6658">
      <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
    </clipPath>
  </defs>
</svg>`;     
   title.onclick = () => window.location.href = item.onClickUrl;

desc.textContent=item.description
        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
         itemDiv.appendChild(itemhr);        itemDiv.appendChild(desc);

        container.appendChild(itemDiv);
    });
}


const art = [
    {
        title: "Low Poly",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FVisual%20Designs%2FArt_1.png?alt=media&token=10ad7fb9-750c-4b47-8342-7c1339c2e286",
        onClickUrl: "https://example.com/page1",
                description:"A modern, minimalist design style using geometric shapes to create sleek, stylized visuals, like a panda."
    },
    {
        title: "Isometric",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FVisual%20Designs%2FArt_2.png?alt=media&token=ba1b692f-423d-4240-9628-1645f041529c",
        onClickUrl: "https://example.com/page1",
                description:"3D-like designs on a 2D plane, adding depth and structure to simple forms and objects."
    },
    {
        title: "Vector",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FVisual%20Designs%2FArt_3.png?alt=media&token=5f2b8e43-ccf6-4ed8-98bb-367c4dc38d3c",
        onClickUrl: "https://example.com/page1",
                description:"Scalable, crisp designs perfect for logos and icons, with clean lines and sharp detail."
    },
    {
        title: "Concept Art",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdesign-services%2FVisual%20Designs%2FArt_4.png?alt=media&token=107a4e44-7dcd-4751-baef-1e72c9ba3b2f",
        onClickUrl: "https://example.com/page2",
                description:"A proposed logo concept capturing the spirit of the Kumbh Mela, blending tradition with contemporary design."
    }
    // Add more items as needed
];
createDynamicContent(data, Logocontainer);
createDynamicContent(art, Artcontainer);

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