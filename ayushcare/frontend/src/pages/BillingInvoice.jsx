import React from "react";
import "./BillingInvoice.css";

export default function BillingInvoice() {
  return (
    <div className="invoice-wrapper">
      {/* Left Green Branding Column */}
      <aside className="invoice-side">

      {/* SEARCH BAR INSIDE SIDEBAR */}
      <div className="invoice-search">
        <input
          type="text"
          placeholder="Search invoice..."
          className="invoice-search-input"
        />
      </div>
       {/* --------------- */}
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

      {/* Right main invoice */}
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

        {/* Invoice Items Table */}
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
            <tr>
              <td>Panchakarma Detox Package</td>
              <td>01</td>
              <td>₹12,000</td>
              <td>₹12,000</td>
            </tr>
            <tr>
              <td>Abhyanga + Shirodhara Combo</td>
              <td>02</td>
              <td>₹2,200</td>
              <td>₹4,400</td>
            </tr>
            <tr>
              <td>Herbal Oils & Medication Kit</td>
              <td>01</td>
              <td>₹1,200</td>
              <td>₹1,200</td>
            </tr>
          </tbody>
        </table>

        {/* Summary total */}
        <div className="summary-box">
          <p>Subtotal: <span>₹17,600</span></p>
          <p>Discount: <span>₹600</span></p>
          <p>Grand Total: <strong>₹17,000</strong></p>
        </div>

        <div className="paid-stamp">PAID</div>
        <button className="download-btn">Download PDF</button>
      </main>
    </div>
  );
}
