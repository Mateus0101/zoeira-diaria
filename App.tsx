import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { categorias, fraseAleatoria, fraseDoDia } from './src/frases';
import type { Categoria } from './src/frases';

export default function App() {
  const [categoria, setCategoria] = useState<Categoria>(categorias[0]);
  const [frase, setFrase] = useState(() => fraseDoDia(categorias[0]));
  const [ehDoDia, setEhDoDia] = useState(true);

  function escolherCategoria(nova: Categoria) {
    setCategoria(nova);
    setFrase(fraseDoDia(nova));
    setEhDoDia(true);
  }

  function sortear() {
    setFrase(fraseAleatoria(categoria, frase.id));
    setEhDoDia(false);
  }

  function compartilhar() {
    Share.share({ message: `"${frase.texto}" — Zoeira Diária` });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Zoeira Diária</Text>

      <View style={styles.categorias}>
        {categorias.map((c) => {
          const ativa = c.id === categoria.id;
          return (
            <Pressable
              key={c.id}
              style={[styles.chip, ativa && styles.chipAtivo]}
              onPress={() => escolherCategoria(c)}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
            >
              <Text style={[styles.textoChip, ativa && styles.textoChipAtivo]}>{c.nome}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.etiqueta}>{ehDoDia ? 'Frase do dia' : 'Frase aleatória'}</Text>
        <Text style={styles.frase}>{frase.texto}</Text>
      </View>

      <Pressable style={[styles.botao, styles.botaoPrincipal]} onPress={sortear}>
        <Text style={styles.textoBotaoPrincipal}>{categoria.botao}</Text>
      </Pressable>
      <Pressable style={[styles.botao, styles.botaoSecundario]} onPress={compartilhar}>
        <Text style={styles.textoBotaoSecundario}>Compartilhar</Text>
      </Pressable>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4CC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3B2A00',
    marginBottom: 8,
  },
  categorias: {
    width: '100%',
    maxWidth: 480,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#3B2A00',
  },
  chipAtivo: {
    backgroundColor: '#3B2A00',
  },
  textoChip: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3B2A00',
  },
  textoChipAtivo: {
    color: '#FFF4CC',
  },
  cartao: {
    width: '100%',
    maxWidth: 480,
    minHeight: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#B07A00',
  },
  frase: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: '#222',
  },
  botao: {
    width: '100%',
    maxWidth: 480,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  botaoPrincipal: {
    backgroundColor: '#3B2A00',
  },
  botaoSecundario: {
    borderWidth: 2,
    borderColor: '#3B2A00',
  },
  textoBotaoPrincipal: {
    color: '#FFF4CC',
    fontSize: 17,
    fontWeight: '700',
  },
  textoBotaoSecundario: {
    color: '#3B2A00',
    fontSize: 17,
    fontWeight: '700',
  },
});
