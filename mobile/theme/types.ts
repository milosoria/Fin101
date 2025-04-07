import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type Style = ViewStyle | TextStyle | ImageStyle;

export interface TextStyles {
  primary: TextStyle;
  secondary: TextStyle;
  tertiary: TextStyle;
  large: TextStyle;
  medium: TextStyle;
  small: TextStyle;
}

export interface SpacingStyles {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BorderRadiusStyles {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface BorderWidthStyles {
  thin: number;
  medium: number;
  thick: number;
}

export interface BorderStyles {
  radius: BorderRadiusStyles;
  width: BorderWidthStyles;
}

export interface ShadowStyles {
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
}

export interface CommonStyles {
  container: ViewStyle;
  contentContainer: ViewStyle;
  header: ViewStyle;
  card: ViewStyle;
  text: TextStyles;
  badge: ViewStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  spacing: SpacingStyles;
  borders: BorderStyles;
  shadows: ShadowStyles;
}

export type NamedStyles<T> = {
  [P in keyof T]: T[P] extends object
    ? NamedStyles<T[P]>
    : ViewStyle | TextStyle | ImageStyle;
}; 