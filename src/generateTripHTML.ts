import { ProcessedTripData } from './processTripData';

export const generateTripHTML = (tripData: ProcessedTripData): string => {
  const { bookingDetails, travelerInfo, flights, notes, priceDetails, generationDate } = tripData;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Travel Document - ${bookingDetails.reservationId}</title>
    <style>
      @page {
        size: A4;
        margin-top: 15mm;
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #333333;
        background-color: #ffffff;
        font-size: 11px;
      }
      .page {
        width: 210mm;
        min-height: 267mm; /* 297mm - 30mm for top and bottom margins */
        padding: 0 20mm 15mm 20mm; /* No top padding, handled by @page margin */
        box-sizing: border-box;
        position: relative;
        background-color: #ffffff;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .logo-container {
        display: flex;
        align-items: center;
      }
      .logo-image {
        height: 40px;
        width: auto;
        margin-right: 10px;
        margin-bottom: 2px;
      }
      .logo-text {
        font-size: 28px;
        font-weight: bold;
        color: #2a3352;
        letter-spacing: -0.5px;
      }
      .document-title {
        text-align: right;
      }
      .title-text {
        font-size: 24px;
        font-weight: 600;
        color: #333333;
      }
      .subtitle {
        font-size: 12px;
        color: #666666;
        text-align: right;
        margin-top: 3px;
      }
      .horizontal-line {
        height: 2px;
        background: #2a3352;
        margin-bottom: 15px;
        border-radius: 1px;
      }

      .client-banner {
        background-color: #f8f9fa !important;
        border-left: 10px solid #2a3352;
        padding: 12px 15px;
        margin-bottom: 20px;
        border-radius: 10px;
      }
      .client-name {
        font-size: 18px;
        font-weight: 600;
        color: #2a3352;
        margin-bottom: 2px;
      }
      .booking-reference {
        font-size: 12px;
        color: #555;
      }

      h2 {
        font-size: 16px;
        color: #ffffff;
        background: #2a3352 !important;
        padding: 8px 15px;
        margin-top: 25px;
        margin-bottom: 15px;
        border-radius: 8px;
      }
      
      .section-container {
        margin-bottom: 25px;
      }
      .info-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .info-row {
        display: flex;
        margin-bottom: 8px;
      }
      .info-label {
        width: 140px;
        font-weight: 600;
        color: #555555;
      }
      .info-value {
        flex: 1;
      }
      
      .flight-card {
        border: 1px solid #e8e8ed;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
      }
      .flight-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        border-bottom: 1px solid #e8e8ed;
        padding-bottom: 10px;
      }
      .flight-title {
        font-weight: 600;
        font-size: 14px;
        color: #2a3352;
      }
      .flight-number {
        font-weight: 600;
        color: #ffffff;
        background: #2a3352 !important;
        padding: 4px 8px;
        border-radius: 6px;
        white-space: nowrap;
      }
      .flight-grid {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
      }
      .airport-code {
        font-size: 28px;
        font-weight: 700;
        color: #333;
        margin-bottom: 3px;
        letter-spacing: -0.5px;
      }
      .airport-info {
        color: #555555;
        margin-bottom: 3px;
      }
      .date-time {
        font-weight: 600;
        margin-bottom: 3px;
      }
      .connection {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 120px;
      }
      .connection-line {
        height: 2px;
        width: 100%;
        background: #2a3352;
        position: relative;
      }
      .connection-line:after {
        content: '';
        position: absolute;
        right: -4px;
        top: -4px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 8px solid #2a3352;
      }
      .duration {
        font-size: 11px;
        text-align: center;
        margin-top: 5px;
        background-color: #f8f9fa !important;
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: 500;
      }
      .flight-details {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        margin-top: 15px;
        border-top: 1px solid #e8e8ed;
        padding-top: 10px;
      }
      .detail-item {
        display: flex;
        flex-direction: column;
      }
      .detail-label {
        font-size: 10px;
        color: #8e8e93;
        margin-bottom: 2px;
      }
      .detail-value {
        font-weight: 500;
      }
      
      .seat-number {
        background-color: #536182 !important;
        color: white !important;
        padding: 3px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        margin-left: 5px;
        display: inline-block;
      }
      
      .notes {
        background-color: #f6f7fb !important;
        border-left: 4px solid #2a3352;
        padding: 10px 15px;
        margin: 20px 0;
        border-radius: 8px;
      }
      .notes h3 {
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
      }
      .notes ul {
        margin: 0;
        padding-left: 20px;
      }
      .notes li {
        margin-bottom: 4px;
      }
      
      /* Pricing table */
      .pricing-section {
        margin-top: 20px;
      }
      .pricing-table-container {
        margin-top: 10px;
        margin-bottom: 20px;
      }
      .pricing-table {
        width: 100%;
        border-collapse: collapse;
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid #e8e8ed;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
                background-color: #ffffff;
      }
      .pricing-table th {
        background-color: #f8f9fa !important;
        padding: 8px;
        text-align: left;
        font-weight: 600;
        border-bottom: 1px solid #e8e8ed;
      }
      .pricing-table td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #e8e8ed;
      }
      .total-row {
        background-color: #f8f9fa !important;
      }
      .total-row td {
        font-weight: 600;
        color: #2a3352;
      }
      
      .divider {
        height: 2px;
        background: #2a3352;
        margin: 20px 0;
        border-radius: 1px;
      }
      
      .footer {
        margin-top: 20px;
        padding-top: 10px;
        border-top: 1px solid #e8e8ed;
        display: flex;
        justify-content: space-between;
      }
      .agent-info {
        font-size: 9px;
        color: #8e8e93;
        text-align: left;
      }
      .skyscapr-info {
        font-size: 9px;
        color: #8e8e93;
        text-align: right;
      }
      
      .page-break {
        page-break-before: always;
      }
      
      .page-break-inside-avoid {
        page-break-inside: avoid;
      }
      
      .flight-itinerary-section h2 {
        margin-bottom: 20px;
      }
      
      h2 {
        break-after: avoid;
      }
      
      div {
        break-before: auto;
      }
      
      @media print {
        html, body {
          width: 210mm;
          height: 297mm;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
        
        .page {
          margin: 0;
          padding: 0 20mm 15mm 20mm; /* No top padding */
          box-sizing: border-box;
          background-color: #ffffff;
        }
        
        .bg-colored, h2, .flight-number, .seat-number, 
        .client-banner, .notes, .pricing-table th, .total-row {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="header" style="margin-top: 15mm;">
        <div class="logo-container">
          <img src="https://www.skyscapr.com/assets/logo-DSkc4m2F.png" alt="Skyscapr" class="logo-image" />
          <span class="logo-text">Skyscapr</span>
        </div>
        <div class="document-title">
          <div class="title-text">TRAVEL DOCUMENT</div>
          <div class="subtitle">Issued on: ${bookingDetails.orderDate}</div>
        </div>
      </div>

      <div class="horizontal-line"></div>

      <div class="client-banner bg-colored">
        <div class="client-name">${travelerInfo.name}</div>
        <div class="booking-reference">Reservation: ${bookingDetails.reservationId} • ${bookingDetails.travelDate}</div>
      </div>

      <div class="section-container page-break-inside-avoid">
        <h2 class="bg-colored">Traveler Information</h2>
        <div class="info-grid">
          <div>
            <div class="info-row">
              <div class="info-label">Main Traveler:</div>
              <div class="info-value"><strong>${travelerInfo.name}</strong></div>
            </div>
            <div class="info-row">
              <div class="info-label">Date of Birth:</div>
              <div class="info-value">${travelerInfo.dateOfBirth}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Gender:</div>
              <div class="info-value">${travelerInfo.gender}</div>
            </div>
          </div>
          <div>
            <div class="info-row">
              <div class="info-label">Email:</div>
              <div class="info-value">${travelerInfo.email}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Phone:</div>
              <div class="info-value"><strong>${travelerInfo.phone.split(' ')[0]}</strong> ${travelerInfo.phone.split(' ')[1] || ''}</div>
            </div>
          </div>
        </div>

        <div class="info-row" style="margin-top: 5px">
          <div class="info-label">Home Address:</div>
          <div class="info-value">${travelerInfo.homeAddress}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Local Address:</div>
          <div class="info-value">${travelerInfo.localAddress}</div>
        </div>
      </div>

      <div class="section-container page-break-inside-avoid">
        <h2 class="bg-colored">Booking Details</h2>
        <div class="info-grid">
          <div>
            <div class="info-row">
              <div class="info-label">Trip Type:</div>
              <div class="info-value">${bookingDetails.tripType}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Travel Date:</div>
              <div class="info-value">${bookingDetails.travelDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Booking Service:</div>
              <div class="info-value">${bookingDetails.bookingService}</div>
            </div>
          </div>
          <div>
            <div class="info-row">
              <div class="info-label">Reservation ID:</div>
              <div class="info-value">${bookingDetails.reservationId}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Order Date:</div>
              <div class="info-value">${bookingDetails.orderDate}</div>
            </div>
            <div class="info-row">
              <div class="info-label">Ticket Status:</div>
              <div class="info-value">${bookingDetails.ticketStatus}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flight-itinerary-section">
        <h2 class="bg-colored">Flight Itinerary</h2>

        ${flights.map((flight, index) => `
        <div class="flight-card page-break-inside-avoid">
          <div class="flight-header">
            <div class="flight-title">Flight ${index + 1}: ${flight.departureCode} to ${flight.arrivalCode}</div>
            <div class="flight-number bg-colored">${flight.flightNumber}</div>
          </div>

          <div class="flight-grid">
            <div>
              <div class="airport-code">${flight.departureCode}</div>
              <div class="airport-info">${flight.departureAirport}${flight.departureTerminal ? `, Terminal ${flight.departureTerminal}` : ''}</div>
              <div class="date-time">${flight.departureTime}</div>
            </div>

            <div class="connection">
              <div class="connection-line"></div>
              <div class="duration bg-colored">${flight.duration}</div>
            </div>

            <div>
              <div class="airport-code">${flight.arrivalCode}</div>
              <div class="airport-info">${flight.arrivalAirport}${flight.arrivalTerminal ? `, Terminal ${flight.arrivalTerminal}` : ''}</div>
              <div class="date-time">${flight.arrivalTime}</div>
            </div>
          </div>

          <div class="flight-details">
            <div class="detail-item">
              <div class="detail-label">Airline</div>
              <div class="detail-value">${flight.airline}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Aircraft</div>
              <div class="detail-value">${flight.aircraft}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Class</div>
              <div class="detail-value">${flight.class} (${flight.fare})</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Seat</div>
              <div class="detail-value">${flight.seatNumber} <span class="seat-number bg-colored">${flight.seatType}</span></div>
            </div>
            <div class="detail-item">
              <div class="detail-label">CO2 Emissions</div>
              <div class="detail-value">${flight.co2} KG</div>
            </div>
          </div>
        </div>
        `).join('')}
      
        <div class="notes bg-colored page-break-inside-avoid">
          <h3>Important Notes</h3>
          <ul>
            <li><strong>Baggage Allowance:</strong> ${notes.baggageAllowance}</li>
            <li><strong>Ticket Deadline:</strong> ${notes.ticketDeadline}</li>
            <li><strong>Payment Method:</strong> ${notes.paymentMethod}</li>
          </ul>
        </div>
      </div>

      <div class="pricing-section page-break-inside-avoid">
        <h2 class="bg-colored">Pricing Details</h2>
        <div class="pricing-table-container">
          <table class="pricing-table">
            <tr>
              <th class="bg-colored">Description</th>
              <th class="bg-colored">Amount (${priceDetails.currency})</th>
            </tr>
            <tr>
              <td>Base Fare</td>
              <td>${priceDetails.baseFare}</td>
            </tr>
            <tr>
              <td>Taxes & Fees</td>
              <td>${priceDetails.taxesAndFees}</td>
            </tr>
            <tr>
              <td>Reservation Amount</td>
              <td>${priceDetails.reservationAmount}</td>
            </tr>
            <tr>
              <td>Reservation Commission</td>
              <td>${priceDetails.reservationCommission}</td>
            </tr>
            <tr class="total-row bg-colored">
              <td>Total Price</td>
              <td>${priceDetails.totalPrice}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="footer">
        <div class="agent-info">
          <p>
            <strong>Agent Information:</strong><br />
            Agent ID: AG-3721<br />
            Contact: support@skyscapr.com
          </p>
        </div>
        <div class="skyscapr-info">
          <p>
            This is an electronic travel document issued by Skyscapr.<br />
            Document generated on ${generationDate} • Reference: ${bookingDetails.reservationId}
          </p>
        </div>
      </div>
    </div>
    
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        try {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = '@media print { * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; } }';
          document.head.appendChild(style);
          
          window.addEventListener('beforeprint', function() {
            document.body.style.backgroundColor = '#ffffff';
            document.querySelectorAll('.page').forEach(page => {
              page.style.backgroundColor = '#ffffff';
            });
          });
        } catch (e) {
          console.error("Error setting up print styles:", e);
        }
      });
    </script>
  </body>
</html>`;
};

export default generateTripHTML;