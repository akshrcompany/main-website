import { auth, onAuthStateChanged, reff, onValue, dbd, doc, getDoc, db, collection, getDocs, signOut } from "../javascript/config.js";
const urlParams = new URLSearchParams(window.location.search);
const tid = urlParams.get('tid');
onAuthStateChanged(auth, async (user) => {
    if (user) {


        const docRef = doc(db, "Transactions", tid);
        const docSnap = await getDoc(docRef);



        // doc.data() will be undefined in this case
        if (docSnap.exists) {
            var data = docSnap.data();
            if (docSnap.data().type == "akshrcard") {
                const doc = docSnap.data().akshrcardData;
                ShippingAddress(data.addressData);
                const date = data.paid_at.toDate();
                document.getElementById("transaction_id").textContent = docSnap.id || 'N/A';
                const options = { day: 'numeric', month: 'long', year: 'numeric'};
                const options1 = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                document.getElementById("invoice_date").textContent = date.toLocaleDateString('en-GB', options).replace(/ /g, ' ');
                document.getElementById("payment_method").textContent = data.payment_mode.toUpperCase() || 'N/A';
                document.getElementById("date_time").textContent =date.toLocaleDateString('en-GB', options1)|| 'N/A';
contentTable(data.order_summary);
                // document.getElementById("getcard").style.display = "block";

            }
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


function ShippingAddress(addressData) {
    document.getElementById("customer_name").textContent = addressData.fullname || "";
    document.getElementById("address_line_1").textContent = addressData.addressLine1 || "";
    document.getElementById("address_line_2").textContent = addressData.addressLine2 || "";
    document.getElementById("city").textContent = addressData.city || "";
    document.getElementById("state").textContent = addressData.state || "";
    document.getElementById("pincode").textContent = addressData.pincode || "";
    document.getElementById("phone_number").textContent = addressData.mobile || "";
}

function contentTable(order_summary){
           var totalAmount = 0;
           console.log(order_summary);
   // handling the base price and with its GST
   var basePrice=(order_summary.basePrice/1.18).toFixed(2)
    document.getElementById("unit_price").textContent = `₹${basePrice}`;
    document.getElementById("unit_price_gst").textContent = `₹${(basePrice*18/100).toFixed(2)}`;
    document.getElementById("total_base_price").textContent = `₹${order_summary.basePrice.toFixed(2)}`;
    
  //  handling the shipping and with its GST
  var shipping_price=(order_summary.deliveryFee/1.18).toFixed(2);
    document.getElementById("shipping_price").textContent = `₹${shipping_price}`;
    document.getElementById("shipping_price_gst").textContent = `₹${shipping_price*0.18}`;
    

    // Handling discount 
    document.getElementById("discount").textContent = `-₹${order_summary.discount.toFixed(2)}`;
        document.getElementById("discountTotal").textContent = `-₹${order_summary.discount.toFixed(2)}`;

    // Handling total price
    Object.entries(order_summary).forEach(([k, v]) => {

            if (k === "discount") {
                totalAmount -= Number(v);
            } else {
                totalAmount += Number(v);
            }
        });
        document.getElementById("totalPrice").textContent = `₹${totalAmount.toFixed(2)}`;
}