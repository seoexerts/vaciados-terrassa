/**
 * Punto de entrada único del sistema de datos.
 *
 * Para añadir una ciudad nueva:
 *   1. Crea src/data/ciudades/<slug>.json siguiendo la misma estructura.
 *   2. Importa el JSON aquí y añádelo al array rawCiudades.
 *
 * Para añadir un servicio nuevo:
 *   1. Añade la entrada en src/data/servicios.ts.
 *   2. Referencia el slug en serviciosActivos de cada ciudad que lo ofrezca.
 */

import { servicios as catalogoServicios } from './servicios';
import { EMPRESA } from './empresa';

// ── JSON de ciudades ──────────────────────────────────────────────────────────
import terrassaRaw      from './ciudades/terrassa.json';
import rubiRaw          from './ciudades/rubi.json';
import sabadellRaw      from './ciudades/sabadell.json';
import santQuirzeRaw    from './ciudades/sant-quirze.json';
import viladecavallsRaw from './ciudades/viladecavalls.json';
import matadeperaRaw    from './ciudades/matadepeera.json';
import ullastrellRaw    from './ciudades/ullastrell.json';
import castellbisbalRaw from './ciudades/castellbisbal.json';

const rawCiudades = [
  terrassaRaw, rubiRaw, sabadellRaw, santQuirzeRaw,
  viladecavallsRaw, matadeperaRaw, ullastrellRaw, castellbisbalRaw,
];
// ─────────────────────────────────────────────────────────────────────────────

// ── Tipos exportados ──────────────────────────────────────────────────────────
export type { FAQ, PasosProceso, ServicioBase } from './servicios';
export { EMPRESA } from './empresa';

export interface ServicioResuelto {
  slug: string;
  nombre: string;
  descripcionCorta: string;
  descripcionLarga: string;
  beneficios: string[];
  proceso: import('./servicios').PasosProceso[];
  faqs: import('./servicios').FAQ[];
}

export interface Ciudad {
  slug: string;
  nombre: string;
  provincia: string;
  lat: number;
  lng: number;
  telefono: string;
  email: string;
  direccion: string;
  codigoPostal: string;
  zonas: string[];
  servicios: ServicioResuelto[];
}

// ── Interpolación de variables ────────────────────────────────────────────────
function interpolate(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

function interpolateDeep<T>(obj: T, vars: Record<string, string>): T {
  if (typeof obj === 'string') return interpolate(obj, vars) as unknown as T;
  if (Array.isArray(obj)) return obj.map((item) => interpolateDeep(item, vars)) as unknown as T;
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, interpolateDeep(v, vars)])
    ) as T;
  }
  return obj;
}

// ── Build de ciudades ─────────────────────────────────────────────────────────
export const ciudades: Ciudad[] = rawCiudades.map((raw) => {
  const vars = {
    ciudad: raw.nombre,
    provincia: raw.provincia,
    empresa: EMPRESA.nombre,
  };

  const serviciosResueltos: ServicioResuelto[] = raw.serviciosActivos
    .map((slug) => catalogoServicios.find((s) => s.slug === slug))
    .filter((s): s is (typeof catalogoServicios)[number] => s !== undefined)
    .map((s) => interpolateDeep(s, vars));

  return {
    slug: raw.slug,
    nombre: raw.nombre,
    provincia: raw.provincia,
    lat: raw.lat,
    lng: raw.lng,
    telefono: raw.telefono,
    email: raw.email,
    direccion: raw.direccion,
    codigoPostal: raw.codigoPostal,
    zonas: raw.zonas,
    servicios: serviciosResueltos,
  };
});

// ── Helpers de navegación (para interlinking) ─────────────────────────────────

/** Misma ciudad, distintos servicios */
export function otrosServiciosEnCiudad(
  ciudadSlug: string,
  servicioSlugActual: string
): { nombre: string; slug: string; href: string }[] {
  const ciudad = ciudades.find((c) => c.slug === ciudadSlug);
  if (!ciudad) return [];
  return ciudad.servicios
    .filter((s) => s.slug !== servicioSlugActual)
    .map((s) => ({ nombre: s.nombre, slug: s.slug, href: `/${ciudadSlug}/${s.slug}/` }));
}

/** Mismo servicio en otras ciudades */
export function mismosServicioOtrasCiudades(
  servicioSlug: string,
  ciudadSlugActual: string
): { ciudad: string; slug: string; href: string }[] {
  return ciudades
    .filter((c) => c.slug !== ciudadSlugActual)
    .filter((c) => c.servicios.some((s) => s.slug === servicioSlug))
    .map((c) => ({ ciudad: c.nombre, slug: c.slug, href: `/${c.slug}/${servicioSlug}/` }));
}
