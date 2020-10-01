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
  'Regular',
  'Bold',
  'Italic',
  'BoldItalic',
]

const boldItalicRegular = [
  'Regular',
  'Bold',
  'Italic',
]

const boldRegular = [
  'Regular',
  'Bold',
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
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42
]

export const textAligns = [
  {
    title: 'Left',
    iconName: 'format-align-left',
    action: 'left'
  },
  {
    title: 'Center',
    iconName: 'format-align-center',
    action: 'center'
  },
  {
    title: 'Right',
    iconName: 'format-align-right',
    action: 'right'
  },
  {
    title: 'Justify',
    iconName: 'format-align-justify',
    action: 'justify'
  },
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