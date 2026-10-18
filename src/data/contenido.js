// Contenido de la landing page separado de los componentes.
// Los componentes recorren estos arreglos con .map() para generar el JSX.

export const SESIONES = [
  {
    numero: 1,
    icono: 'bi-filetype-html',
    titulo: 'HTML5 semántico',
    descripcion:
      'Estructura páginas accesibles con etiquetas semánticas y crea formularios con validación nativa del navegador.',
    temas: ['Etiquetas semánticas', 'Formularios', 'Accesibilidad'],
  },
  {
    numero: 2,
    icono: 'bi-bootstrap',
    titulo: 'CSS3 y Bootstrap',
    descripcion:
      'Da estilo con Flexbox y Grid, y arma interfaces responsivas con el sistema de columnas y los componentes de Bootstrap.',
    temas: ['Grid', 'Flexbox', 'Responsive'],
  },
  {
    numero: 3,
    icono: 'bi-filetype-js',
    titulo: 'JavaScript y el DOM',
    descripcion:
      'Responde a los eventos del usuario, valida datos mientras se escriben y muestra mensajes en tiempo real.',
    temas: ['Eventos', 'Validaciones', 'DOM'],
  },
  {
    numero: 4,
    icono: 'bi-diagram-3',
    titulo: 'React con componentes',
    descripcion:
      'Divide la interfaz en componentes funcionales, comparte datos con props y controla el estado con useState.',
    temas: ['JSX', 'Props', 'useState'],
  },
]

export const PERFILES = [
  { valor: 'estudiante', etiqueta: 'Estudiante' },
  { valor: 'docente', etiqueta: 'Docente' },
  { valor: 'otro', etiqueta: 'Otro' },
]
