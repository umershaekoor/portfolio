import { Injectable } from '@angular/core';
import * as topojson from 'topojson-client';

interface GeoJSONGeometry {
  type: string;
  coordinates: number[][][] | number[][][][];
}

interface GeoJSONFeature {
  type: string;
  id?: string | number;
  geometry: GeoJSONGeometry;
  properties?: Record<string, unknown>;
}

interface FeatureCollection {
  type: string;
  features: GeoJSONFeature[];
}

interface WorldData {
  type: string;
  objects: {
    countries: unknown;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly countryPaths: Map<string, string> = new Map();

  constructor() {
    void this.initializeMaps();
  }

  /**
   * Convert TopoJSON to GeoJSON and extract country paths
   */
  private async initializeMaps(): Promise<void> {
    try {
      // Dynamically import world-atlas data
      const worldData = await import('world-atlas/countries-50m.json') as WorldData;

      // Convert TopoJSON to GeoJSON
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const geojson = topojson.feature(worldData as any, (worldData as any).objects.countries) as unknown as FeatureCollection;

      // Extract Germany (276) and Switzerland (756) by ISO 3166-1 numeric codes
      const germany = geojson.features.find((f: GeoJSONFeature) => f.id === '276' || f.id === 276);
      const switzerland = geojson.features.find((f: GeoJSONFeature) => f.id === '756' || f.id === 756);

      if (germany?.geometry) {
        this.countryPaths.set('DE', this.geometryToSVGPath(germany.geometry));
      }

      if (switzerland?.geometry) {
        this.countryPaths.set('CH', this.geometryToSVGPath(switzerland.geometry));
      }
    } catch (error) {
      console.warn('Failed to load real country maps, using fallbacks:', error);
      this.setFallbackPaths();
    }
  }

  /**
   * Convert GeoJSON geometry to SVG path string
   */
  private geometryToSVGPath(geometry: GeoJSONGeometry): string {
    const coordinates = geometry.coordinates;

    if (geometry.type === 'Polygon') {
      return this.coordinatesToPath(coordinates[0] as number[][]);
    } else if (geometry.type === 'MultiPolygon') {
      // For countries with multiple polygons, use the largest one
      const polygons = coordinates as number[][][][];
      const mainPolygon = polygons.reduce((largest, current) => {
        return current[0].length > largest[0].length ? current : largest;
      }, polygons[0]);
      return this.coordinatesToPath(mainPolygon[0]);
    }

    return '';
  }

  /**
   * Convert coordinate array to SVG path
   */
  private coordinatesToPath(coords: number[][]): string {
    if (!coords || coords.length === 0) return '';

    // Find bounds to normalize coordinates
    const lons = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const width = maxLon - minLon;
    const height = maxLat - minLat;

    // Normalize to 0-100 coordinate system
    const normalize = (lon: number, lat: number): [number, number] => {
      const x = ((lon - minLon) / width) * 100;
      const y = ((lat - minLat) / height) * 100;
      return [x, 100 - y]; // Flip Y axis for SVG
    };

    let path = '';
    coords.forEach((coord, i) => {
      const [x, y] = normalize(coord[0], coord[1]);
      if (i === 0) {
        path += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      } else {
        path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
    });
    path += ' Z'; // Close path

    return path;
  }

  /**
   * Fallback paths if TopoJSON loading fails
   */
  private setFallbackPaths(): void {
    // Germany - simplified but recognizable outline
    this.countryPaths.set('DE',
      'M 45,5 L 48,3 L 52,4 L 56,2 L 60,5 L 63,8 L 67,7 L 70,10 L 73,9 L 76,12 L 79,14 L 82,13 L 85,16 L 88,19 L 90,23 L 92,28 L 93,33 L 92,38 L 90,43 L 88,48 L 86,53 L 84,58 L 82,63 L 79,68 L 76,73 L 73,78 L 70,83 L 67,88 L 64,93 L 61,98 L 58,103 L 55,108 L 52,113 L 49,118 L 46,123 L 43,125 L 40,123 L 37,120 L 34,117 L 31,114 L 28,111 L 25,108 L 22,105 L 19,102 L 16,99 L 13,96 L 10,92 L 8,87 L 7,82 L 8,77 L 10,72 L 12,67 L 14,62 L 16,57 L 18,52 L 20,47 L 22,42 L 24,37 L 26,32 L 28,27 L 30,22 L 32,17 L 34,12 L 36,9 L 38,7 L 41,6 Z'
    );

    // Switzerland - simplified outline
    this.countryPaths.set('CH',
      'M 10,35 L 15,28 L 20,24 L 25,22 L 30,20 L 35,18 L 40,17 L 45,16 L 50,15 L 55,16 L 60,17 L 65,18 L 70,20 L 75,22 L 80,25 L 85,28 L 88,32 L 90,36 L 89,40 L 87,44 L 84,47 L 80,50 L 75,52 L 70,54 L 65,55 L 60,55 L 55,54 L 50,53 L 45,52 L 40,50 L 35,48 L 30,46 L 25,44 L 20,42 L 15,40 L 12,38 Z'
    );
  }

  /**
   * Get SVG path for a country by code
   */
  getCountryPath(countryCode: string): string {
    return this.countryPaths.get(countryCode) || '';
  }

  /**
   * Get viewBox dimensions for a country
   */
  getViewBox(countryCode: string): string {
    // Germany is taller, Switzerland is wider
    return countryCode === 'DE' ? '0 0 100 130' : '0 0 100 70';
  }
}

