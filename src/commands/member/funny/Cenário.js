/**
 * Comando inovador "cenário"
 * Cria situações inusitadas pra gerar conversa e interação diferente.
 *
 * @author Dev Gui
 */

const { PREFIX } = require(`${BASE_DIR}/config`);

const cenarios = [
  "Você acorda amanhã com o poder de ler mentes, mas só das pessoas que usam emojis no status. O que faz primeiro?",
  "Se pudesse apagar uma palavra do dicionário, qual seria e por quê?",
  "Você tem 24h para viver no mundo de um filme que escolher. Qual escolhe?",
  "De repente, você é a única pessoa que lembra do passado antes do ano 2000. Como lida com isso?",
  "Seu celular começa a responder suas mensagens sozinho. O que fala pra ele?",
  "Você encontra uma porta que só abre uma vez na vida. Tem coragem de entrar?",
  "Seu avatar virtual ganha consciência e pede conselhos. Qual sua resposta?",
  "Descobre que está em um reality show desde sempre, e as câmeras nunca desligam. O que faz?",
  "Seu futuro eu aparece e diz para mudar uma coisa hoje. O que quer ouvir?",
  "Um app que transforma seus sonhos em vídeos está disponível. Você usa? Por quê?",
];

module.exports = {
  name: "cenario",
  description: "Gera cenários inusitados para quebrar o gelo e engajar a galera.",
  commands: ["cenario", "cenário"],
  usage: `${PREFIX}cenario`,

  /**
   * @param {CommandHandleProps} props
   * @returns {Promise<void>}
   */
  handle: async ({ sendText }) => {
    const frase = cenarios[Math.floor(Math.random() * cenarios.length)];
    await sendText(`⚡ Cenário: ${frase}`);
  },
};
