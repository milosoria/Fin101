import { StatusBar, StyleSheet } from 'react-native';
import { colors } from './colors';
import { CommonStyles, NamedStyles } from './types';

const styles: NamedStyles<CommonStyles> = {
  // Layout
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    padding: 16,
  },

  // Cards
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.ui.border,
    shadowColor: colors.ui.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Typography
  text: {
    primary: {
      color: colors.text.primary,
      fontSize: 16,
    },
    secondary: {
      color: colors.text.secondary,
      fontSize: 14,
    },
    tertiary: {
      color: colors.text.tertiary,
      fontSize: 12,
    },
    large: {
      color: colors.text.primary,
      fontSize: 32,
      fontWeight: 'bold',
    },
    medium: {
      color: colors.text.primary,
      fontSize: 18,
      fontWeight: 'bold',
    },
    small: {
      color: colors.text.primary,
      fontSize: 12,
      fontWeight: '500',
    },
  },

  // Badges
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
  },

  // Progress
  progressBar: {
    height: 8,
    backgroundColor: colors.ui.progress.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.ui.progress.fill,
    borderRadius: 4,
  },

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Borders
  borders: {
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
    },
    width: {
      thin: 1,
      medium: 2,
      thick: 3,
    },
  },

  // Shadows
  shadows: {
    small: {
      shadowColor: colors.ui.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    medium: {
      shadowColor: colors.ui.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    large: {
      shadowColor: colors.ui.shadow,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
  },
};

export const commonStyles = StyleSheet.create(styles) as unknown as CommonStyles; 