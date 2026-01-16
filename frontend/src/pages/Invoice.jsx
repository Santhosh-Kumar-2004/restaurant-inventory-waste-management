import React, { useState } from "react";
import { generateInvoice } from "../services/orderService";
import "../styles/Invoice.css";
import Navbar from "../components/Navbar";

function Invoice() {
  const orderId = localStorage.getItem("current_order_id");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");

  if (!orderId) {
    return (
      <div className="invoice-empty">
        <div className="icon">📄</div>
        <p>No active order found. Please create an order first.</p>
        <button className="primary-link-btn" onClick={() => window.location.href='/orders/create'}>
          Go to Orders
        </button>
      </div>
    );
  }

  const handleGenerateInvoice = async () => {
    try {
      const data = await generateInvoice(orderId);
      setInvoice(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="invoice-page-container">
        <Navbar />
      <div className="invoice-actions">
        <h2>Checkout & Billing</h2>
        {!invoice && (
          <button className="generate-btn" onClick={handleGenerateInvoice}>
            Generate Final Bill
          </button>
        )}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {invoice && (
        <div className="invoice-document">
          <div className="receipt-header">
            <h3>KITCHENPRO RESTAURANT</h3>
            <p>Order Summary & Tax Invoice</p>
          </div>

          <div className="receipt-info">
            <span><strong>Order ID:</strong> #{invoice.order_id}</span>
            <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{invoice.subtotal}</span>
            </div>
            <div className="total-row">
              <span>GST ({invoice.gst_rate}%)</span>
              <span>₹{invoice.gst_amount}</span>
            </div>
            <div className="receipt-divider"></div>
            <div className="total-row grand-total">
              <span>Grand Total</span>
              <span>₹{invoice.total_amount}</span>
            </div>
          </div>

          <div className="receipt-footer">
            <p>Thank you for dining with us!</p>
            <div className="qr-placeholder">[ QR Code for Payment ]</div>
          </div>
          
          <button className="print-btn" onClick={() => window.print()}>
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
}

export default Invoice;