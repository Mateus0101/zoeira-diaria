import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';
import { cores, raios } from '../tema';

type Props = {
  onPress: () => void;
  children: ReactNode;
  cor?: string;
  rotuloAcessivel?: string;
  desabilitado?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PROFUNDIDADE = 5;

// Botão em estilo adesivo: ao apertar, a face afunda até encostar na sombra.
export function Botao({
  onPress,
  children,
  cor = cores.papel,
  rotuloAcessivel,
  desabilitado = false,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={rotuloAcessivel}
      accessibilityState={{ disabled: desabilitado }}
      style={[{ paddingRight: PROFUNDIDADE, paddingBottom: PROFUNDIDADE }, style]}
    >
      {({ pressed }) => (
        <View>
          <View
            style={{
              position: 'absolute',
              top: PROFUNDIDADE,
              left: PROFUNDIDADE,
              right: -PROFUNDIDADE,
              bottom: -PROFUNDIDADE,
              backgroundColor: cores.tinta,
              borderRadius: raios.pilula,
            }}
          />
          <View
            style={{
              minHeight: 56,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              backgroundColor: cor,
              borderColor: cores.tinta,
              borderWidth: 3,
              borderRadius: raios.pilula,
              opacity: desabilitado ? 0.6 : 1,
              transform: pressed ? [{ translateX: PROFUNDIDADE }, { translateY: PROFUNDIDADE }] : [],
            }}
          >
            {children}
          </View>
        </View>
      )}
    </Pressable>
  );
}
