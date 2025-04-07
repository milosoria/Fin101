export const colors = {
  // Background colors
  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    tertiary: '#2C2C2C',
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#666666',
  },
  
  // Status colors
  status: {
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  
  // Transaction types
  transaction: {
    ingress: '#4CAF50',
    egress: '#F44336',
  },
  
  // Banks
  banks: {
    chase: '#1A73E8',
    boa: '#DB0F27',
    wellsFargo: '#E31837',
    citi: '#0066A1',
  },
  
  // Categories
  categories: {
    salary: '#4CAF50',
    food: '#FF9800',
    shopping: '#9C27B0',
    transportation: '#2196F3',
    entertainment: '#E91E63',
    utilities: '#00BCD4',
    health: '#FF5722',
    education: '#673AB7',
  },
  
  // UI Elements
  ui: {
    border: 'rgba(75, 75, 75, 0.5)',
    shadow: '#000000',
    progress: {
      background: '#1E1E1E',
      fill: '#2196F3',
    },
  },
  
  // Common
  common: {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  },
} as const;

export type Colors = typeof colors; 