export const update = (state, { timeRunning }) => {
  state.sinValue = (Math.sin(timeRunning * 0.001) + 1) / 2
}
