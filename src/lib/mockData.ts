export const mockData = {
  empresas: [
    { id: '1', nombre: 'Fortress Investment', logo: 'F', color: 'bg-[#0f2027]' },
    { id: '2', nombre: 'Proyectos Crescendo', logo: 'C', color: 'bg-[#D4AF37]' }
  ],
  identidad: {
    '1': {
      base: {
        queEs: 'Agencia de consultoría y aceleración de negocios de inversión.',
        nicho: 'Inversionistas, empresas, y fondos de inversión.',
        propuesta: 'Estructuración y optimización de portafolios de inversión.',
        tono: 'Directo, profesional, de alta autoridad.'
      },
      personas: [
        { id: 'p1', nombre: 'El Inversionista Conservador', edad: '45-65', problema: 'Bajos rendimientos en portafolio actual.', deseo: 'Seguridad y rentabilidad consistente.', objecion: 'Riesgo y falta de liquidez.' }
      ]
    },
    '2': {
      base: {
        queEs: 'Desarrolladora de proyectos inmobiliarios boutique.',
        nicho: 'Familias e inversionistas en bienes raíces.',
        propuesta: 'Espacios de vida exclusivos con alta valorización.',
        tono: 'Inspirador, cálido, exclusivo.'
      },
      personas: [
        { id: 'p2', nombre: 'La Familia Creciente', edad: '30-45', problema: 'Falta de espacio, buscan mejor calidad de vida.', deseo: 'Un hogar seguro, amplio y bien ubicado.', objecion: 'Precio total y tiempos de entrega.' }
      ]
    }
  },
  proyectos: [
    { id: 'proj1', empresaId: '1', nombre: 'Fondo de Estructuración Alfa', estado: 'En curso', ticket: '>$500M COP', fechaCierre: '2024-11-30', responsable: 'Johan' },
    { id: 'proj2', empresaId: '1', nombre: 'Consultoría Estructural High Ticket', estado: 'Activo', ticket: '$50M COP', fechaCierre: 'Continuo', responsable: 'Ana' },
    { id: 'proj3', empresaId: '2', nombre: 'Proyecto Reserva Verde', estado: 'Planificación', ticket: '$350M COP', fechaCierre: '2025-12-15', responsable: 'Carlos' }
  ],
  estrategia: [
    {
      id: 'camp1', proyectoId: 'proj1', nombre: 'Fondo Alfa - Institucional', objetivo: 'Conversión',
      conjuntos: [
        { id: 'adset1', nombre: 'Público Inversionista', 
          anuncios: [
            { id: 'ad1', nombre: 'AD1 - Seguridad Financiera', formato: 'Reel', metodologia: 'PAS', contenido: 'Educativo', cpl: '$15.50' },
            { id: 'ad2', nombre: 'AD2 - Historial de Retornos', formato: 'Carrusel', metodologia: 'Storytelling', contenido: 'Autoridad', cpl: '$18.80' }
          ]
        }
      ]
    }
  ],
  planner: [
    { id: 'plan1', proyecto: 'Fondo Alfa', contenido: 'AD1 - Seguridad...', formato: 'Reel', grabacion: '2024-10-25', publicacion: '2024-11-01', responsable: 'Equipo Video', estado: 'Por grabar' },
    { id: 'plan2', proyecto: 'Fondo Alfa', contenido: 'AD2 - Historial', formato: 'Carrusel', grabacion: 'N/A', publicacion: '2024-11-03', responsable: 'Diseño', estado: 'En edición' }
  ],
  metricasGenerales: {
    leads: 1450,
    cplPromedio: '$2.15',
    roi: '350%',
    inversion: '$3,100'
  }
};
