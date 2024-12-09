const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AaxI1jVQ4DsNRrhXkXubnVvuTwfTnc1OYrA4T4h9wFs3Y81cu3wqv5EkyLc8ShW3uzsiAV8bH60r80W5",
  client_secret: "EPq4xH0-pSBSo5naxnaYY6d0H28d_rLiF5F1yzpzF416ma3s_90J5Ut58gYHb-ASTgMLLTxxTTthaS2L",
});

module.exports = paypal;
