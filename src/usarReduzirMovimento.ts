import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

// Quem ativou "reduzir movimento" no celular não vê as animações do app.
export function usarReduzirMovimento() {
  const [reduzir, setReduzir] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduzir);
    const assinatura = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduzir);
    return () => assinatura.remove();
  }, []);

  return reduzir;
}
