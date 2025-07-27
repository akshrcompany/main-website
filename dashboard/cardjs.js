import { onAuthStateChanged, auth, dbd, onValue, reff, set, update, storage, ref, uploadBytes, getDownloadURL } from "../javascript/config.js"
let url = new URL(window.location.href);
let params = url.searchParams;
var cardId = params.get('cid');
console.log(cardId);
// Get reference to the elements inside the profile card
const usernameElement = document.getElementById('username');
const userRoleElement = document.getElementById('user-role');
const locationElement = document.getElementById('location');
const bioDescElement = document.getElementById('bio-text');
const avatarimg = document.getElementById('avatar-img');
var closeModal = document.querySelectorAll('.close');

closeModal.forEach(button => {
  button.addEventListener('click', function () {
    const dialog = this.closest('dialog');
    if (dialog) {
      dialog.close();
    }
  });
});
let originalUsername = null;
let editingDiv = null;
let editingButton = null;
var SocialModal = document.getElementById('socialModal');
var socialName;
var socialMedia = {};
var nameInput = document.getElementById('name');
var LocationInput = document.getElementById('locationInput');
var designationInput = document.getElementById('designation');
var bioTextarea = document.getElementById('bio');
var backgroundImage;
var userId;



const portfolioBtn = document.getElementById('portfolio');
const customLinkBtn = document.getElementById('Custom_link');
const formSection = document.getElementById('form');
const socialInfo = document.getElementById('social-info');
const customLinkSection = document.getElementById('customLinkSection');
const viewportWidth = window.innerWidth;

function showPortfolio() {
  if (formSection) formSection.style.display = 'block';
  if (socialInfo) socialInfo.style.display = 'block';
  if (customLinkSection) customLinkSection.style.display = 'none'; portfolioBtn.classList.add('selected');
  customLinkBtn.classList.remove('selected');
  console.log(viewportWidth);
  if (viewportWidth > 768) {
    document.getElementById('phone_preview').style.display = 'flex';
  }


}
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

function showCustomLink() {
  if (formSection) formSection.style.display = 'none';
  if (socialInfo) socialInfo.style.display = 'none';
  if (customLinkSection) customLinkSection.style.display = 'block'; portfolioBtn.classList.remove('selected');
  customLinkBtn.classList.add('selected');

  document.getElementById('phone_preview').style.display = 'none';
  document.getElementById('link').focus();

}

if (portfolioBtn) {
  portfolioBtn.addEventListener('click', showPortfolio);

}
if (customLinkBtn) {
  customLinkBtn.addEventListener('click', showCustomLink);

}







