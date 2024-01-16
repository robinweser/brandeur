declare module 'brandeur' {
  type Style = Record<string, any>
  type Plugin = (style: Style) => Style

  interface Config {
    plugins?: Array<Plugin>
  }

  type Interface = [string, string]

  function brandeur(config?: Config): Interface
}

declare module 'brandeur-plugin-prefixer' {
  import { Plugin } from 'fela'

  export default function (): Plugin
}
