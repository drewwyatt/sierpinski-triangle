import type { Color } from './theme'
export type Context = CanvasRenderingContext2D

type DotOptions = {
  color: Color
}

export const dot = (
  ctx: Context,
  [x, y]: [x: number, y: number],
  options: Partial<DotOptions> = {},
) => {
  const prevStyle = ctx.fillStyle
  if (options.color) {
    ctx.fillStyle = options.color
  }

  ctx.fillRect(x, y, 4, 4)
  ctx.fillStyle = prevStyle
}
