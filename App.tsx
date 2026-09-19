import { Ionicons } from '@expo/vector-icons';
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/bricolage-grotesque';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Botao } from './src/componentes/Botao';
import { Categorias } from './src/componentes/Categorias';
import { FolhaCompartilhar } from './src/componentes/FolhaCompartilhar';
import { Marca } from './src/componentes/Marca';
import { Placa } from './src/componentes/Placa';
import { categorias, fraseAleatoria, fraseDoDia } from './src/frases';
import type { Categoria } from './src/frases';
import { cores, fontes } from './src/tema';

function Tela() {
  const insets = useSafeAreaInsets();
  // Em telas estreitas o ícone do dado sai do botão, para o nome da categoria caber inteiro.
  const { width: larguraDaTela } = useWindowDimensions();
  const [categoria, setCategoria] = useState<Categoria>(categorias[0]);
  const [frase, setFrase] = useState(() => fraseDoDia(categorias[0]));
  const [ehDoDia, setEhDoDia] = useState(true);
  const [folhaAberta, setFolhaAberta] = useState(false);

  function escolherCategoria(nova: Categoria) {
    setCategoria(nova);
    setFrase(fraseDoDia(nova));
    setEhDoDia(true);
  }

  function sortear() {
    setFrase(fraseAleatoria(categoria, frase.id));
    setEhDoDia(false);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: cores.azul,
        paddingHorizontal: 20,
        paddingTop: insets.top + 12,
        paddingBottom: Math.max(insets.bottom, 16) + 8,
        gap: 20,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Marca tamanho={40} />
        <Text
          accessibilityRole="header"
          style={{ fontFamily: fontes.forte, fontSize: 24, color: cores.papel }}
        >
          Zoeira Diária
        </Text>
      </View>

      <Categorias ativa={categoria} aoEscolher={escolherCategoria} />

      <Placa
        texto={frase.texto}
        cor={categoria.cor}
        doDia={ehDoDia}
        chave={`${categoria.id}-${frase.id}`}
        style={{ flex: 1 }}
      />

      <View style={{ flexDirection: 'row', gap: 14 }}>
        <Botao onPress={sortear} style={{ flex: 1 }}>
          {larguraDaTela >= 380 && <Ionicons name="dice" size={22} color={cores.tinta} />}
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.8}
            style={{ flexShrink: 1, fontFamily: fontes.forte, fontSize: 16, color: cores.tinta }}
          >
            {categoria.botao}
          </Text>
        </Botao>
        <Botao
          onPress={() => setFolhaAberta(true)}
          cor={categoria.cor}
          rotuloAcessivel="Compartilhar frase"
          style={{ width: 66 }}
        >
          <Ionicons name="share-social" size={26} color={cores.tinta} />
        </Botao>
      </View>

      <FolhaCompartilhar
        visivel={folhaAberta}
        aoFechar={() => setFolhaAberta(false)}
        texto={frase.texto}
        cor={categoria.cor}
      />
      <StatusBar style="light" />
    </View>
  );
}

export default function App() {
  const [fontesProntas] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_800ExtraBold,
  });

  // Enquanto a fonte carrega, mostra só o azul do app, para não piscar com a fonte errada.
  if (!fontesProntas) return <View style={{ flex: 1, backgroundColor: cores.azul }} />;

  return (
    <SafeAreaProvider>
      <Tela />
    </SafeAreaProvider>
  );
}
