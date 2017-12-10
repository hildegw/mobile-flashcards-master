export const ADD_TO_SCORE = 'ADD_TO_SCORE'

export function scoreCounter (points) {
  return {
    type: ADD_TO_SCORE,
    points,
  }
}
