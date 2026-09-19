import Svg, { ClipPath, Defs, Ellipse, G, Path, Polyline } from 'react-native-svg';
import { cores } from '../tema';

// Mesmo desenho de assets/marca.svg (a fonte do ícone do app): um balão de fala rindo.
const BALAO =
  'M32 14 H68 A22 22 0 0 1 90 36 V52 A22 22 0 0 1 68 74 H58 L36 92 L44 74 H32 A22 22 0 0 1 10 52 V36 A22 22 0 0 1 32 14 Z';
const BOCA = 'M32 48 H68 C68 60 61 65 50 65 C39 65 32 60 32 48 Z';

export function Marca({ tamanho = 40 }: { tamanho?: number }) {
  return (
    <Svg width={tamanho} height={tamanho} viewBox="6 10 92 92" accessible={false}>
      <Defs>
        <ClipPath id="boca">
          <Path d={BOCA} />
        </ClipPath>
      </Defs>
      <Path
        d={BALAO}
        transform="translate(5 6)"
        fill={cores.tinta}
        stroke={cores.tinta}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <Path
        d={BALAO}
        fill={cores.amarelo}
        stroke={cores.tinta}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <G fill="none" stroke={cores.tinta} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
        <Polyline points="30,29 41,36 30,43" />
        <Polyline points="70,29 59,36 70,43" />
      </G>
      <Path d={BOCA} fill={cores.tinta} stroke={cores.tinta} strokeWidth={2} strokeLinejoin="round" />
      <Ellipse cx={50} cy={63} rx={9} ry={4.5} fill="#FF6F91" clipPath="url(#boca)" />
    </Svg>
  );
}
