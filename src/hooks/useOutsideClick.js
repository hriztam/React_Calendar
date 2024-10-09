import { useEffect, useRef } from "react";

const useOutsideClick = (onClose) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose(); // Call the function to close the modal
      }
    };

    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return ref; // Return the ref to be used on the modal container
};

export default useOutsideClick;
