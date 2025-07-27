document.addEventListener('DOMContentLoaded', function () {
    const features = [
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%201.png?alt=media',
            heading: 'Backend Portals',
            description: 'Optimize your operations with secure and efficient portals that simplify workflow management and data access..'
        },
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%202.png?alt=media',
            heading: 'User Dashboards',
            description: 'Empower your users with intuitive dashboards that offer real-time insights and seamless navigation.'
        },
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%203.png?alt=media',
            heading: 'Attendance Systems',
            description: 'Track attendance effortlessly with automated solutions designed for accuracy and ease of use.'
        },
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%204.png?alt=media',
            heading: 'POS Systems',
            description: 'Enhance your sales process with tailored point-of-sale systems that ensure speed, reliability, and seamless transactions.'
        },
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%205.png?alt=media',
            heading: 'Internal Management Tools',
            description: "Streamline your team's productivity with tools that centralize communication, tracking, and task management."
        },
        {
            logo: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fcustom-software%2FFeatured%20icon%206.png?alt=media',
            heading: 'CMS Systems',
            description: 'Take control of your content with a custom CMS tailored to your workflow, ensuring easy updates and seamless management.'
        }
        // Add more features as needed
    ];

    const featuresContainer = document.getElementById('features-container');

    features.forEach(feature => {
        const featureDiv = document.createElement('div');
        featureDiv.classList.add('feature-item');

        const logoImg = document.createElement('img');
        logoImg.src = feature.logo;
        logoImg.alt = feature.heading;

        const heading = document.createElement('h3');
        heading.textContent = feature.heading;

        const description = document.createElement('p');
        description.textContent = feature.description;

        featureDiv.appendChild(logoImg);
        featureDiv.appendChild(heading);
        featureDiv.appendChild(description);

        featuresContainer.appendChild(featureDiv);
    });
});


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
           document.getElementById('callback-modal').close();

    } catch (err) {
      console.error(err);
      alert('Submission failed: ' + err.message);
    }
  });