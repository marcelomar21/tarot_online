export function canStartGame(user) {
  return user && user.credits > 0
}