const startStop = document.getElementById('start-stop')
const reset = document.getElementById('reset')
const instant = document.getElementById('instant')

export enum State {
  Running = 'running',
  Stopped = 'stopped',
}

let state = State.Stopped

function assertButton(
  name: string,
  el: HTMLElement | null,
): asserts el is HTMLButtonElement {
  if (el?.nodeName !== 'BUTTON') {
    throw new Error(`Cannot find button "${name}"`)
  }
}

function assertInput(
  name: string,
  el: HTMLElement | null,
): asserts el is HTMLInputElement {
  if (el?.nodeName !== 'INPUT') {
    throw new Error(`Cannot find input "${name}"`)
  }
}

assertButton('startStop', startStop)
assertButton('reset', reset)
assertInput('instant', instant)

const setButtonText = (state: State) => {
  startStop.innerText = state === State.Running ? 'Stop' : 'Start'
}

setButtonText(state)

const listeners = {
  startStop: null as null | ((...args: any[]) => void),
  reset: null as null | ((...args: any[]) => void),
}

export const onStartOrStop = (callback: (state: State) => void) => {
  if (listeners.startStop) {
    startStop.removeEventListener('click', listeners.startStop)
  }

  listeners.startStop = () => {
    state = state === State.Stopped ? State.Running : State.Stopped
    setButtonText(state)
    callback(state)
  }
  startStop.addEventListener('click', listeners.startStop)
}

export const onReset = (callback: () => void) => {
  if (listeners.reset) {
    reset.removeEventListener('click', listeners.reset)
  }

  listeners.reset = callback
  reset.addEventListener('click', listeners.reset)
}

export const getIsInstant = () => !!instant.checked
export const getState = () => state
export const tryStop = () => {
  if (getState() === State.Running) {
    startStop.click()
  }
}
