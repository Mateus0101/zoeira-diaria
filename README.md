# Zoeira Diária

App mobile que mostra frases de humor brasileiro, do tipo "Mais perdido que cego em tiroteio". A ideia é simples: abrir o app, rir um pouco e, se quiser, mandar a frase pra alguém.

O projeto também serve de exemplo prático para uma apostila que ensina, passo a passo, a criar e publicar o primeiro app.

## O que o app faz

- Tem três categorias, escolhidas nos botões do topo: **Zoeira**, **Insulto sutil** e **Desmotivacional**.
- Mostra a **frase do dia** da categoria escolhida. A mesma data sempre devolve a mesma frase, então todo mundo vê a mesma.
- O botão de sorteio (**Outra zoeira**, **Outro insulto** ou **Outra desmotivação**, conforme a categoria) mostra outra frase da categoria, sem repetir a que já está na tela.
- O botão **Compartilhar** abre o menu de compartilhamento do celular com a frase pronta.

Não há login, servidor nem internet: as frases ficam dentro do próprio app.

## Tecnologias

- [React Native](https://reactnative.dev) com [Expo](https://expo.dev)
- TypeScript

## Como rodar

Você precisa do [Node.js](https://nodejs.org) (versão LTS) e do app **Expo Go** no celular (Android ou iOS).

```bash
npm install
npm start
```

O `npm start` mostra um QR code no terminal. Abra o Expo Go e escaneie o código para ver o app no celular. O celular e o computador precisam estar na mesma rede wi-fi.

Também existem `npm run android` e `npm run ios`, que abrem o app em um emulador, se você tiver um configurado. O modo web (`npm run web`) ainda não está configurado neste projeto.

## Estrutura

```
zoeira-diaria/
├── App.tsx                       tela principal do app
├── src/
│   ├── frases.ts                 categorias, sorteio e frase do dia
│   └── data/
│       ├── zoeira.json           frases da categoria Zoeira
│       ├── insultos.json         frases da categoria Insulto sutil
│       └── desmotivacionais.json frases da categoria Desmotivacional
├── assets/                       ícones e imagem de abertura
├── app.json                      configurações do Expo (nome, ícone, etc.)
└── THIRD_PARTY_NOTICES.md        créditos e licença de frases de terceiros
```

## Como adicionar frases

Cada categoria tem o seu arquivo em `src/data/`. Cada frase é um objeto com um `id` e um `texto`:

```json
{ "id": 47, "texto": "Sua frase nova aqui." }
```

Regras para não quebrar nada:

- O `id` precisa ser **único dentro do arquivo**. O sorteio usa o id para não repetir a frase que está na tela, então dois ids iguais fazem frases sumirem do sorteio.
- Use o próximo número livre depois do maior id do arquivo.
- Evite frases repetidas.

Cada frase nova muda a conta da frase do dia, então a frase de uma mesma data pode mudar depois que você adiciona frases à lista.

Para criar uma categoria nova, crie um arquivo JSON em `src/data/` no mesmo formato e acrescente uma entrada na lista `categorias` de `src/frases.ts`, com o `nome` que aparece no seletor e o texto do botão de sorteio (`botao`). O seletor da tela mostra a nova categoria sozinho.

## Verificar o código

```bash
npx tsc --noEmit
```

Esse comando confere os tipos do TypeScript sem gerar arquivos.

## Créditos

As categorias **Insulto sutil** e **Desmotivacional** usam frases do projeto [frases-aleatorias](https://github.com/timeuz/frases-aleatorias), de timeuz, distribuído sob a licença MIT. O aviso de copyright e o texto da licença estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
