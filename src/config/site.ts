/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  CONFIGURACIÓN CENTRAL DEL SITIO — src/config/site.ts        ║
 * ║                                                               ║
 * ║  ► Este es el ÚNICO archivo que debes editar para            ║
 * ║    reutilizar el proyecto en un negocio diferente.           ║
 * ║                                                               ║
 * ║  Ejemplo: pasar de "Mudanzas en Barcelona"                   ║
 * ║           a "Vaciado de pisos y locales en Terrassa":                          ║
 * ║                                                               ║
 * ║    businessName  → 'Vaciados Terrassa Pro'                  ║
 * ║    serviceType   → 'limpieza'                                ║
 * ║    area          → 'Terrassa y comarca'                      ║
 * ║    mainCity      → 'Terrassa'                                ║
 * ║    phone         → '+34 633 75 96 49'                         ║
 * ║    email         → 'seoexpertsslu@gmail.com'               ║
 * ║    web           → 'https://vaciadosterrassa.netlify.app'            ║
 * ║    whatsapp      → '+34 633 75 96 49'  (sin + ni espacios)        ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

export const siteConfig = {

  // ── Identidad del negocio ─────────────────────────────────────
  /** Nombre comercial: aparece en header, footer, <title> y schemas */
  businessName: 'Vaciados Terrassa Pro',
  /** Nombre legal completo: pie de página y copyright */
  businessNameLegal: 'Vaciados Terrassa Pro',
  /** CIF / NIF */
  cif: 'B12345678',
  /** Logo (ruta desde /public) */
  logo: '/logo.png',

  // ── Lo que identifica a ESTE sitio ───────────────────────────
  /**
   * Tipo de servicio en minúsculas y singular/plural natural.
   * Ejemplos: 'mudanzas', 'limpieza', 'electricidad', 'fontanería'
   * Se usa en H1, meta descriptions y textos dinámicos.
   */
  serviceType: 'servicios profesionales',
  /**
   * Zona geográfica principal del negocio.
   * Ejemplos: 'Barcelona', 'Terrassa y comarca', 'Terrassa y alrededores'
   * Se usa en H1, subtítulos y descripciones.
   */
  area: 'toda Terrassa',
  /** Ciudad principal para seleccionar el teléfono primario del hero */
  mainCity: 'Terrassa',

  // ── Contacto ─────────────────────────────────────────────────
  phone: '+34 633 75 96 49',
  email: 'seoexpertsslu@gmail.com',
  /** Número de WhatsApp sin espacios ni +  (ej: '34600000000') */
  whatsapp: '34633759649',
  /** URL completa del sitio, sin barra final */
  web: 'https://vaciadosterrassa.netlify.app',

  // ── Horario ───────────────────────────────────────────────────
  /** Formato schema.org para JSON-LD */
  horario: 'Mo-Fr 09:00-18:00',
  /** Texto legible para humanos */
  horarioTexto: 'Lunes a Viernes, 9:00–18:00',
  /** Días de apertura para openingHoursSpecification */
  horarioDias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as string[],
  /** Hora de apertura HH:MM */
  horarioAbre: '09:00',
  /** Hora de cierre HH:MM */
  horarioCierra: '18:00',

  // ── SEO ───────────────────────────────────────────────────────
  /**
   * Descripción base del negocio (usada en meta description de inicio
   * y en el schema LocalBusiness).
   */
  description: 'Especialistas en servicios profesionales de vaciado de pisos y locales en toda Terrassa. Presupuesto gratuito y garantía por escrito.',

  /**
   * Rango de precios para schema.org LocalBusiness.
   * Valores: '€', '€€', '€€€', '€€€€'
   */
  priceRange: '€€',

  /**
   * Valoración media del negocio (para schema.org aggregateRating).
   * Actualiza reviewCount con el número real de reseñas.
   * Pon null para no incluir aggregateRating en el schema.
   */
  aggregateRating: {
    ratingValue: 4.9,
    reviewCount: 127,
    bestRating: 5,
  },

  // ── Redes sociales (dejar vacío '' para no mostrar) ───────────
  social: {
    facebook:  '',
    instagram: '',
    linkedin:  '',
  },

} as const;

/** Tipo inferido automáticamente del objeto siteConfig */
export type SiteConfig = typeof siteConfig;
