export const Colors = {
  white: '#ffffff',
  dark:"#202020",
  red: '#ff0000',
  green: '#00ff00',
  blue: '#60e2ff',
  deepBlue: '#0000FF',
  yellow: '#ffff00',
  gold:  '#ffd700',
  orange: '#ffa500',
  purple: '#800080',
  pink: '#ffc0cb',
  gray: '#808080',
  
  background: '#8c8c8c',
  workspaceBackground: '#555555',
  
  canvasColor: '#ffffff',
  canvasBorder: '#555555',

  buttonColor: '#2e2e2e',

} as const;

export const FontColors = [
  Colors.dark, // Black
  Colors.gray, // Gray
  Colors.red, // Red
  Colors.orange, // Orange
  Colors.gold, // Gold
  Colors.green, // Green
  Colors.blue, // Sky Blue
  Colors.deepBlue, // Blue
  Colors.purple, // Purple
  Colors.white, // White
] as const;