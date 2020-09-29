export const fonts = [
  'Roboto',
  'Ranchers',
  'Kufam',
  'Grandstander',
  'Montserrat',
  'Merriweather',
  'Ubuntu',
  'Anton',
  'JosefinSans',
  'LibreBaskerville',
  'Lobster',
  'Cabin',
  'LongCang',
  'DancingScript',
  'Pacifico',
  'IndieFlower',
  'ShadowsIntoLight',
  'AbrilFatface',
  'KronaOne',
  'Righteous',
  'ArchitectsDaughter',
  'Acme',
  'FredokaOne'
]

const styles = [
  'Bold',
  'Italic',
  'Bold Italic',
  'Regular',
]

const boldItalicRegular = [
  'Bold',
  'Italic',
  'Regular',
]

const boldRegular = [
  'Bold',
  'Regular',
]

const regular = [
  'Regular',
]

export const sizes = [
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32
]


export function getStyles(fontName) {
  switch (fontName) {
    case 'Ranchers':
      return regular;
    case 'Anton':
      return regular;
    case 'LibreBaskerville':
      return boldItalicRegular;
    case 'Lobster':
      return regular;
    case 'LongCang':
      return regular;
    case 'DancingScript':
      return boldRegular;
    case 'Pacifico':
      return regular;
    case 'IndieFlower':
      return regular;
    case 'ShadowsIntoLight':
      return regular;
    case 'AbrilFatface':
      return regular;
    case 'KronaOne':
      return regular;
    case 'Righteous':
      return regular;
    case 'ArchitectsDaughter':
      return regular;
    case 'Acme':
      return regular;
    case 'FredokaOne':
      return regular;

    default:
      return styles;
  }
}