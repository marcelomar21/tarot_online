import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Utilize a chave de API do Vite (ou seu ambiente)
  dangerouslyAllowBrowser: true // Apenas para desenvolvimento
});

export const interpretationService = {
  async generateInterpretation(cards) {
    try {
      const cardNames = cards.map(card => card.name).join(', ');
      const prompt = `Interprete as seguintes cartas de tarot: ${cardNames}. Forneça uma interpretação geral e como elas se relacionam entre si.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Você é um experiente leitor de tarot." },
          { role: "user", content: prompt }
        ],
        max_tokens: 300
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Erro ao gerar interpretação:', error);
      return "Desculpe, não foi possível gerar uma interpretação neste momento. Por favor, tente novamente mais tarde.";
    }
  }
};