onAuthStateChanged(auth, (user) => {
  if (user) {

    const uid = user.uid;
    userId = user.uid;
    updateProfileCard();
    var dropdown = document.querySelector('.dropdown');
    var dropdownContent = document.querySelector('.dropdown-content');
    var socialForm = document.querySelector('.social-form');
    var profileImage = document.querySelector('.profile-image');
    var uploadInput = document.getElementById('uploadInput');
    var link = document.getElementById('link');

    dropdown.addEventListener('click', function () {
      dropdownContent.classList.toggle('show');
    });
    onValue(reff(dbd, "PublicProfiles/" + cardId), (snapshot) => {
      const data = snapshot.val();
      nameInput.value = data.nname;
      designationInput.value = data.designation;
      backgroundImage = data.background;
      link.value = data.customlink || "";
      if (backgroundImage) {
        // Set the selected background tile based on the backgroundImage value
        const tiles = document.querySelectorAll('.bg-tile');
        tiles.forEach(tile => {
          if (tile.getAttribute('data-name') === backgroundImage) {
            tile.classList.add('selected');
            const blurDiv = document.querySelector('.bg-blur');
            if (blurDiv) {
              blurDiv.style.backgroundImage = `url('${tile.getAttribute('data-background')}')`;
            }
          } else {
            tile.classList.remove('selected');
          }
        });
      }
      bioTextarea.value = data.bio;
      usernameElement.textContent = nameInput.value;
      userRoleElement.textContent = designationInput.value;
      bioDescElement.textContent = bioTextarea.value;
      locationElement.textContent = data.location || null;
      LocationInput.value = data.location || null;

      document.getElementById("uploadedImage").src = data.pphoto;
      avatarimg.src = data.pphoto;
      socialMedia = data.social;
      for (var platform in socialMedia) {
        if (socialMedia.hasOwnProperty(platform)) {
          var values = socialMedia[platform];
          createSocialEntry(platform, values[0], values[1]);
        }
      }
    },
      (error) => {
        console.error("Error fetching profile data:", error);
      }
    );
    document.getElementById("submitform").addEventListener("click", (event) => {
      event.preventDefault();
      update(reff(dbd, "PublicProfiles/" + cardId), {
        nname: nameInput.value,
        designation: designationInput.value,
        bio: bioTextarea.value,
        background: backgroundImage,
        social: socialMedia,
        location: LocationInput.value,
        pphoto: uploadedImage.src,
        redirction: false,

      });
      window.location.href = "https://card.akshr.in?cardid=" + cardId;

    })
    // Iterate over the keys of the socialMedia object

    dropdownContent.addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.tagName === 'A') {
        var selectedSocial = event.target.dataset.value;
        socialName = event.target.innerText.trim();
        SocialModal.showModal();
      



      }
    });

    window.addEventListener('click', function (event) {
      if (event.target == SocialModal) {
      }
    });
    // Function to create a social entry div
    function createSocialEntry(username, socialName, link) {
      // Create permanent div container with social media icon, name, edit button, and delete button
      var permanentDiv = document.createElement('div');
      permanentDiv.classList.add('social-item');

      var iconElement = document.createElement('i');
      const button = document.createElement("button");
      const container = document.getElementById("bio");

      var editButton = document.createElement('button');
      var deleteButton = document.createElement('button');

      iconElement.classList.add("boxicon");
      // Add all classes from the iconClass string (which may contain multiple classes)
      var iconClasses = getIconClass(socialName);
      if (iconClasses) {
        // If iconClasses is a URL (for SVG), set as background image; otherwise, add as classes
        if (iconClasses.startsWith('https')) {
          iconElement.style.backgroundImage = `url('${iconClasses}')`;
          iconElement.style.display = 'inline-block';
          iconElement.style.width = '24px';
          iconElement.style.height = '24px';
          iconElement.style.backgroundSize = 'contain';
          iconElement.style.backgroundRepeat = 'no-repeat';
          iconElement.className = ''; // Remove any previous classes
        } else {
          iconClasses.split(' ').forEach(cls => {
            if (cls && cls.trim() !== "") {
              iconElement.classList.add(cls);
            }
          });
        }
        // console.log("Icon classes added:", iconClasses);
      }
      editButton.classList.add('fa-solid'); // Adjust the class based on the desired Font Awesome icon family (e.g., fab, fas, far)

      editButton.classList.add('fa-pen'); // Adjust the class based on the desired Font Awesome icon family (e.g., fab, fas, far)

      editButton.type = "button";
      editButton.addEventListener("click", () => {
        // Open the existing modal
        SocialModal.showModal();

        // Store original state
        originalUsername = username;
        editingDiv = permanentDiv;
        editingButton = button;

        // Fill form fields
        document.getElementById('name-of-the-site').value = username;
        document.getElementById('url-of-the-site').value = link;

        document.getElementById('site-logo').innerHTML = `<i class="fab fa-${socialName.toLowerCase()} fa-2x"></i>`;
        document.getElementById('site-name').textContent = socialName;
      });

      deleteButton.classList.add('fa-solid'); // Adjust the class based on the desired Font Awesome icon family (e.g., fab, fas, far)

      deleteButton.classList.add('fa-trash'); // Adjust the class based on the desired Font Awesome icon family (e.g., fab, fas, far)

      deleteButton.type = "button";
      deleteButton.addEventListener("click", () => {
        // Remove the div tag from social-info
        permanentDiv.remove();
        button.remove();
        socialName = socialName.charAt(0).toUpperCase() + socialName.slice(1);
        // Remove the corresponding entry from the socialMedia object
        delete socialMedia[username];
      });

      var socialNameSpan = document.createElement('span');
      var socialiconpan = document.createElement('i');

      socialNameSpan.textContent = username;
      // Capitalize the first letter of username
      var usernameicon = username.charAt(0).toUpperCase() + username.slice(1);
      iconClasses = getIconClass(usernameicon);

      if (iconClasses && iconClasses.startsWith('https')) {
        socialiconpan.style.backgroundImage = `url('${iconClasses}')`;
        socialiconpan.style.display = 'inline-block';
        socialiconpan.style.width = '24px';
        socialiconpan.style.height = '24px';
        socialiconpan.style.backgroundSize = 'contain';
        socialiconpan.style.backgroundRepeat = 'no-repeat';
        socialiconpan.className = '';
      } else if (iconClasses && iconClasses.trim() !== "") {
        iconClasses.split(' ').forEach(cls => {
          if (cls && cls.trim() !== "") {
            socialiconpan.classList.add(cls);
          }
        });
      }


      permanentDiv.appendChild(socialiconpan);
      permanentDiv.appendChild(socialNameSpan);
      permanentDiv.appendChild(editButton);
      permanentDiv.appendChild(deleteButton);
      iconElement.classList.add("fa-2x");
      button.appendChild(iconElement);

      socialForm.appendChild(permanentDiv);
      const span = document.createElement("span");
      span.textContent = username;
      button.appendChild(span);

      // Append the button to the container
      document.getElementById("bio-desc").appendChild(button);

    }

    document.getElementById("add").addEventListener('click', function (event) {
      if (event.target.classList.contains('add-button')) {
        var socialEntry = event.target.closest('.social-entry');
        var inputs = socialEntry.querySelectorAll('input');
        var username = inputs[0].value;
        var link = inputs[1].value;
        var socialName = document.getElementById('site-name').textContent;

        if (!socialMedia) socialMedia = {};

        // If editing, update the existing entry
        if (originalUsername !== null && editingDiv && editingButton) {
          // Update DOM elements
          editingDiv.querySelector('span').textContent = username;
          editingDiv.querySelector('i').className = `fab fa-${socialName.toLowerCase()} fa-1.5x`;
          editingButton.querySelector('span').textContent = username;
          editingButton.querySelector('i').className = `fab fa-${socialName.toLowerCase()} fa-2x`;

          // Update socialMedia object
          if (originalUsername !== username) {
            delete socialMedia[originalUsername];
          }
          socialMedia[username] = [socialName, link];

          // Reset state
          originalUsername = null;
          editingDiv = null;
          editingButton = null;
        } else {
          // Create a new one
          createSocialEntry(username, socialName, link);
          socialMedia[username] = [socialName, link];
        }

        // Clear inputs and close modal
        inputs[0].value = '';
        inputs[1].value = '';
        SocialModal.close();
        console.log(socialMedia);
      }
    });

    //custom link management
    document.getElementById("custom_link_button").addEventListener('click', function (event) {
      event.preventDefault();

      var customLinkName = document.getElementById('link').value;
      update(reff(dbd, "PublicProfiles/" + cardId), {
        redirction: true,
        customlink: customLinkName
      });
      window.location.href = "https://card.akshr.in?cardid=" + cardId;


    });


    // ...
  } else {
    // User is signed out
    // ...
    window.location.href = "../"
  }
});

