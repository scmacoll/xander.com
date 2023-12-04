import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

function Modal({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) {
  // Specify the type of the ref as HTMLDivElement
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Close the modal if the click is outside
    }
  };

  useEffect(() => {
    // Attach the click listener
    document.addEventListener('mousedown', handleClickOutside);

    // Attach the resize listener
    const handleResize = () => {
      onClose(); // Close the modal on window resize
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [onClose]); // Add onClose to the dependency array

  if (!isOpen) {
    return null;
  }

  return (
      <div
        className={`absolute z-20 flex xs:right-0 sm:right-0 md:left-0 lg:left-0 xl:left-0 bottom-0 xs:translate-y-20 sm:translate-y-20 xs:translate-x-11 sm:translate-x-11 px-4 py-3 h-20 border-solid
          border-foreground border rounded-md bg-background
          xs:before:-top-2 xs:before:left-1/2 xs:before:-translate-x-1/2 xs:before:border-l-transparent
          xs:before:border-r-transparent xs:before:border-b-gray-300
          xs:before:border-t-transparent xs:before:border-l-8 xs:before:border-r-8 xs:before:border-b-8
          xs:before:border-solid xs:before:content-[''] xs:before:absolute
          sm:before:-top-2 sm:before:left-1/2 sm:before:-translate-x-1/2 sm:before:border-l-transparent
          sm:before:border-r-transparent sm:before:border-b-gray-300
          sm:before:border-t-transparent sm:before:border-l-8 sm:before:border-r-8 sm:before:border-b-8
          sm:before:border-solid sm:before:content-[''] sm:before:absolute
          `}
      >
        <div className={`flex flex-col`} ref={modalRef}>
          <p className="font-bold h-full flex">Clear cart and return to homepage?</p>
          <div className="text-sm font-bold h-full flex gap-1 items-end justify-around">
            <button
              className="text-foreground py-0.5 border-amazon-yellow border border-solid bg-amazon-yellow rounded-md w-full hover:border-transparent hover:text-white"
              onClick={onConfirm}>Yes
            </button>
            <button
              className="text-foreground hover:text-white py-0.5 border border-solid border-foreground rounded-md w-full hover:border-gray-500"
              onClick={onClose}>No
            </button>
          </div>
        </div>
      </div>
  );
}

export default Modal;
