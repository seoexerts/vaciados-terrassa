/**
 * Adaptador de compatibilidad.
 * Re-exporta los datos de src/config/site.ts con la forma que
 * espera el resto del código (EMPRESA).
 *
 * NO edites este archivo. Edita src/config/site.ts.
 */
import { siteConfig } from '../config/site';

export const EMPRESA = {
  nombre:       siteConfig.businessName,
  nombreLegal:  siteConfig.businessNameLegal,
  cif:          siteConfig.cif,
  logo:         siteConfig.logo,
  horario:      siteConfig.horario,
  horarioTexto: siteConfig.horarioTexto,
  web:          siteConfig.web,
  descripcion:  siteConfig.description,
  whatsapp:     siteConfig.whatsapp,
  social:       siteConfig.social,
} as const;
