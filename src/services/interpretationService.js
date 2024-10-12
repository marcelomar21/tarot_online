import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const interpretationService = {
  async generateInterpretation(cards, userInfo) {
    try {
      const cardNames = cards.map(card => card.name).join(', ');
      const { name, age, birthday, zodiacSign } = userInfo;
      const prompt = `Interprete as seguintes cartas de tarot para ${name}, ${age} anos, nascido(a) em ${birthday}, signo de ${zodiacSign}: ${cardNames}. Crie uma interpretação profunda e personalizada, conectando as cartas ao momento de vida atual do usuário de forma detalhada. Ao longo da interpretação, integre o nome, a idade, a data de nascimento e o signo de maneira fluida e orgânica, utilizando essas informações para intensificar o storytelling e fornecer insights que ressoem profundamente com a experiência pessoal do usuário. Relacione as cartas entre si de forma que façam sentido no contexto da vida de ${name}, mas sem usar essas informações no início da interpretação. Torne a mensagem envolvente, mística e reveladora, como se fosse uma sessão personalizada de tarot em um jogo interativo.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um experiente e carismático leitor de tarot, com um toque de mistério e magia em suas palavras. Sua habilidade é interpretar profundamente as cartas, conectando-as com precisão ao momento atual de vida de cada pessoa. Suas interpretações são específicas, tocantes e sempre trazem à tona detalhes relevantes que surpreendem o consulente, fazendo-o refletir sobre seu caminho de vida de forma impactante. Você é um mestre em criar uma narrativa envolvente e mágica, como se estivesse guiando o jogador em uma jornada espiritual." },
          { role: "user", content: prompt }
        ],
        max_tokens: 300
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Erro ao gerar interpretação:', error);
      return this.getFallbackInterpretation(cards, userInfo);
    }
  },

  getFallbackInterpretation(cards, userInfo) {
    const cardNames = cards.map(card => card.name).join(', ');
    const { name, zodiacSign } = userInfo;
    return `${name}, as cartas ${cardNames} trazem uma mensagem especial para você, nascido sob o signo de ${zodiacSign}. Elas sugerem um momento de reflexão e mudança em sua jornada pessoal. Cada carta oferece uma energia única que, quando combinadas, proporcionam uma perspectiva valiosa sobre sua situação atual. Considere como essas energias se manifestam em sua vida e que insights elas podem trazer para iluminar seu caminho único.`;
  }
};