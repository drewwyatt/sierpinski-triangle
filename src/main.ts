import { RGB } from './theme'
import { dot } from './utils'

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = RGB.Foreground
ctx.strokeStyle = RGB.Foreground

type Point = [x: number, y: number]

const width = 800
const height = 800
const padding = 20

const points = [
  [width / 2, padding],
  [padding, height - padding],
  [width - padding, height - padding],
] satisfies Point[]

for (const point of points) {
  dot(ctx, point)
}
