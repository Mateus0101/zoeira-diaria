import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { fraseAleatoria, fraseDoDia } from './src/frases';

export default function App() {
  const [frase, setFrase] = useState(fraseDoDia);
  const [ehDoDia, setEhDoDia] = useState(true);

  function sortear() {
    setFrase(fraseAleatoria(frase.id));
    setEhDoDia(false);
  }

  function compartilhar() {
    Share.share({ message: `"${frase.texto}" — Zoeira Diária` });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Zoeira Diária</Text>

      <View style={styles.cartao}>
        <Text style={styles.etiqueta}>{ehDoDia ? 'Frase do dia' : 'Zoeira aleatória'}</Text>
        <Text style={styles.frase}>{frase.texto}</Text>
      </View>

      <Pressable style={[styles.botao, styles.botaoPrincipal]} onPress={sortear}>
        <Text style={styles.textoBotaoPrincipal}>Outra zoeira</Text>
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
  cartao: {
    width: '100%',
    maxWidth: 480,
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
