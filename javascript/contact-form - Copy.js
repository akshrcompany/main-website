class AkshrCallbackForm extends HTMLElement {
  connectedCallback() {
    // Grab attributes
    const fieldsAttr = this.getAttribute('fields');
    const interestFirst = this.getAttribute('interest-first') || 'Design Services';

    // All available fields
    const allFields = [
      'interest', 'name', 'phone', 'email', 'preferred_contact', 'date_time',
      'subject', 'message', 'about_project'
    ];
    // Which fields to render
    let fields = (fieldsAttr === 'all' || !fieldsAttr)
      ? allFields
      : fieldsAttr.split(',').map(f => f.trim());

    // Clear old content
    this.innerHTML = '';

    // Create form
    const form = document.createElement('form');
    form.className = 'callback-form';
    form.id = 'callback-form';

    // Helpers
    function createInput(labelText, type, id, placeholder) {
      const box = document.createElement('div');
      box.className = 'input-box-stacked';
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = labelText;
      const input = document.createElement('input');
      input.type = type;
      input.id = id;
      if (placeholder) input.placeholder = placeholder;
      box.appendChild(label);
      box.appendChild(input);
      return box;
    }

    function createTextarea(labelText, id, placeholder) {
      const box = document.createElement('div');
      box.className = 'input-box-stacked';
      const label = document.createElement('label');
      label.setAttribute('for', id);
      label.textContent = labelText;
      const textarea = document.createElement('textarea');
      textarea.id = id;
      if (placeholder) textarea.placeholder = placeholder;
      box.appendChild(label);
      box.appendChild(textarea);
      return box;
    }

    // Render fields
    for (const field of fields) {
      if (field === 'interest') {
        const box = document.createElement('div');
        box.className = 'input-box-stacked';
        const label = document.createElement('label');
        label.setAttribute('for', 'interest');
        label.textContent = 'Interested in:';
        const select = document.createElement('select');
        select.id = 'interest';
        let options = [
          'Design Services',
          'Web / App Development',
          'UI/UX Design'
        ];
        // Custom first option
        options = [interestFirst, ...options.filter(opt => opt !== interestFirst)];
        options.forEach(optText => {
          const option = document.createElement('option');
          option.textContent = optText;
          select.appendChild(option);
        });
        box.appendChild(label);
        box.appendChild(select);
        form.appendChild(box);
      }
      else if (field === 'name') {
        form.appendChild(createInput('Name', 'text', 'name', 'Your Name'));
      }
      else if (field === 'phone') {
        form.appendChild(createInput('Phone Number', 'tel', 'phone', 'Phone Number'));
      }
      else if (field === 'email') {
        form.appendChild(createInput('Email', 'email', 'email', 'Email'));
      }
      else if (field === 'subject') {
        form.appendChild(createInput('Subject', 'text', 'subject', 'Subject'));
      }
      else if (field === 'message') {
        form.appendChild(createTextarea('Message', 'message', 'Type your message'));
      }
      else if (field === 'about_project') {
        form.appendChild(createTextarea('About Your Project', 'about_project', 'Tell us about your project'));
      }
      else if (field === 'preferred_contact') {
        const box = document.createElement('div');
        box.className = 'input-box-stacked';
        const label = document.createElement('label');
        label.textContent = 'Preferred mode of contact';
        box.appendChild(label);

        const radioPhoneLabel = document.createElement('label');
        const radioPhone = document.createElement('input');
        radioPhone.type = 'radio';
        radioPhone.id = 'contact-phone';
        radioPhone.name = 'preferred_contact';
        radioPhone.value = 'phone';
        radioPhoneLabel.appendChild(radioPhone);
        radioPhoneLabel.append('Phone');
        box.appendChild(radioPhoneLabel);

        const radioEmailLabel = document.createElement('label');
        const radioEmail = document.createElement('input');
        radioEmail.type = 'radio';
        radioEmail.id = 'contact-email';
        radioEmail.name = 'preferred_contact';
        radioEmail.value = 'email';
        radioEmailLabel.appendChild(radioEmail);
        radioEmailLabel.append('Email');
        box.appendChild(radioEmailLabel);

        form.appendChild(box);
      }
      else if (field === 'date_time') {
        const queueBox = document.createElement('div');
        queueBox.className = 'input-box-queue';

        const dateLabel = document.createElement('label');
        dateLabel.setAttribute('for', 'contact-date');
        dateLabel.textContent = 'Date of contact ';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.id = 'contact-date';
        dateLabel.appendChild(dateInput);
        queueBox.appendChild(dateLabel);

        const timeLabel = document.createElement('label');
        timeLabel.setAttribute('for', 'contact-time');
        timeLabel.textContent = 'Time of contact ';
        const timeInput = document.createElement('input');
        timeInput.type = 'time';
        timeInput.id = 'contact-time';
        timeLabel.appendChild(timeInput);
        queueBox.appendChild(timeLabel);

        form.appendChild(queueBox);
      }
    }

    // Add a submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.classList.add("button_primary");
    submitBtn.textContent = 'Submit';
    form.appendChild(submitBtn);

    // Append form
    this.appendChild(form);

    // -- SUBMIT HANDLER --
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let errors = [];
      const payload = {};

      // Helper for validation
      function validateField(id, label, validator) {
        const el = form.querySelector(`#${id}`);
        if (el) {
          const value = el.value.trim();
          payload[id.replace('-', '')] = value; // remove dash for payload key if needed
          if (!value) {
            errors.push(`${label} is required.`);
          } else if (validator && !validator(value)) {
            errors.push(`Enter a valid ${label.toLowerCase()}.`);
          }
          return value;
        }
        return undefined;
      }

      // For select (interest)
      if (form.querySelector('#interest')) {
        const interest = form.querySelector('#interest').value.trim();
        payload.interest = interest;
        if (!interest) errors.push('Please select your interest.');
      }

      // For preferred contact radio
      if (form.querySelector('input[name="preferred_contact"]')) {
        const preferredContact = form.querySelector('input[name="preferred_contact"]:checked')?.value || '';
        payload.preferredContact = preferredContact;
        if (!preferredContact) errors.push('Please select a preferred contact method.');
      }

      // Validate other fields if present
      validateField('name', 'Name');
      validateField('phone', 'Phone number', (v) => /^\d{7,15}$/.test(v));
      validateField('email', 'Email', (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      validateField('contact-date', 'Contact date');
      validateField('contact-time', 'Contact time');
      validateField('subject', 'Subject');
      validateField('message', 'Message');
      validateField('about_project', 'About your project');

      if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
      }

      // Recaptcha (comment out below if not testing on live site)
      let token = '';
      try {
        token = await grecaptcha.execute('6LeB4X0rAAAAAGr1EXW-328lXsB0nM8gZlCL_WZR', { action: 'submit' });
      } catch (err) {
        alert('Recaptcha failed. Please refresh and try again.');
        return;
      }
      payload.recaptchaToken = token;

      try {
        const resp = await fetch('http://127.0.0.1:5001/main-control-panel/asia-south1/submitServiceRequest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const json = await resp.json();
        if (!resp.ok) throw new Error(json.error || resp.statusText);

        alert(json.message); // Success!
        form.reset();
        document.getElementById('callback-modal')?.close();
      } catch (err) {
        console.error(err);
        alert('Submission failed: ' + err.message);
      }
    });
  }
}

customElements.define('akshr-callback-form', AkshrCallbackForm);