// profile photo 
document.getElementById('uploadInput').addEventListener('change', function () {
  var fileInput = this;

  if (fileInput.files.length > 0) {
    var file = fileInput.files[0];
    var fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > 1) {
      alert('File size exceeds 1 MB. Please choose a smaller file.');
      fileInput.value = '';
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var targetSize = Math.min(img.width, img.height);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        canvas.width = targetSize;
        canvas.height = targetSize;
        const fileExtension = file.type.split('/')[1]; // e.g., jpeg, png, webp
        var xOffset = (img.width - targetSize) / 2;
        var yOffset = (img.height - targetSize) / 2;

        ctx.drawImage(img, xOffset, yOffset, targetSize, targetSize, 0, 0, targetSize, targetSize);

        canvas.toBlob(function (blob) {
          // Upload to Firebase Storage

          const storageRef = ref(storage, `Users/${userId}/${cardId}.${fileExtension}`);
          uploadBytes(storageRef, file).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          }).then(downloadURL => {
            // Update image preview
            document.getElementById('uploadedImage').src = downloadURL;
            avatarimg.src = downloadURL;
            document.querySelector('.profile-image').style.display = 'block';
            alert("Profile photo updated!");
          }).catch(error => {
            console.error("Upload failed: ", error);
            alert("Failed to upload image.");
          });


        }, 'image/jpeg');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});



