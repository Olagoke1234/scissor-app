// src/components/QRCodeGenerator.tsx
import React from "react";
import QRCode from "qrcode.react";
import "../styles/styles.css";

interface Props {
  url: string;
}

const QRCodeGenerator: React.FC<Props> = ({ url }) => {
  if (!url) return <p>Please provide a URL to generate a QR code.</p>;

  return (
    <div className="QRCodeGenerator">
      <h2>QR Code Generator</h2>
      <QRCode value={url} />
    </div>
  );
};

export default QRCodeGenerator;
