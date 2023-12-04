import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss'; // Your styles here

function Modal({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal if the click is outside
    }
  };

  useEffect(() => {
    // Add when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Remove when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className={`z-20 flex right-0 bottom-0 translate-y-20 translate-x-11 px-4 py-3 h-20 border-solid border-foreground border-2 rounded-md bg-background absolute`}>
      <div className={`flex flex-col`} ref={modalRef}>
        <p className="font-bold h-full flex">Clear cart and return to homepage?</p>
        <div className="text-sm font-bold h-full flex gap-1 items-end justify-around">
          <button className="text-foreground py-0.5 border-amazon-yellow border border-solid bg-amazon-yellow rounded-md w-full hover:border-transparent hover:text-white" onClick={onConfirm}>Yes</button>
          <button className="text-foreground hover:text-white py-0.5 border border-solid border-foreground rounded-md w-full" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
