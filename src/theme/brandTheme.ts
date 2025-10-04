// Brand theme configuration for موج پیام (Mooj Payam)

export const brandColors = {
  // Primary brand colors
  blue: {
    light: '#6BA5E7',
    main: '#4A90E2',
    dark: '#3A73B4',
  },
  teal: {
    light: '#4DCBC3',
    main: '#20B2AA',
    dark: '#188E87',
  },
  
  // Supporting colors
  accent: '#FF7E5F',
  success: '#48BB78',
  warning: '#FFD93D',
  error: '#FF6B6B',
  
  // Neutral colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
};

export const brandGradients = {
  primary: `linear-gradient(45deg, ${brandColors.blue.main}, ${brandColors.teal.main})`,
  primaryHover: `linear-gradient(45deg, ${brandColors.blue.dark}, ${brandColors.teal.dark})`,
  accent: `linear-gradient(45deg, ${brandColors.accent}, ${brandColors.teal.light})`,
};

export const brandShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  cartoon: '4px 4px 0px rgba(0, 0, 0, 0.2)',
};

export const brandAnimations = {
  pulse: 'logo-pulse 3s ease-in-out infinite',
  wiggle: 'wiggle 2s ease-in-out infinite',
  bounce: 'bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite',
};

export const brandFonts = {
  primary: "'Yekan Bakh', system-ui, sans-serif",
  secondary: "'Yekan Bakh', system-ui, sans-serif",
  brandName: "'Yekan Bakh', 'Lalezar', system-ui, sans-serif",
};

export const brandTheme = {
  colors: brandColors,
  gradients: brandGradients,
  shadows: brandShadows,
  animations: brandAnimations,
  fonts: brandFonts,
};

export default brandTheme;
