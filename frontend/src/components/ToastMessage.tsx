import React, { useEffect } from "react";

function ToastMessage({
  message,
  success,
  visible,
  onClose,
}: {
  message: string;
  success: boolean;
  visible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);
  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container top-0 end-0 p-3">
          <div
            className={`toast fade text-white ${
              success ? "bg-success" : "bg-danger"
            } ${visible ? "show" : ""}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-body">{message}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToastMessage;
