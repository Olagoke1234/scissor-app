import React from "react";
import QRCode from "qrcode.react";

interface Props {
  url: string;
}

const QRCodeGenerator: React.FC<Props> = ({ url }) => {
  return (
    <div className="QRCodeGenerator">
      <h2>Generated QR Code</h2>
      <br></br>
      <div className="qr-code">
        {url ? <QRCode value={url} size={200} /> : <p>No URL provided.</p>}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
