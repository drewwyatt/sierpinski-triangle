import type { Color } from './theme'
export type Context = CanvasRenderingContext2D
export type Point = [x: number, y: number]

type DotOptions = {
  color: Color
}

export namespace Draw {
  export const dot = (ctx: Context, [x, y]: Point, options: Partial<DotOptions> = {}) => {
    const prevStyle = ctx.fillStyle
    if (options.color) {
      ctx.fillStyle = options.color
    }

    ctx.fillRect(x, y, 1, 1)
    ctx.fillStyle = prevStyle
  }
}

export const toMidpoint = (a: Point, b: Point): Point => [
  a[0] + (b[0] - a[0]) * 0.5,
  a[1] + (b[1] - a[1]) * 0.5,
]

export const randomizer = (vertexPoints: Point[]) => () =>
  vertexPoints[Math.floor(Math.random() * vertexPoints.length)]
