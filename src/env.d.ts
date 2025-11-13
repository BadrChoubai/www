/// <reference types="astro/client" />

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    ['mobile:hidden']?: boolean | string;
    ['desktop:hidden']?: boolean | string;
  }
}