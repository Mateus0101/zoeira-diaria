import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Modal, Pressable, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ERRO_SEM_COMPARTILHAMENTO,
  compartilharImagem,
  compartilharTexto,
  copiarTexto,
} from '../compartilhar';
import { cores, fontes, raios } from '../tema';
import { usarReduzirMovimento } from '../usarReduzirMovimento';
import { Botao } from './Botao';
import { CartaoImagem } from './CartaoImagem';

type Props = {
  visivel: boolean;
  aoFechar: () => void;
  texto: string;
  cor: string;
};

type Modo = 'menu' | 'imagem';
type NomeIcone = React.ComponentProps<typeof Ionicons>['name'];

type OpcaoProps = {
  icone: NomeIcone;
  titulo: string;
  detalhe: string;
  cor: string;
  aoPressionar: () => void;
};

function Opcao({ icone, titulo, detalhe, cor, aoPressionar }: OpcaoProps) {
  return (
    <Pressable
      onPress={aoPressionar}
      accessibilityRole="button"
      accessibilityLabel={`${titulo}. ${detalhe}`}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingVertical: 10,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: raios.pilula,
          backgroundColor: cor,
          borderWidth: 2.5,
          borderColor: cores.tinta,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={icone} size={24} color={cores.tinta} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: fontes.forte, fontSize: 18, color: cores.tinta }}>{titulo}</Text>
        <Text style={{ fontFamily: fontes.normal, fontSize: 14, color: cores.tinta, opacity: 0.72 }}>
          {detalhe}
        </Text>
      </View>
    </Pressable>
  );
}

export function FolhaCompartilhar({ visivel, aoFechar, texto, cor }: Props) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const reduzirMovimento = usarReduzirMovimento();
  const [modo, setModo] = useState<Modo>('menu');
  const [copiado, setCopiado] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const cartao = useRef<View>(null);
  const subida = useRef(new Animated.Value(0)).current;
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A cada abertura a folha volta ao menu e sobe da borda de baixo.
  useEffect(() => {
    if (!visivel) return;
    setModo('menu');
    setCopiado(false);
    setOcupado(false);
    setErro(null);
    if (reduzirMovimento) return;
    subida.setValue(320);
    Animated.spring(subida, { toValue: 0, friction: 9, tension: 70, useNativeDriver: true }).start();
  }, [visivel, reduzirMovimento, subida]);

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  async function copiar() {
    await copiarTexto(texto);
    setCopiado(true);
    temporizador.current = setTimeout(aoFechar, 900);
  }

  function enviarTexto() {
    aoFechar();
    // Espera a folha sumir antes de abrir o menu do sistema (no iPhone os dois brigam).
    temporizador.current = setTimeout(() => compartilharTexto(texto), 350);
  }

  async function enviarImagem() {
    setErro(null);
    setOcupado(true);
    try {
      await compartilharImagem(cartao);
      aoFechar();
    } catch (e) {
      const semSuporte = e instanceof Error && e.message === ERRO_SEM_COMPARTILHAMENTO;
      setErro(
        semSuporte
          ? 'Este aparelho não permite compartilhar imagens.'
          : 'Não foi possível criar a imagem. Tente de novo.',
      );
    } finally {
      setOcupado(false);
    }
  }

  const larguraCartao = Math.min(width - 112, 280);

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={aoFechar}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <Pressable
        accessibilityLabel="Fechar"
        onPress={aoFechar}
        style={{ flex: 1, backgroundColor: 'rgba(23, 23, 28, 0.6)' }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          transform: [{ translateY: subida }],
          backgroundColor: cores.papel,
          borderTopLeftRadius: raios.superficie,
          borderTopRightRadius: raios.superficie,
          borderTopWidth: 3,
          borderColor: cores.tinta,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View
          style={{
            alignSelf: 'center',
            width: 40,
            height: 5,
            borderRadius: raios.pilula,
            backgroundColor: cores.tinta,
            opacity: 0.25,
            marginBottom: 16,
          }}
        />

        {modo === 'menu' ? (
          <>
            <Text
              accessibilityRole="header"
              style={{ fontFamily: fontes.forte, fontSize: 26, color: cores.tinta, marginBottom: 8 }}
            >
              Compartilhar
            </Text>
            <Opcao
              icone={copiado ? 'checkmark' : 'copy'}
              titulo={copiado ? 'Copiado' : 'Copiar texto'}
              detalhe={copiado ? 'Agora é só colar' : 'Cola a frase em qualquer conversa'}
              cor={cor}
              aoPressionar={copiar}
            />
            <Opcao
              icone="chatbubble-ellipses"
              titulo="Enviar como texto"
              detalhe="Abre o menu de compartilhar do celular"
              cor={cor}
              aoPressionar={enviarTexto}
            />
            <Opcao
              icone="image"
              titulo="Enviar como imagem"
              detalhe="Um cartão com a frase e o nome do app"
              cor={cor}
              aoPressionar={() => setModo('imagem')}
            />
          </>
        ) : (
          <>
            <Text
              accessibilityRole="header"
              style={{ fontFamily: fontes.forte, fontSize: 26, color: cores.tinta, marginBottom: 16 }}
            >
              Assim vai a imagem
            </Text>
            <View style={{ alignSelf: 'center', borderRadius: 4, overflow: 'hidden' }}>
              <CartaoImagem ref={cartao} texto={texto} cor={cor} largura={larguraCartao} />
            </View>
            {erro && (
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 14 }}>
                <Ionicons name="alert-circle" size={20} color={cores.tinta} />
                <Text style={{ flex: 1, fontFamily: fontes.media, fontSize: 14, color: cores.tinta }}>
                  {erro}
                </Text>
              </View>
            )}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <Botao
                onPress={() => setModo('menu')}
                desabilitado={ocupado}
                rotuloAcessivel="Voltar"
                style={{ flex: 1 }}
              >
                <Text style={{ fontFamily: fontes.forte, fontSize: 17, color: cores.tinta }}>
                  Voltar
                </Text>
              </Botao>
              <Botao
                onPress={enviarImagem}
                desabilitado={ocupado}
                cor={cor}
                style={{ flex: 1.6 }}
              >
                <Text style={{ fontFamily: fontes.forte, fontSize: 17, color: cores.tinta }}>
                  {ocupado ? 'Preparando' : 'Enviar imagem'}
                </Text>
              </Botao>
            </View>
          </>
        )}
      </Animated.View>
    </Modal>
  );
}
