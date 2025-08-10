const fs = require('fs');
const path = require('path');

const palavrasChave = {
  "foda": "🔥 Conquista desbloqueada: *Fogo no Parquinho*! Você chegou chegando.",
  "caralho": "💥 Conquista desbloqueada: *Explosão de Energia*. Cuidado que você é intenso!",
  "merda": "💩 Conquista desbloqueada: *Rei/Reina do Caos*. Você sabe como causar impacto.",
  "puta": "🔥 Conquista desbloqueada: *Sem Papas na Língua*. Você fala o que pensa.",
  "buceta": "🔥 Conquista desbloqueada: *Realeza Selvagem*. Só pra quem é brabo.",
  "cu": "💥 Conquista desbloqueada: *Sem Vergonha*. Você não tem medo de nada.",
  "viado": "🌈 Conquista desbloqueada: *Orgulho e Glória*. Autenticidade acima de tudo.",
  "gay": "🌈 Conquista desbloqueada: *Amor Livre*. Aqui é todo mundo respeitado.",
  "pau": "🔥 Conquista desbloqueada: *Força Bruta*. Você não passa despercebido.",
  "gostosa": "🔥 Conquista desbloqueada: *Charme Letal*. Você arrasa sem esforço.",
  "fodase": "💀 Conquista desbloqueada: *Indiferente*. Nada te abala, nem fodase.",
  "putaquepariu": "🔥 Conquista desbloqueada: *Explosão de Emoção*. Aqui o bicho pega.",
  "merdinha": "💩 Conquista desbloqueada: *Pequeno Caos*. Nem tudo precisa ser perfeito.",
  "fodão": "👊 Conquista desbloqueada: *Lenda Viva*. Nível hard desbloqueado.",
  "nojento": "🤢 Conquista desbloqueada: *Sem Filtro*. Você não tem papas na língua.",
  "babaca": "😈 Conquista desbloqueada: *Sem Censura*. Chega chegando e fala o que quer.",
  "chato": "😒 Conquista desbloqueada: *Persistente*. Você não sai da cabeça de ninguém.",
  "filho da puta": "🔥 Conquista desbloqueada: *Rei/Reina do Improviso*. Você manda no rolê.",
  "bomba": "💣 Conquista desbloqueada: *Explosão de Impacto*. Todo mundo percebeu você.",
  "louco": "🤪 Conquista desbloqueada: *Alma Livre*. Sem medo de ser quem é.",
  "doido": "🤪 Conquista desbloqueada: *Fora da Caixa*. Sempre surpreendendo.",
  "brabo": "🔥 Conquista desbloqueada: *Mestre do Caos*. Você é respeitado na área.",
  "fera": "🐯 Conquista desbloqueada: *Animal*. Instinto puro.",
  "monstro": "👹 Conquista desbloqueada: *Imparável*. Nada te segura.",
  "boss": "👑 Conquista desbloqueada: *Chefão*. Nível máximo ativado.",
};

const totalConquistas = Object.keys(palavrasChave).length;
const ficharioPath = path.resolve(__dirname, "../../conquistasUsuarios.json");

function carregarFichario() {
  try {
    if (fs.existsSync(ficharioPath)) {
      const data = fs.readFileSync(ficharioPath, "utf-8");
      return JSON.parse(data);
    } else {
      return {};
    }
  } catch (err) {
    console.error("Erro ao carregar fichário:", err);
    return {};
  }
}

function salvarFichario(data) {
  try {
    fs.writeFileSync(ficharioPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar fichário:", err);
  }
}

module.exports = {
  name: "autoConquistas",
  description: "Listener automático para conceder conquistas pelas palavras-chave.",
  handle: async ({ message, sendText }) => {
    if (!message.body) return;
    const userId = message.sender.id || message.sender;
    const texto = message.body.toLowerCase();

    let fichario = carregarFichario();

    if (!fichario[userId]) fichario[userId] = [];

    for (const [chave, conquista] of Object.entries(palavrasChave)) {
      if (texto.includes(chave)) {
        if (!fichario[userId].includes(chave)) {
          fichario[userId].push(chave);
          salvarFichario(fichario);

          const conquistasUser = fichario[userId].length;
          await sendText(`${conquista} (${conquistasUser}/${totalConquistas} conquistas desbloqueadas)`);
        }
        break; // só uma conquista por mensagem
      }
    }
  },
};
