import { Pressable, Text, View } from 'react-native';
import { categorias } from '../frases';
import type { Categoria } from '../frases';
import { cores, fontes, raios } from '../tema';

type Props = {
  ativa: Categoria;
  aoEscolher: (categoria: Categoria) => void;
};

// A categoria ativa ganha a cor da própria placa, então o botão e a frase combinam.
export function Categorias({ ativa, aoEscolher }: Props) {
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
      {categorias.map((categoria) => {
        const selecionada = categoria.id === ativa.id;
        return (
          <Pressable
            key={categoria.id}
            onPress={() => aoEscolher(categoria)}
            accessibilityRole="tab"
            accessibilityState={{ selected: selecionada }}
            style={{
              minHeight: 44,
              paddingHorizontal: 10,
              justifyContent: 'center',
              borderRadius: raios.pilula,
              borderWidth: 2.5,
              borderColor: selecionada ? cores.tinta : 'rgba(255, 249, 236, 0.55)',
              backgroundColor: selecionada ? categoria.cor : 'transparent',
            }}
          >
            <Text
              style={{
                fontFamily: fontes.media,
                fontSize: 14,
                color: selecionada ? cores.tinta : cores.papel,
              }}
            >
              {categoria.nome}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
