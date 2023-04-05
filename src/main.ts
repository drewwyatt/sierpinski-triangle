import { RGB } from './theme'
import { Point, Draw, toMidpoint, randomizer } from './utils'

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = RGB.Foreground
ctx.strokeStyle = RGB.Foreground

const width = 800
const height = 800
const padding = 20

const vertexPoints = [
  [width / 2, padding],
  [padding, height - padding],
  [width - padding, height - padding],
] satisfies Point[]
const getRandomVertex = randomizer(vertexPoints)

const startingPoint: Point = [400, 400] // TODO: make this random

for (const point of vertexPoints) {
  Draw.dot(ctx, point)
}

const wait = (time: number) => new Promise(res => setTimeout(res, time))

const run = async () => {
  let cursor = startingPoint
  for (let i = 0; i < 1000000; i++) {
    const vertex = getRandomVertex()
    cursor = toMidpoint(cursor, vertex)
    Draw.dot(ctx, cursor)
    await wait(10)
  }
}

run()
