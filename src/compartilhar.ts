import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import { Share } from 'react-native';
import { captureRef } from 'react-native-view-shot';

// Texto que sai na cópia e no compartilhamento: a frase entre aspas e o nome do app.
function legenda(texto: string) {
  return `“${texto}”\n\nZoeira Diária`;
}

export async function copiarTexto(texto: string) {
  await Clipboard.setStringAsync(legenda(texto));
}

export async function compartilharTexto(texto: string) {
  await Share.share({ message: legenda(texto) });
}

export const ERRO_SEM_COMPARTILHAMENTO = 'sem-compartilhamento';

// Tira uma "foto" do cartão que está na tela (1080 x 1350, formato 4:5) e abre o menu de compartilhar.
export async function compartilharImagem(cartao: RefObject<View | null>) {
  if (!(await Sharing.isAvailableAsync())) throw new Error(ERRO_SEM_COMPARTILHAMENTO);

  const arquivo = await captureRef(cartao, {
    format: 'png',
    quality: 1,
    result: 'tmpfile',
    width: 1080,
    height: 1350,
  });

  await Sharing.shareAsync(arquivo, {
    mimeType: 'image/png',
    UTI: 'public.png',
    dialogTitle: 'Compartilhar frase',
  });
}
