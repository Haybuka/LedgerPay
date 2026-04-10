import { useRef } from 'react';


export const useViewShotShare = () => {
  const ref = useRef<any>(null);

  const captureAndShare = async () => {
    try {
      const uri = await ref.current?.capture?.();

      if (!uri) throw new Error('Capture failed');
      return uri
    } catch (error) {
      console.log(error, 'error share')
    }
  };

  return { ref, captureAndShare };
};