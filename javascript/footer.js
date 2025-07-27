var footerplaceholder = document.getElementById("footer-placeholder");
const footer = document.createElement('footer');
footer.className = 'footer';

const footerItems = document.createElement('div');
footerItems.className = 'footeritems';

const sectionsforFooter = [
    {
        title: 'Akshr',
        links: [
            { text: 'Home', href: 'https://akshr.in/#' },
            { text: 'About us', href: 'https://akshr.in/#about' },
            // { text: 'Our Services', href: 'https://akshr.in/#services' },
            { text: 'Our product', href: 'https://akshr.in/#product' },
            // { text: 'Our team', href: 'https://akshr.in/#team' }
        ]
    },
    {
        title: 'Akshr Card',
        links: [
            { text: 'Akshr Card ', href: 'https://akshr.in/akshrcard' },
            { text: 'Order Now', href: 'https://akshr.in/getakshrcard' },
            { text: 'Login', href: 'https://akshr.in/login' },
            { text: 'Support', href: 'https://akshr.in/akshrcard-support' },
        ]
    },
    {
        title: 'Quick Links',
        links: [
            { text: 'Privacy Policy', href: 'https://akshr.in/privacy-policy' },
            { text: 'Terms & Conditions', href: 'https://akshr.in/terms-conditions' },
            { text: 'Refund & Replacment', href: 'https://akshr.in/refund-policy' }
        ]
    },
    {
        title: 'Services',
        links: [
            { text: 'Design Services', href: 'https://akshr.in/design-services' },
            { text: 'Custom Software', href: 'https://akshr.in/custom-software' },
            { text: 'Web/App Development', href: 'https://akshr.in/website-app' }
        ]
    },
    {
        title: 'Contact',
        links: [
            { text: 'Email', href: 'mailto:akshrcompany@gmail.com' },
            { text: 'Contact Us', href: 'https://akshr.in/contactus' }

        ]
    }
];

sectionsforFooter.forEach(section => {
    const footerItem = document.createElement('div');
    footerItem.className = 'footer-item';

    const ul = document.createElement('ul');
    const h2 = document.createElement('h2');
    h2.textContent = section.title;
    ul.appendChild(h2);

    section.links.forEach(link => {
        const li = document.createElement('li');
        if (typeof link === 'string') {
            li.textContent = link;
        } else {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            li.appendChild(a);
        }
        ul.appendChild(li);
    });

    footerItem.appendChild(ul);
    footerItems.appendChild(footerItem);
});

footer.appendChild(footerItems);

const hr = document.createElement('hr');
hr.className="hr";
footer.appendChild(hr);

const footerBottom = document.createElement('div');
footerBottom.className = 'footer-bottom';

const logo = document.createElement('div');
logo.className = 'logo';
const img = document.createElement('img');
img.src = "https://akshr.in/logo/akshr.png";
img.alt = 'akshr Logo';
logo.appendChild(img);
footerBottom.appendChild(logo);

const copyright = document.createElement('div');
copyright.className = 'copyright';
copyright.textContent = '© 2025 Akshr. All rights reserved.';
footerBottom.appendChild(copyright);

const socialIcons = document.createElement('div');
socialIcons.className = 'social-icons';

const socialLinks = [
    { href: 'mailto:akshrcompany@gmail.com', class: 'fa-solid fa-envelope fa-1x' },
    { href: 'https://www.linkedin.com/company/akshrcompany/', class: 'fab fa-linkedin fa-1x' },
    { href: 'https://www.facebook.com/akshrCompany/', class: 'fab fa-facebook fa-1x' },
    { href: 'https://x.com/AkshrCompany', class: 'fab fa-twitter fa-1x' },
    { href: 'https://www.instagram.com/akshrcompany/', class: 'fab fa-instagram fa-1x' }
];

socialLinks.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.className = link.class;
    socialIcons.appendChild(a);
});

footerBottom.appendChild(socialIcons);
footer.appendChild(footerBottom);


footerplaceholder.appendChild(footer);

