// Theme variables and design constants

// Color palette
export const colors = {
  bgPrimary: '#121212',
  bgSecondary: '#1e1e1e',
  bgTertiary: '#252525',
  bgCard: '#2a2a2a',
  textPrimary: '#e0e0e0',
  textSecondary: '#b0b0b0',
  textMuted: '#808080',
  accentPrimary: '#7289da',
  accentSecondary: '#5c6bc0',
  accentSuccess: '#43a047',
  accentWarning: '#fb8c00',
  accentDanger: '#e53935',
  borderColor: '#3a3a3a',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
};

// Typography
export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  titleSize: '1.8rem',
  subtitleSize: '1rem',
  bodySize: '0.9rem',
  smallSize: '0.85rem',
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
};

// Spacing
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '2rem',
};

// Border radius
export const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  round: '50%',
};

// Common styles as objects (for inline styling)
export const commonStyles = {
  card: {
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    boxShadow: `0 4px 6px ${colors.shadowColor}`,
  },
  input: {
    backgroundColor: colors.bgTertiary,
    border: 'none',
    borderRadius: borderRadius.sm,
    padding: `${spacing.md} ${spacing.lg}`,
    color: colors.textPrimary,
  },
  button: {
    primary: {
      backgroundColor: colors.accentPrimary,
      color: 'white',
      border: 'none',
      borderRadius: borderRadius.sm,
      padding: `${spacing.md} ${spacing.xl}`,
      cursor: 'pointer',
      fontWeight: typography.fontWeightMedium,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.textPrimary,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: borderRadius.sm,
      padding: `${spacing.md} ${spacing.xl}`,
      cursor: 'pointer',
      fontWeight: typography.fontWeightMedium,
    },
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    display: 'grid',
    gap: spacing.lg,
  },
};

// Terminal theme colors
export const terminalTheme = {
  background: '#1e1e1e',
  foreground: '#abb2bf',
  cursor: '#528bff',
  selection: 'rgba(82, 139, 255, 0.3)',
  black: '#000000',
  brightBlack: '#5c6370',
  red: '#e06c75',
  brightRed: '#e06c75',
  green: '#98c379',
  brightGreen: '#98c379',
  yellow: '#d19a66',
  brightYellow: '#d19a66',
  blue: '#61afef',
  brightBlue: '#61afef',
  magenta: '#c678dd',
  brightMagenta: '#c678dd',
  cyan: '#56b6c2',
  brightCyan: '#56b6c2',
  white: '#abb2bf',
  brightWhite: '#ffffff',
};

// Export CSS variables string for global styles
export const cssVariables = `
  :root {
    --bg-primary: ${colors.bgPrimary};
    --bg-secondary: ${colors.bgSecondary};
    --bg-tertiary: ${colors.bgTertiary};
    --bg-card: ${colors.bgCard};
    --text-primary: ${colors.textPrimary};
    --text-secondary: ${colors.textSecondary};
    --text-muted: ${colors.textMuted};
    --accent-primary: ${colors.accentPrimary};
    --accent-secondary: ${colors.accentSecondary};
    --accent-success: ${colors.accentSuccess};
    --accent-warning: ${colors.accentWarning};
    --accent-danger: ${colors.accentDanger};
    --border-color: ${colors.borderColor};
    --shadow-color: ${colors.shadowColor};

    --font-family: ${typography.fontFamily};
    --title-size: ${typography.titleSize};
    --subtitle-size: ${typography.subtitleSize};
    --body-size: ${typography.bodySize};
    --small-size: ${typography.smallSize};
  }
`;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  commonStyles,
  terminalTheme,
  cssVariables,
};