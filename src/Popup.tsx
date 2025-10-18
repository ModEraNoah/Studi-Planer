import {
  type RefObject,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
} from "react";

interface PopupRef {
  setPopup: Dispatch<SetStateAction<boolean>>;
  element?: any;
}

export function Popup({ setPopup, element }: PopupRef) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-expect-error due to never type of current
      if (ref.current && !ref.current.contains(event.target)) {
        setPopup(false); // Close popup if clicked outside
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute text-center right-0 left-0 m-auto z-100 top-1/7 bg-gray-400 w-120 h-80 px-10 rounded-xl"
    >
      {element}
    </div>
  );
}
