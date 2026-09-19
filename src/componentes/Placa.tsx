import { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Animated, Text, View } from 'react-native';
import { cores, fontes, raios } from '../tema';
import { usarReduzirMovimento } from '../usarReduzirMovimento';

type Props = {
  texto: string;
  cor: string;
  doDia?: boolean;
  // 1 = tamanho da tela. O cartão de imagem usa outro valor para reaproveitar a placa.
  escala?: number;
  animar?: boolean;
  // Muda a cada frase nova e dispara a animação.
  chave?: string;
  style?: StyleProp<ViewStyle>;
};

// Frase curta ganha letra grande; frase longa, letra menor, para sempre caber na placa.
function tamanhoDaFrase(letras: number) {
  if (letras <= 32) return { fontSize: 44, lineHeight: 47 };
  if (letras <= 56) return { fontSize: 37, lineHeight: 40 };
  if (letras <= 76) return { fontSize: 31, lineHeight: 34 };
  return { fontSize: 27, lineHeight: 30 };
}

export function Placa({ texto, cor, doDia = false, escala = 1, animar = true, chave, style }: Props) {
  const u = escala;
  const sombra = 8 * u;
  const pulo = useRef(new Animated.Value(1)).current;
  const reduzirMovimento = usarReduzirMovimento();
  const { fontSize, lineHeight } = tamanhoDaFrase(texto.length);

  // A placa "bate" quando chega uma frase nova: mostra que algo mudou.
  useEffect(() => {
    if (!animar || reduzirMovimento) return;
    pulo.setValue(0.9);
    Animated.spring(pulo, { toValue: 1, friction: 4, tension: 150, useNativeDriver: true }).start();
  }, [chave, animar, reduzirMovimento, pulo]);

  const giro = animar
    ? pulo.interpolate({ inputRange: [0.9, 1], outputRange: ['-5deg', '-1.5deg'] })
    : '-1.5deg';

  return (
    <View style={[{ justifyContent: 'center' }, style]}>
      <Animated.View
        style={{ flex: 1, maxHeight: 420 * u, transform: [{ rotate: giro }, { scale: pulo }] }}
      >
        <View
          style={{
            position: 'absolute',
            top: sombra,
            left: sombra,
            right: 0,
            bottom: 0,
            backgroundColor: cores.tinta,
            borderRadius: raios.superficie * u,
          }}
        />
        <View
          style={{
            flex: 1,
            marginRight: sombra,
            marginBottom: sombra,
            backgroundColor: cor,
            borderColor: cores.tinta,
            borderWidth: 3 * u,
            borderRadius: raios.superficie * u,
            padding: 22 * u,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ height: 38 * u, overflow: 'hidden' }}>
            <Text
              accessibilityElementsHidden
              importantForAccessibility="no"
              allowFontScaling={false}
              style={{
                fontFamily: fontes.forte,
                fontSize: 80 * u,
                lineHeight: 80 * u,
                color: cores.tinta,
                includeFontPadding: false,
              }}
            >
              {'“'}
            </Text>
          </View>
          <Text
            accessibilityLiveRegion="polite"
            allowFontScaling={u === 1}
            maxFontSizeMultiplier={1.15}
            style={{
              fontFamily: fontes.forte,
              fontSize: fontSize * u,
              lineHeight: lineHeight * u,
              letterSpacing: -0.4 * u,
              color: cores.tinta,
            }}
          >
            {texto}
          </Text>
        </View>

        {doDia && (
          <View
            style={{
              position: 'absolute',
              top: -14 * u,
              right: sombra + 14 * u,
              backgroundColor: cores.papel,
              borderColor: cores.tinta,
              borderWidth: 2.5 * u,
              borderRadius: raios.pilula,
              paddingVertical: 5 * u,
              paddingHorizontal: 12 * u,
              transform: [{ rotate: '6deg' }],
            }}
          >
            <Text
              allowFontScaling={false}
              style={{ fontFamily: fontes.forte, fontSize: 14 * u, color: cores.tinta }}
            >
              Frase do dia
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}
