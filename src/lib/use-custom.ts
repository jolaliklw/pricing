import { useEffect } from 'react';

function useShowToast(
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;
    if (show) {
      timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setShow(false);
      }, 1500);
    }

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);
}

export { useShowToast };
