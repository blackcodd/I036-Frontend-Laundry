
/*
 * Copyright (c) 2026 Srabon Das
 * All Rights Reserved.
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../../context/store";
import { formatPrice } from "../../utils/helpers";
import { generateOrderId } from "../../utils/helpers";
import Swal from "sweetalert2";
import { Lock, CreditCard, Wallet } from "lucide-react";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 50;
  const total = subtotal + deliveryCharge;

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (paymentMethod === "online") {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        Swal.fire({
          title: "Error!",
          text: "Please fill all card details",
          icon: "error",
          confirmButtonColor: "#06B6D4",
        });
        return;
      }
    }

    // Simulate payment processing
    Swal.fire({
      title: "Processing Payment...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    setTimeout(() => {
      Swal.fire({
        title: "Payment Successful! ✓",
        html: `<p>Order ID: <strong>${generateOrderId()}</strong></p><p>Amount: <strong>${formatPrice(total)}</strong></p>`,
        icon: "success",
        confirmButtonColor: "#06B6D4",
      }).then(() => {
        clearCart();
        navigate("/customer/orders");
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-dark-bg pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Payment 💳</h1>
          <p className="text-dark-muted">Secure checkout</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <div className="card mb-6">
              {/* Payment Method Selection */}
              <h2 className="text-white font-bold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                {[
                  { value: "online", label: "💳 Credit/Debit Card", icon: CreditCard },
                  { value: "cod", label: "🚚 Cash on Delivery", icon: Wallet },
                ].map((method) => (
                  <label
                    key={method.value}
                    className="flex items-center p-4 border border-dark-lighter/30 rounded-lg cursor-pointer hover:border-primary/50 transition"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 text-white font-semibold">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Card Form */}
              {paymentMethod === "online" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 pt-6 border-t border-dark-lighter/20"
                >
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-dark-text text-sm font-medium mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={cardData.name}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-dark-text text-sm font-medium mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardData.number}
                      onChange={handleCardChange}
                      placeholder="4532 1234 5678 9010"
                      maxLength="19"
                      className="w-full"
                    />
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-dark-text text-sm font-medium mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardData.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-dark-text text-sm font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        maxLength="3"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Security Info */}
                  <div className="flex items-center gap-2 text-primary text-sm mt-4">
                    <Lock size={16} />
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </motion.div>
              )}

              {/* COD Info */}
              {paymentMethod === "cod" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400"
                >
                  <p>✓ Pay when your order arrives</p>
                  <p className="text-sm mt-2">You'll pay the delivery person in cash</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card sticky top-24 h-fit"
          >
            <h2 className="text-white font-bold text-lg mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-dark-lighter/20 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-dark-muted">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-white font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-dark-muted">Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-muted">Delivery</span>
                <span className="text-white">{formatPrice(deliveryCharge)}</span>
              </div>
            </div>

            <div className="border-t border-dark-lighter/20 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-white font-bold">Total</span>
                <span className="text-primary font-bold text-xl">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full btn-primary font-semibold"
            >
              Complete Payment
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 btn-secondary"
            >
              Back to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
