const { Schema, model, Types } = require("mongoose");

const WalletSchema = new Schema(
  {
    balance: {
      type: Number,
      required: [true, "Please provide wallet balance"],
    },
    currency: {
      type: String,
      enum: ["USD", "NGN"],
      default: "USD",
    },
    account: {
      type: Types.ObjectId,
      ref: "Account",
      required: [true, "Please provide an account"],
    },
  },
  { timestamps: true }
);

WalletSchema.pre("save", async function (next) {
  if (this.balance < 0 && this.currency === "USD") {
    return next({
      statusCode: 404,
      message: "Balance in wallet cannot be less than zero",
    });
  }
});

module.exports = model("Wallets", WalletSchema);
