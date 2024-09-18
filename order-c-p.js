const cart = JSON.parse(localStorage.getItem('cart')) || [];
const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

document.getElementById('order-summary').innerHTML = `
  ${cart.map((item) => `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
`;

// document.getElementById('total').innerHTML = `Total: $${total.toFixed(2)}`;
document.getElementById('total').innerHTML = '<b><u>Total: '+formatPricing(total, null)+'</u></b>';

// Payment details
const paymentMethod = 'Credit Card';
const paymentStatus = 'Paid';
const transactionId = '1234567890';

document.getElementById('payment-method').innerHTML = `Payment Method: ${paymentMethod}`;
document.getElementById('payment-status').innerHTML = `Payment Status: ${paymentStatus}`;
document.getElementById('transaction-id').innerHTML = `Transaction ID: ${transactionId}`;

// Shipping information
const shippingCarrier = 'USPS';
const trackingNumber = '1234567890';
const estimatedDeliveryDate = '3-5 Business days';

document.getElementById('shipping-carrier').innerHTML = `Shipping Carrier: ${shippingCarrier}`;
document.getElementById('tracking-number').innerHTML = `Tracking Number: ${trackingNumber}`;
document.getElementById('estimated-delivery-date').innerHTML = `Estimated Delivery Date: ${estimatedDeliveryDate}`;

// Customer information
const customerName = 'Ohanz @ Ihype';
const customerEmail = 'hypercoderd@gmail.com';
const customerPhone = '+234-90-6678-7690';

document.getElementById('customer-name').innerHTML = `Name: ${customerName}`;
document.getElementById('customer-email').innerHTML = `Email: ${customerEmail}`;
document.getElementById('customer-phone').innerHTML = `Phone: ${customerPhone}`;
