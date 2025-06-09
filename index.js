import { BakongKHQR, khqrData, MerchantInfo } from "bakong-khqr";
import qrcode from "qrcode";

const optionalData = {
  currency: khqrData.currency.khr,
  // amount: 10,
  expirationTimestamp: Date.now() + (60 * 60 * 1000), // 10 minutes
  billNumber: "TRX123456",
  mobileNumber: "85560644533",
  storeLabel: "KORN CHANREY",
  terminalLabel: "POS1",
  merchantCategoryCode: "5411"
};

const merchantInfo = new MerchantInfo(
  "korn_chanrey@wing",
  "KORN CHANREY",
  "PHNOM PENH",
  "85560644533",
  "ACLBKHPP",
  optionalData
);

const khqr = new BakongKHQR();
const response = khqr.generateMerchant(merchantInfo);

if (!response || !response.data || !response.data.qr) {
  console.error("❌ Failed to generate KHQR string. Check your data.");
  process.exit(1);
}

console.log("✅ KHQR String:", response.data.qr);
console.log("✅ MD5 Hash:", response.data.md5);

// Validate QR
const isValid = BakongKHQR.verify(response.data.qr);
console.log("✅ Is valid QR:", isValid.isValid);

qrcode.toString(response.data.qr, { type: "terminal" }, function (err, url) {
    if (err) return console.error(err);
    console.log(url);
  });
