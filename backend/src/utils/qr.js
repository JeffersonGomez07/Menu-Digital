import QRCode from "qrcode";
import path from "path";
import fs from "fs";

export const generateQR = async (menuUrl, slug) => {
  const qrDir = path.resolve("src/public/qr"); // misma carpeta que sirves con Express

  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  const filePath = path.join(qrDir, `${slug}.png`);

  await QRCode.toFile(filePath, menuUrl, {
    width: 300,
    margin: 2,
  });

  return {
    qrUrl: menuUrl,
    imagePath: `/qr/${slug}.png`, // ruta que ya coincide con tu express.static
  };
};
