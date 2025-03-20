// Define TypeScript interfaces for our application
export interface DeviceConfig {
  id: string;
  name: string;
  type: string;
  lastSynced: string;
  status: 'synced' | 'changed' | 'error';
  syncEnabled: boolean;
  extensionsCount: {
    enabled: number;
    disabled: number;
    total: number;
  };
  terminalConfigured: boolean;
  themeConfigured: boolean;
}

export interface Extension {
  id: string;
  name: string;
  version: string;
  enabled: boolean;
}

export interface TerminalConfig {
  shell: string;
  font: string;
  fontSize: number;
  lineHeight: number;
  theme: string;
  cursorStyle: string;
  scrollback: number;
  customCommands: string[];
}

export interface ThemeConfig {
  uiTheme: string;
  iconTheme: string;
  syntaxTheme: string;
  font: string;
  darkMode: boolean;
  monospaceFont: string;
  documentFont: string;
  fontAntialiasing: string;
  fontHinting: string;
  cursorTheme: string;
  cursorSize: string;
  buttonLayout: string;
  animations: boolean;
  clockFormat: string;
  accentColor: string;
}