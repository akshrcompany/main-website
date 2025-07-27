function addRow() {
    const table = document.getElementById('quotationTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);

    const descriptionCell = newRow.insertCell(0);
    const quantityCell = newRow.insertCell(1);
    const priceCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    descriptionCell.innerHTML = '<input type="text" class="description">';
    quantityCell.innerHTML = '<input type="number" class="quantity" value="1" oninput="updateGrandTotal()">';
    priceCell.innerHTML = '<input type="number" class="price"  oninput="updateGrandTotal()">';
    actionCell.innerHTML = '<div class="delete-icon" onclick="deleteRow(this)">X</div>';
}
document.getElementById('addRow').addEventListener('click', addRow);
function deleteRow(cell) {
    const row = cell.parentNode;
    row.parentNode.removeChild(row);
    updateGrandTotal();
}

function updateGrandTotal() {
    const tableRows = document.querySelectorAll('#quotationTable tbody tr');
    let grandTotal = 0;

    tableRows.forEach(row => {
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;

        grandTotal += quantity * price;
    });

    document.getElementById('grandTotal').textContent = grandTotal.toFixed(2);
}
function generateQuotation() {
    const clientName = document.getElementById('clientName').value.trim();
    const clientAddress = document.getElementById('clientAddress').value.trim();
    const clientOrganization = document.getElementById('clientOrganization').value.trim();
    const typeOfBill = document.getElementById('typeOfBill').value;
    const typeOfdoc = document.getElementById('typeOfdoc').value;
    const date = document.getElementById('date').value;
    const invoiceNumber = `INV-${Date.now()}`;

    if (!clientName) {
        alert('Please enter the client name.');
        return;
    }

    const rows = document.querySelectorAll('#quotationTable tbody tr');
    const quotationContent = [];

    rows.forEach((row, index) => {
        const description = row.querySelector('.description').value.trim();
        const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
        const price = parseFloat(row.querySelector('.price').value) || 0;

        if (description && quantity && price) {
            quotationContent.push({ index: index + 1, description, quantity, price });
        }
    });

    const overallTotal = quotationContent.reduce((total, item) => total + item.quantity * item.price, 0);
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const tax = parseFloat(document.getElementById('tax').value) || 0;

    let discountedTotal = overallTotal - (overallTotal * (discount / 100));
    let finalTotal = discountedTotal + (discountedTotal * (tax / 100));
    const currencySymbol = document.getElementById('currency').value || '₹';  // Default to ₹ if no currency is entered
    const tableHtml = `
        <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${quotationContent.map(item => `
                    <tr>
                        <td align="center">${item.index}</td>
                        <td>${item.description}</td>
                        <td align="center">${item.quantity}</td>
                        <td align="right">${currencySymbol}${item.price.toFixed(2)}</td>
                    </tr>
                `).join('')}
                <tr>
                    <td colspan="3" align="right"><b>Subtotal</b></td>
                    <td align="right">${currencySymbol} ${overallTotal.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3" align="right"><b>Discount (${discount}%)</b></td>
                    <td align="right">-${currencySymbol} ${(overallTotal * (discount / 100)).toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="3" align="right"><b>Tax (${tax}%)</b></td>
                    <td align="right">+ ${currencySymbol} ${((overallTotal - (overallTotal * (discount / 100))) * (tax / 100)).toFixed(2)}</td>
                </tr>
                <tr style="background:#1968B2;">
                    <td colspan="3" align="right"><b>Total ${typeOfBill}</b></td>
                    <td align="right"><b>${currencySymbol}${finalTotal.toFixed(2)}</b></td>
                </tr>
            </tbody>
        </table>
    `;

    const printableHtml = `
        <html>
        <head>
            <title>${typeOfdoc} - ${clientName}</title>
                <link rel="stylesheet" href="https://akshr.in/quotation/style.css">

            <style>
                body { font-family: 'Montserrat', sans-serif; padding: 20px; }
 
                .contact { display: flex; justify-content: space-between; }
                .information { width: 45%; }
                h2 { margin-bottom: 5px; }
                table { width: 100%; margin-top: 20px; border-collapse: collapse; }
                th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                    p{font-weight: 300;}
                /* Footer */
                .footer {
                    text-align: center;
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #000;
                    font-size: 14px;
                }
                .footer p { margin: 5px 0; }

                /* Hide print button */
                @media print {
                    .print-btn { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${typeOfdoc}</h1>
           
                <p>629 Shakti Nagar Jabalpur MP - 482001 <br>Phone: +91 6263799043 <br> Email: akshrcompany@gmail.com</p>
            </div>

            <div class="contact">
                <div class="information">
                    <h2>Billed To</h2> 
                    <p>Date: ${date}</p>
                    <p>${clientName}</p>
                    <p>${clientOrganization}</p>
                    <p>${clientAddress}</p>
                    <p><b> GST:</b> ${document.getElementById('clientGST').value.trim()}</p>
                </div>

                <div class="information">
                    <h2>Our Details</h2>
                    <p><b>GST No:</b> 23ACHFA5534A1Z0</p>
                    <p><b>Bank Name:</b> ICICI Bank</p>
                    <p><b>Account No:</b> 019805010117</p>
                    <p><b>IFSC:</b> ICIC0000198</p>
                    <p><b>UPI:</b> akshr.6263799043.ibz@icici</p>
                </div>
            </div>

            ${tableHtml}

            <!-- Footer Section -->
            <div class="footer">
              
                <p><b>"Delivering Excellence, Every Time!"</b></p>
            </div>

            <br>
            <button class="print-btn" onclick="window.print()">Print</button>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printableHtml);
    printWindow.document.close();
    printWindow.print();
}
