import React from "react";
import QRCode from "qrcode.react";
import { saveAs } from "file-saver"; // Ensure you install file-saver via npm

interface Props {
  url: string;
}

const QRCodeGenerator: React.FC<Props> = ({ url }) => {
  const handleDownload = () => {
    const canvas = document.getElementById("qrcode") as HTMLCanvasElement;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "qrcode.png");
        }
      });
    }
  };

  return (
    <div className="QRCodeGenerator">
      <h2>Generated QR Code</h2>
      <br />
      <br />
      <div className="qr-code">
        {url ? (
          <>
            <QRCode id="qrcode" value={url} size={200} />
            <br />
            <br />
            <button onClick={handleDownload} className="URL-button">
              Download QR Code
            </button>
          </>
        ) : (
          <p>No URL provided.</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
