import { getState, getIsInstant, onReset, State, onStartOrStop, tryStop } from './inputs'
import { RGB } from './theme'
import { Point, Draw, toMidpoint, randomizer } from './utils'

const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!

ctx.fillStyle = RGB.Foreground
ctx.strokeStyle = RGB.Foreground

const width = 800
const height = 800
const padding = 20
const maxRuns = 1000000
let runs = 0

const vertexPoints = [
  [width / 2, padding],
  [padding, height - padding],
  [width - padding, height - padding],
] satisfies Point[]
const getRandomVertex = randomizer(vertexPoints)

const startingPoint: Point = [400, 400] // TODO: make this random
let cursor = startingPoint

const setup = () => {
  runs = 0
  ctx.clearRect(0, 0, width, height)
  for (const point of vertexPoints) {
    Draw.dot(ctx, point)
  }

  cursor = startingPoint
}

onReset(() => {
  setup()
})

const wait = (time: number) => new Promise(res => setTimeout(res, time))

const run = async () => {
  while (getState() === State.Running && runs < maxRuns) {
    const vertex = getRandomVertex()
    cursor = toMidpoint(cursor, vertex)
    Draw.dot(ctx, cursor)

    if (!getIsInstant()) {
      await wait(1)
    }
    runs++
  }

  tryStop()
}

onStartOrStop(state => {
  if (state === State.Running) {
    run()
  }
})
