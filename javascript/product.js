document.addEventListener("DOMContentLoaded", function () {
    const products = [
        {
            img1: "https://picsum.photos/seed/picsum/200/300",
            img2: "https://picsum.photos/seed/picsum/200/300",
            name: "Dream House VR",
            description: 
"Walker VR empowers architects with limitless exploration. Affordable, all-in-one packages enhance collaboration and efficiency. Step into a new era of architectural visualization where innovation meets accessibility. Elevate your designs with Walker VR – Unleash the extraordinary!",
          learnMoreLink: "learn_more_link1"        },
        {
            img1: "https://picsum.photos/seed/picsum/200/300",
            img2: "https://picsum.photos/seed/picsum/200/300",
            name: "Product 2",
            description: "Description for Product 2",
            learnMoreLink: "learn_more_link2"
        },
        // Add more products as needed
    ];

    const productContainer = document.getElementById("productContainer");

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const imagesContainer = document.createElement("div");

        const img1 = document.createElement("img");
        img1.src = product.img1;

        const img2 = document.createElement("img");
        img2.src = product.img2;

        imagesContainer.appendChild(img1);
        imagesContainer.appendChild(img2);

        const textContainer = document.createElement("div");
        textContainer.classList.add("product-text");

        const title = document.createElement("h2");
        title.innerText = product.name;

        const description = document.createElement("p");
        description.innerText = product.description;

        const learnMoreLink = document.createElement("a");
        learnMoreLink.href = product.learnMoreLink;
        learnMoreLink.innerText = "Learn More";

        textContainer.appendChild(title);
        textContainer.appendChild(description);
        textContainer.appendChild(learnMoreLink);

        productElement.appendChild(imagesContainer);
        productElement.appendChild(textContainer);

        productContainer.appendChild(productElement);
    });
});
