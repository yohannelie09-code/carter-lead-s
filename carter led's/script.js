/* =====================================================
   CARTER LEAD'S
   SHOP SYSTEM
===================================================== */


let cart = [];



/* =====================================================
   CHANGEMENT DES COULEURS
===================================================== */

document.querySelectorAll(".product").forEach(product => {


    const image =
        product.querySelector(".product-photo");


    const colors =
        product.querySelectorAll(".color");


    colors.forEach(color => {


        color.addEventListener("click", function () {


            /* Retirer la sélection */

            colors.forEach(item => {

                item.classList.remove("selected");

            });


            /* Sélectionner la nouvelle couleur */

            this.classList.add("selected");


            /* Nouvelle image */

            const newImage =
                this.dataset.image;


            /* Petite transition */

            image.style.opacity = "0";


            setTimeout(() => {

                image.src = newImage;

                image.style.opacity = "1";

            }, 180);

        });

    });

});



/* =====================================================
   CHANGEMENT DES TAILLES
===================================================== */

document.querySelectorAll(".sizes").forEach(sizeGroup => {


    const sizes =
        sizeGroup.querySelectorAll(".size");


    sizes.forEach(size => {


        size.addEventListener("click", function () {


            sizes.forEach(item => {

                item.classList.remove("selected");

            });


            this.classList.add("selected");

        });

    });

});



/* =====================================================
   AJOUT AU PANIER
===================================================== */

function addProduct(button) {


    const product =
        button.closest(".product");


    const name =
        product.dataset.name;


    const price =
        Number(product.dataset.price);


    const type =
        product.dataset.type;


    const image =
        product.querySelector(".product-photo").src;


    const selectedColor =
        product.querySelector(".color.selected");


    const selectedSize =
        product.querySelector(".size.selected");


    if (!selectedColor) {

        alert("Choisis une couleur.");

        return;

    }


    if (!selectedSize) {

        alert("Choisis une taille.");

        return;

    }


    const color =
        selectedColor.dataset.color;


    const size =
        selectedSize.textContent.trim();


    /* Vérifier si le même article existe */

    const existing =
        cart.find(item =>

            item.name === name &&
            item.color === color &&
            item.size === size

        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            type: type,

            color: color,

            size: size,

            image: image,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}



/* =====================================================
   AFFICHER LE PANIER
===================================================== */

function updateCart() {


    const container =
        document.getElementById("cart-items");


    const counter =
        document.getElementById("cart-count");


    const totalElement =
        document.getElementById("cart-total");


    container.innerHTML = "";


    let total = 0;

    let quantity = 0;


    if (cart.length === 0) {

        container.innerHTML = `

            <p class="empty-cart">

                Votre panier est vide.

            </p>

        `;

    }


    cart.forEach((item, index) => {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        quantity += item.quantity;


        const element =
            document.createElement("div");


        element.className =
            "cart-item";


        element.innerHTML = `

            <div>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.type}
                </p>

                <p>
                    Taille : ${item.size}
                </p>

                <p>
                    Couleur : ${item.color}
                </p>

                <p>
                    Quantité : ${item.quantity}
                </p>

                <strong>
                    ${formatPrice(itemTotal)}
                </strong>

            </div>


            <button
                class="remove"
                onclick="removeItem(${index})"
            >

                SUPPRIMER

            </button>

        `;


        container.appendChild(element);

    });


    counter.textContent =
        quantity;


    totalElement.textContent =
        formatPrice(total);

}



/* =====================================================
   SUPPRIMER UN ARTICLE
===================================================== */

function removeItem(index) {


    cart.splice(index, 1);


    updateCart();

}



/* =====================================================
   FORMAT PRIX
===================================================== */

function formatPrice(price) {


    return new Intl.NumberFormat(
        "fr-FR"
    ).format(price) + " FCFA";

}



/* =====================================================
   OUVRIR LE PANIER
===================================================== */

function openCart() {


    document
        .getElementById("cart-overlay")
        .classList.add("active");

}



/* =====================================================
   FERMER LE PANIER
===================================================== */

function closeCart() {


    document
        .getElementById("cart-overlay")
        .classList.remove("active");

}



/* =====================================================
   FERMER EN CLIQUANT À L'EXTÉRIEUR
===================================================== */

document
    .getElementById("cart-overlay")
    .addEventListener("click", function (event) {


        if (event.target === this) {

            closeCart();

        }

    });



/* =====================================================
   COMMANDE WHATSAPP
===================================================== */

function checkoutWhatsApp() {


    if (cart.length === 0) {

        alert(
            "Ton panier est vide."
        );

        return;

    }


    let message =
        "Bonjour CARTER LEAD'S 👋\n\n" +
        "Je souhaite passer cette commande :\n\n";


    let total = 0;


    cart.forEach((item, index) => {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=

            `${index + 1}. ${item.name}\n` +

            `Type : ${item.type}\n` +

            `Couleur : ${item.color}\n` +

            `Taille : ${item.size}\n` +

            `Quantité : ${item.quantity}\n` +

            `Prix : ${formatPrice(itemTotal)}\n\n`;

    });


    message +=

        "-------------------------\n" +

        `TOTAL : ${formatPrice(total)}\n` +

        "-------------------------\n\n" +

        "Merci de confirmer ma commande.";



    /* =================================================
       CHOIX DU NUMERO
    ================================================= */


    const ivoryCoast =
        confirm(

            "Commande Côte d'Ivoire ?\n\n" +

            "OK = Côte d'Ivoire\n" +

            "Annuler = Hors Côte d'Ivoire"

        );


    let number;


    if (ivoryCoast) {

        number =
            "2250585114967";

    }

    else {

        number =
            "33785617330";

    }


    const whatsappURL =

        "https://wa.me/" +

        number +

        "?text=" +

        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}



/* =====================================================
   ANIMATION PRODUITS
===================================================== */

const observer =

    new IntersectionObserver(

        entries => {


            entries.forEach(entry => {


                if (entry.isIntersecting) {


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.1
        }

    );



document
    .querySelectorAll(".product")
    .forEach(product => {


        product.style.opacity =
            "0";


        product.style.transform =
            "translateY(30px)";


        product.style.transition =
            "opacity .7s ease, transform .7s ease";


        observer.observe(product);

    });