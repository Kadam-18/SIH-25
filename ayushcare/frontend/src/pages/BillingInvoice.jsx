import React, { useState } from "react";
import "./BillingInvoice.css";

export default function BillingInvoice() {
  // STATUS CAN BE "Paid" or "Unpaid"
  const [invoiceStatus, setInvoiceStatus] = useState("Unpaid");

  const therapies = [
    { name: "Panchakarma Detox Package", qty: 1, price: 12000, total: 12000 },
    { name: "Abhyanga + Shirodhara Combo", qty: 2, price: 2200, total: 4400 },
    { name: "Herbal Oils & Medication Kit", qty: 1, price: 1200, total: 1200 },
    { name: "Virechana Cleansing", qty: 1, price: 6000, total: 6000 },
    { name: "Nasya (Nasal Therapy)", qty: 1, price: 1500, total: 1500 },
  ];

  return (
    <div className="invoice-wrapper">
      <aside className="invoice-side">
        <h2 className="invoice-heading-vertical">INVOICE</h2>

        <div className="brand-box">
          <h3>Your Logo</h3>
          <p>AyushCare Wellness Center</p>
        </div>

        <div className="details-side">
          <p><strong>Invoice No:</strong> INV-1001</p>
          <p><strong>Date:</strong> Feb 21, 2025</p>
          <p><strong>Account:</strong> #28910</p>
        </div>

        <div className="terms-box">
          <h4>Terms & Conditions</h4>
          <p>Payment is due within 7 working days.</p>
          <p>No refund after therapy has begun.</p>
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="invoice-main">
        <header className="invoice-top">
          <div>
            <h2>Invoice To</h2>
            <p><strong>MAHI SHARMA</strong></p>
            <p>+91 98765 43210</p>
            <p>Jabalpur, India</p>
          </div>

          <div>
            <h2>Invoice From</h2>
            <p><strong>AyushCare Hospital</strong></p>
            <p>+91 88444 66231</p>
            <p>Wellness Street, Bhopal</p>
          </div>
        </header>

        {/* TABLE */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ITEM DESCRIPTION</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {therapies.map((t, index) => (
              <tr key={index}>
                <td>{t.name}</td>
                <td>{t.qty}</td>
                <td>₹{t.price.toLocaleString()}</td>
                <td>₹{t.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* SUMMARY */}
        <div className="summary-box">
          <p>Subtotal: <span>₹17,600</span></p>
          <p>Discount: <span>₹600</span></p>
          <p>Grand Total: <strong>₹17,000</strong></p>
        </div>

        {/* PAYMENT LOGIC BUTTON */}
        <div className="payment-actions">
          {invoiceStatus === "Paid" ? (
            <button className="paid-stamp">PAID</button>
          ) : (
            <>
              <button className="unpaid-stamp">UNPAID</button>
              <button className="pay-now-btn" onClick={() => setInvoiceStatus("Paid")}>Pay Now</button>
            </>
          )}
        </div>

        <button className="download-btn">Download PDF</button>
      </main>
    </div>
  );
}