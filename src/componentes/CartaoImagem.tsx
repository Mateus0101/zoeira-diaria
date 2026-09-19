import { forwardRef } from 'react';
import { Text, View } from 'react-native';
import { cores, fontes } from '../tema';
import { Marca } from './Marca';
import { Placa } from './Placa';

type Props = {
  texto: string;
  cor: string;
  largura: number;
};

// Cartão 4:5 que vira a imagem compartilhada. Tudo é medido em "u" (1u = 1/360 da largura),
// então o mesmo desenho serve para a prévia pequena e para a imagem final grande.
export const CartaoImagem = forwardRef<View, Props>(function CartaoImagem(
  { texto, cor, largura },
  ref,
) {
  const u = largura / 360;

  return (
    <View
      ref={ref}
      collapsable={false}
      style={{
        width: largura,
        height: largura * 1.25,
        backgroundColor: cores.azul,
        padding: 28 * u,
        gap: 18 * u,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 * u }}>
        <Marca tamanho={40 * u} />
        <Text
          allowFontScaling={false}
          style={{ fontFamily: fontes.forte, fontSize: 22 * u, color: cores.papel }}
        >
          Zoeira Diária
        </Text>
      </View>
      <Placa texto={texto} cor={cor} escala={u} animar={false} style={{ flex: 1 }} />
    </View>
  );
});
