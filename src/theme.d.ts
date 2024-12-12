import { ThemeOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    vars?: {
      palette?: {
        action?: {
          disabled?: string;
        };
      };
    };
  }

  // Extend ThemeOptions to allow `vars`
  interface ThemeOptions {
    vars?: {
      palette?: {
        action?: {
          disabled?: string;
        };
      };
    };
  }
}
