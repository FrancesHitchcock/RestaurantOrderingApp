# Restaurant Ordering App Solo Project - Scrimba Module 5: Essential Javascript Concepts 

## About the Project

The goal of the project was to build a restaurant ordering app following a Figma design spec, and with the following four stages:

- Three menu items are rendered using JavaScript (data.js file provided by Scrimba). 
- When a user clicks on an add button an order section appears at the bottom of the menu. The order section should show items added, with price, the option to remove each item, a total price and a 'Complete order' button.
- On clicking the 'Complete order' button a payment modal should be presented. The payment modal should consist of a form element with three input elements for name, card number and CVV, and a 'Pay' button. The input fields are all compulsory.
- On clicking the 'Pay' button the order section is replaced with a message which includes the user's name.

The index.html, index.css and index.js were all built from scratch to fulfil the above requirements. In addition a stretch goal to add a meal deal function was undertaken by giving the user a 10% discount on the next pizza with every full-price pizza ordered.

While building the app I realised that having the order section at the bottom of the menu was not an ideal user experience, because of the need to keep scrolling up and down to see the order. So I introduced the position attribute with the 'sticky' value to position the order section at the bottom of the screen whilst ensuring all the menu items are still visible on scrolling. This facility meant that I had to adapt the Figma design by removing some of the horizontal white space between items.

I also added the functionality to clear the payment form and the order section on submission of payment, so a new order can be made immediately without refreshing the window.

The project was completed independently and without assistance. All images were imported from the Figma file.

Frances Hitchcock 04/11/22
