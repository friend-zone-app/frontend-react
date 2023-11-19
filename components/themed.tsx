import { Text as DefaultText, View as DefaultView, SafeAreaView as DefaultSafeAreaView } from 'react-native';

import colors from '../constants/colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof colors.light & keyof typeof colors.dark,
    invert?: boolean
) {
  let theme = useColorScheme();
  if(invert) theme = theme == "light" ? "dark" : "light"
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type SafeAreaViewProps = ThemeProps & DefaultSafeAreaView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  
    return <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />;
}

interface GetColorsProps { 
  textColorInvert?: boolean;
  backgroundcolorInvert?: boolean;
  secondaryColorInvert?: boolean;
  tintColorInvert?: boolean;
}

export function GetColors(props?: GetColorsProps) {
    const textColor = useThemeColor({ }, 'text', props?.textColorInvert);
    const backgroundColor = useThemeColor({}, 'background', props?.backgroundcolorInvert);
    const secondaryColor = useThemeColor({}, 'secondaryColor', props?.secondaryColorInvert);
    const tintColor = useThemeColor({}, "tint", props?.tintColorInvert);
    return {
        textColor,
        backgroundColor,
        secondaryColor,
        tintColor
    }
}