// Efficiently update profile card fields when form inputs change
[nameInput, designationInput, bioTextarea, LocationInput].forEach(input => {
  input.addEventListener('input', updateProfileCard);
});

// Update profile card display with current form values
function updateProfileCard() {
  usernameElement.textContent = nameInput.value.trim();
  userRoleElement.textContent = designationInput.value.trim();
  bioDescElement.textContent = bioTextarea.value.trim();
  locationElement.textContent = LocationInput.value.trim();
}

var socialPlatforms = [
  { name: 'Phone', iconClass: 'fa fa-phone ', text: '@user_phone' },
  { name: 'Mail', iconClass: 'fa fa-envelope ', text: '@user_mail' },
  { name: 'Location', iconClass: 'fa fa-map-marker', text: '@user_location' },
  { name: 'Chrome', iconClass: 'fab fa-chrome', text: '@user_chrome' },
  { name: 'Facebook', iconClass: 'fa fa-facebook ', text: '@user_facebook' },
  { name: 'Twitter', iconClass: 'fab fa-twitter ', text: '@user_twitter' },
  { name: 'Whatsapp', iconClass: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdashboard%2Fimages%2FIcons%2FIcon_WhatsApp.svg?alt=media&token=b5bbecf6-4685-4aba-8b04-642c362815e5', text: '@user_whatsapp' },
  { name: 'Snapchat', iconClass: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdashboard%2Fimages%2FIcons%2FIcon_Snapchat.svg?alt=media&token=0163c90b-211b-4f26-bf86-bbbe2bc64210', text: '@user_snapchat' },
  { name: 'Linkedin', iconClass: 'fab fa-linkedin', text: '@user_linkedin' },
  { name: 'Instagram', iconClass: 'https://firebasestorage.googleapis.com/v0/b/main-control-panel.firebasestorage.app/o/website%2Fimages%2Fdashboard%2Fimages%2FIcons%2FIcon_Instagram.svg?alt=media&token=25bc5d00-62b8-46d1-b9fc-a0f748049fff', text: '@user_instagram' },
  { name: 'Youtube', iconClass: 'fab fa-youtube ', text: '@user_youtube' },
  { name: 'Telegram', iconClass: 'fab fa-telegram ', text: '@user_telegram' },
  { name: 'Spotify', iconClass: 'fab fa-spotify ', text: '@user_spotify' },
  { name: 'Github', iconClass: 'fab fa-github ', text: '@user_github' },
  { name: 'Behance', iconClass: 'fab fa-behance ', text: '@user_behance' },
  { name: 'Reddit', iconClass: 'fab fa-reddit ', text: '@user_reddit' },
  { name: 'Stack-overflow', iconClass: 'fab fa-stack-overflow ', text: '@user_stack_overflow' },
  { name: 'Quora', iconClass: 'fab fa-quora ', text: '@user_quora' },
  { name: 'Pinterest', iconClass: 'fab fa-pinterest ', text: '@user_pinterest' },
  { name: 'Tumblr', iconClass: 'fab fa-tumblr ', text: '@user_tumblr' },
  { name: 'Skype', iconClass: 'fab fa-skype ', text: '@user_skype' },
  { name: 'Meetup', iconClass: 'fab fa-meetup ', text: '@user_meetup' },
  { name: 'Gitlab', iconClass: 'fab fa-gitlab ', text: '@user_gitlab' },
  { name: 'Flickr', iconClass: 'fab fa-flickr ', text: '@user_flickr' },
  { name: 'Codepen', iconClass: 'fab fa-codepen ', text: '@user_codepen' },
  { name: 'Googleplus', iconClass: 'fab fa-google-plus ', text: '@user_google_plus' },
  { name: 'Stackexchange', iconClass: 'fab fa-stack-exchange ', text: '@user_stack_exchange' },
  { name: 'Vimeo', iconClass: 'fab fa-vimeo', text: '@user_vimeo' },
  { name: 'Discord', iconClass: 'fab fa-discord', text: '@user_discord' },
  { name: 'Map-maker', iconClass: 'fa fa-map-marker ', text: '@user_map_maker' },
];
// Simple way to get iconClass for a platform by name:
function getIconClass(name) {
  const platform = socialPlatforms.find(p => p.name.toLowerCase() === name.toLowerCase());
  return platform ? platform.iconClass : null;
}

// Example usage:

document.addEventListener('DOMContentLoaded', function () {
  // Define an array of social media platforms with their respective data


  const modal = document.getElementById("socialGridModal");
  const socialGrid = document.getElementById("social-grid");

  // Populate the social grid
  socialPlatforms.forEach(link => {
    const item = document.createElement("a");
    item.href = "#";
    // Handle iconClass as either a class or an image URL
    if (link.iconClass.startsWith('http')) {
      item.innerHTML = `<span style="display:inline-block;width:24px;height:24px;vertical-align:middle;background:url('${link.iconClass}') center/contain no-repeat;"></span> ${link.name}`;
    } else {
      item.innerHTML = `<i class="${link.iconClass}"></i> ${link.name}`;
    }


    item.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(`Selected: ${link.name}`);
      socialName = link.name;
        if(socialName ==="Phone"){
          document.getElementById('name-of-the-site').value = "Phone";
          document.getElementById('url-of-the-site').value = "+91";
          document.getElementById('label-link').textContent = "Enter your phone number";
        }
        else if(socialName ==="Mail"){
           document.getElementById('name-of-the-site').value = "Email";
    document.getElementById('url-of-the-site').placeholder = "Enter your email address";
    document.getElementById('label-link').textContent = "Enter your email address";
}
      document.getElementById('name-of-the-site').value = link.name;
      // Set the site logo in the modal, handling both icon class and image URL
      if (link.iconClass.startsWith('http')) {
        document.getElementById('site-logo').innerHTML = `<span style="display:inline-block;width:24px;height:24px;vertical-align:middle;background:url('${link.iconClass}') center/contain no-repeat;"></span>`;
      } else {
        document.getElementById('site-logo').innerHTML = `<i class="${link.iconClass} fa-2x"></i>`;
      }

      document.getElementById('site-name').textContent = link.name;
      managemodal();

    });
    socialGrid.appendChild(item);
  });
  function managemodal() {
    SocialModal.showModal();



  }
  // Toggle modal
  function toggleModal() {
    modal.showModal();
  }

  document.getElementById("dropbtn").addEventListener('click', () => { toggleModal() });


  const divContainer = document.querySelector('.div-container');
  if (!divContainer.querySelector('.bg-blur')) {
    const blurDiv = document.createElement('div');
    blurDiv.className = 'bg-blur';
    // Set initial background
    const selectedTile = document.querySelector('.bg-tile.selected');
    if (selectedTile) {
      blurDiv.style.backgroundImage = `url('${selectedTile.getAttribute('data-background')}')`;
    }
    divContainer.insertBefore(blurDiv, divContainer.firstChild);
  }
  const blurDiv = divContainer.querySelector('.bg-blur');
  // Update blur background on tile select
  const tiles = document.querySelectorAll('.bg-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', function () {
      tiles.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      const bg = this.getAttribute('data-background');
      backgroundImage = this.getAttribute('data-name');

      blurDiv.style.backgroundImage = `url('${bg}')`;
    });
    tile.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

});

