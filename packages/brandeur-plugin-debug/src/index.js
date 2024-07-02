import { CreateStylesDebugger as createStylesDebugger } from 'styles-debugger'

export default function debugPlugin(autoActive = true, config = {}) {
  const debugStyle = createStylesDebugger(config)

  return function debug(style) {
    if (autoActive || style?.debug) {
      const { debug, ...rest } = style

      return {
        ...rest,
        ...debugStyle(),
      }
    }

    return style
  }
}
