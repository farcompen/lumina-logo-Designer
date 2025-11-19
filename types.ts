export interface LogoRequest {
  brandName: string;
  industry: string;
  style: LogoStyle;
  colors: string;
  description?: string;
}

export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  MODERN = 'Modern',
  VINTAGE = 'Vintage',
  FUTURISTIC = 'Futuristic',
  PLAYFUL = 'Playful',
  ABSTRACT = 'Abstract',
  LUXURY = 'Luxury',
  TECH = 'Tech'
}

export interface GeneratedLogo {
  id: string;
  svg: string;
  concept: string;
  palette: string[];
  timestamp: number;
  request: LogoRequest;
}

export interface ServiceResponse {
  svg: string;
  concept: string;
  palette: string[];
}
