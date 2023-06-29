import React, { useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export function Modal({ children, open, onClose }: ModalProps) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        open ? "visible" : "invisible"
      }`}
    >
      <div className="bg-neutral-950 rounded-lg p-3">
        <button
          className="absolute top-3 right-3 text-2xl text-neutral-500 hover:text-red-600"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
