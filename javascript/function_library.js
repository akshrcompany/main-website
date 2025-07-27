class PasswordInput extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
  
      <style>
        .input-label {
         width: 100%;
        font-size: small;
         color: var(--Text-Primary, #121A21);
        font-size: 0.75rem;
         transition: 0.5s;
        }
        .input-trailing-icon {
          position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        }
        .input-field {
          width: 100%;
        font-family: inherit;
        font-variant-numeric: lining-nums tabular-nums;
        border-radius: 0.25rem;
        font-family: inherit;
        border: 1px solid var(--Stroke-Default, #D2D9E1);
        background: var(--Surface-Neutral-Default, #FFF);
        padding: 12px 12px 12px 12px;
        /* space for the icon */
        box-sizing: border-box;
        font-size: 1rem;
        font-weight: 400;
        line-height: 150%;
        margin-top: 0.5vh;

        }
        .input-field:focus {
         
        border: 1px solid var(--Stroke-Blue, #2782D0)!important;
         /* Active State */
        box-shadow: 0px 0px 0px 4px var(--Effects-Drop-Shadow-Active-Field, #C2DDF5);
        }

        .input-field:focus-visible{
        border: 1px solid var(--Stroke-Blue, #2782D0);
        }
        .trailing-icon-btn {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 1rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        height: fit-content;
        
        }#password::placeholder {
          color: var(--Text-Tertiary, #6B7280);}
        #password:focus {
  border-color: #1976d2; /* or any blue shade you prefer */
  outline: none; /* optional: removes default outline */
}
        .trailing-icon {
        width: 24px;
        height: 24px;
        color: var(--Icon-Default);
        pointer-events: none;
        }
      </style>
      <label class="input-label" for="password">
        Password
        <div class="input-trailing-icon">
          <input type="password" placeholder="Enter your password" id="password" class="input-field"/>
          <button type="button" class="trailing-icon-btn" aria-label="Show password">
            <span class="icon-eye-off" style="display:flex;">
              <!-- Eye Off SVG -->
              <svg class="trailing-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.8764 9.42105L14.1818 11.7495V11.6316C14.1818 11.0453 13.9519 10.4831 13.5428 10.0685C13.1336 9.65395 12.5787 9.42105 12 9.42105H11.8764ZM8.74909 10.0105L9.87636 11.1526C9.84 11.3074 9.81818 11.4621 9.81818 11.6316C9.81818 12.2178 10.0481 12.7801 10.4572 13.1947C10.8664 13.6092 11.4213 13.8421 12 13.8421C12.16 13.8421 12.32 13.82 12.4727 13.7832L13.6 14.9253C13.1127 15.1684 12.5745 15.3158 12 15.3158C11.0356 15.3158 10.1107 14.9276 9.4287 14.2367C8.74675 13.5458 8.36364 12.6087 8.36364 11.6316C8.36364 11.0495 8.50909 10.5042 8.74909 10.0105ZM4.72727 5.93579L6.38545 7.61579L6.71273 7.94737C5.51273 8.90526 4.56727 10.1579 4 11.6316C5.25818 14.8663 8.36364 17.1579 12 17.1579C13.1273 17.1579 14.2036 16.9368 15.1855 16.5389L15.4982 16.8484L17.6218 19L18.5455 18.0642L5.65091 5M12 7.94737C12.9644 7.94737 13.8893 8.33553 14.5713 9.02645C15.2532 9.71737 15.6364 10.6545 15.6364 11.6316C15.6364 12.1032 15.5418 12.56 15.3745 12.9726L17.5055 15.1316C18.5964 14.2105 19.4691 13.0021 20 11.6316C18.7418 8.39684 15.6364 6.10526 12 6.10526C10.9818 6.10526 10.0073 6.28947 9.09091 6.62105L10.6691 8.20526C11.0836 8.04316 11.5273 7.94737 12 7.94737Z" fill="#415467"/>
</svg>
            </span>
            <span class="icon-eye-on" style="display:none;">
              <!-- Eye On SVG -->
              <svg class="trailing-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 9.8C11.4213 9.8 10.8664 10.0318 10.4572 10.4444C10.0481 10.8569 9.81818 11.4165 9.81818 12C9.81818 12.5835 10.0481 13.1431 10.4572 13.5556C10.8664 13.9682 11.4213 14.2 12 14.2C12.5787 14.2 13.1336 13.9682 13.5428 13.5556C13.9519 13.1431 14.1818 12.5835 14.1818 12C14.1818 11.4165 13.9519 10.8569 13.5428 10.4444C13.1336 10.0318 12.5787 9.8 12 9.8ZM12 15.6667C11.0356 15.6667 10.1107 15.2804 9.4287 14.5927C8.74675 13.9051 8.36364 12.9725 8.36364 12C8.36364 11.0275 8.74675 10.0949 9.4287 9.40728C10.1107 8.71964 11.0356 8.33333 12 8.33333C12.9644 8.33333 13.8893 8.71964 14.5713 9.40728C15.2532 10.0949 15.6364 11.0275 15.6364 12C15.6364 12.9725 15.2532 13.9051 14.5713 14.5927C13.8893 15.2804 12.9644 15.6667 12 15.6667ZM12 6.5C8.36364 6.5 5.25818 8.78067 4 12C5.25818 15.2193 8.36364 17.5 12 17.5C15.6364 17.5 18.7418 15.2193 20 12C18.7418 8.78067 15.6364 6.5 12 6.5Z" fill="#415467"/>
</svg>
            </span>
          </button>
        </div>
      </label>
    `;
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelector('.trailing-icon-btn');
    const input = this.shadowRoot.querySelector('.input-field');
    const eyeOff = this.shadowRoot.querySelector('.icon-eye-off');
    const eyeOn = this.shadowRoot.querySelector('.icon-eye-on');

    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      eyeOff.style.display = isPassword ? 'none' : 'flex';
      eyeOn.style.display = isPassword ? 'flex' : 'none';
      btn.setAttribute(
        'aria-label',
        isPassword ? 'Hide password' : 'Show password'
      );
    });
  }
}

// Register the element if not already defined
if (!customElements.get('password-input')) {
  customElements.define('password-input', PasswordInput);
}