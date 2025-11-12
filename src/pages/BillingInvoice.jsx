import React, { useMemo, useState } from "react";
import { FaSearch, FaFilePdf } from "react-icons/fa";
import "./BillingInvoice.css";

/**
 * Billing & Invoices page for a single logged-in user.
 *
 * - Two tabs: Paid Invoices (default) and Unpaid Invoices
 * - Search box filters by Invoice ID or Service Name
 * - Example dummy rows in both tables
 * - Download / Export button (UI-only)
 * - Pagination controls (non-functional UI)
 *
 * This component is self-contained and styled in BillingInvoices.css
 */
export default function BillingInvoices() {
  // which tab is active: "paid" or "unpaid"
  const [activeTab, setActiveTab] = useState("paid");

  // search term state
  const [search, setSearch] = useState("");

  // dummy data for paid invoices
  const paidInvoices = [
    {
      id: "INV-1001",
      service: "Panchakarma Full Package",
      amount: 12000,
      paymentDate: "2024-10-05",
      status: "Paid",
    },
    {
      id: "INV-1002",
      service: "Abhyanga Oil Therapy",
      amount: 3500,
      paymentDate: "2024-11-11",
      status: "Paid",
    },
    {
      id: "INV-1003",
      service: "Virechana Cleansing",
      amount: 8000,
      paymentDate: "2024-12-20",
      status: "Paid",
    },
    {
      id: "INV-1004",
      service: "Shirodhara Session",
      amount: 2500,
      paymentDate: "2025-01-07",
      status: "Paid",
    },
  ];

  // dummy data for unpaid invoices
  const unpaidInvoices = [
    {
      id: "INV-2001",
      service: "Dietary Consultation",
      amountDue: 1200,
      dueDate: "2025-05-10",
      status: "Unpaid",
    },
    {
      id: "INV-2002",
      service: "Follow-up Panchakarma",
      amountDue: 6000,
      dueDate: "2025-05-20",
      status: "Unpaid",
    },
    {
      id: "INV-2003",
      service: "Herbal Medicines",
      amountDue: 1800,
      dueDate: "2025-06-01",
      status: "Unpaid",
    },
    {
      id: "INV-2004",
      service: "Steam Therapy",
      amountDue: 900,
      dueDate: "2025-06-10",
      status: "Unpaid",
    },
  ];

  // filter helper (memoized for small perf gain)
  const filteredPaid = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return paidInvoices;
    return paidInvoices.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
    );
  }, [search, paidInvoices]);

  const filteredUnpaid = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return unpaidInvoices;
    return unpaidInvoices.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.service.toLowerCase().includes(q)
    );
  }, [search, unpaidInvoices]);

  return (
    <div className="billing-root">
      {/* Page header */}
      <div className="billing-header">
        <div>
          <h1>Billing &amp; Invoices</h1>
          <p className="muted">Track your payments and pending invoices easily.</p>
        </div>

        <div className="header-actions">
          {/* Search box */}
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by Invoice ID or Service Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Export button */}
          <button className="btn-export" title="Export as PDF (UI only)">
            <FaFilePdf className="pdf-icon" />
            <span className="export-text">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "paid" ? "active" : ""}`}
          onClick={() => setActiveTab("paid")}
        >
          Paid Invoices
        </button>
        <button
          className={`tab ${activeTab === "unpaid" ? "active" : ""}`}
          onClick={() => setActiveTab("unpaid")}
        >
          Unpaid Invoices
        </button>
      </div>

      {/* Table area */}
      <div className="table-card">
        {activeTab === "paid" ? (
          <>
            <table className="invoices-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Service Name</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaid.length === 0 ? (
                  <tr className="empty-row"><td colSpan="5">No paid invoices found.</td></tr>
                ) : (
                  filteredPaid.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "alt" : ""}>
                      <td>{row.id}</td>
                      <td>{row.service}</td>
                      <td>₹{row.amount.toLocaleString()}</td>
                      <td>{row.paymentDate}</td>
                      <td>
                        <span className="status paid">Paid</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <table className="invoices-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Service Name</th>
                  <th>Amount Due</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnpaid.length === 0 ? (
                  <tr className="empty-row"><td colSpan="6">No unpaid invoices found.</td></tr>
                ) : (
                  filteredUnpaid.map((row, idx) => (
                    <tr key={row.id} className={idx % 2 === 0 ? "alt" : ""}>
                      <td>{row.id}</td>
                      <td>{row.service}</td>
                      <td>₹{row.amountDue.toLocaleString()}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <span className="status unpaid">Unpaid</span>
                      </td>
                      <td>
                        <button className="btn-pay">Pay Now</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

        {/* Pagination UI (non-functional) */}
        <div className="pagination">
          <button className="page-btn">Previous</button>
          <div className="page-info">Page 1 of 1</div>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}