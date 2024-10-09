export const interpretationService = {
  generateInterpretation(cards) {
    // Lógica simplificada para gerar interpretação
    return `As cartas revelam um caminho de ${cards[0].name} levando a ${cards[cards.length - 1].name}. Reflita sobre as mudanças em sua vida.`
  }
}