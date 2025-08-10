const fs = require('fs');
const path = require('path');
const { PREFIX } = require(`${BASE_DIR}/config`);

const ficharioPath = path.resolve(__dirname, "../../../conquistasUsuarios.json");

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

const palavrasChave = {
  // repita as mesmas palavras aqui para mostrar o nome das conquistas
  "foda": "🔥 Fogo no Parquinho",
  "caralho": "💥 Explosão de Energia",
  "merda": "💩 Rei/Reina do Caos",
  "puta": "🔥 Sem Papas na Língua",
  "buceta": "🔥 Realeza Selvagem",
  "cu": "💥 Sem Vergonha",
  "viado": "🌈 Orgulho e Glória",
  "gay": "🌈 Amor Livre",
  "pau": "🔥 Força Bruta",
  "gostosa": "🔥 Charme Letal",
  "fodase": "💀 Indiferente",
  "putaquepariu": "🔥 Explosão de Emoção",
  "merdinha": "💩 Pequeno Caos",
  "fodão": "👊 Lenda Viva",
  "nojento": "🤢 Sem Filtro",
  "babaca": "😈 Sem Censura",
  "chato": "😒 Persistente",
  "filho da puta": "🔥 Rei/Reina do Improviso",
  "bomba": "💣 Explosão de Impacto",
  "louco": "🤪 Alma Livre",
  "doido": "🤪 Fora da Caixa",
  "brabo": "🔥 Mestre do Caos",
  "fera": "🐯 Animal",
  "monstro": "👹 Imparável",
  "boss": "👑 Chefão",
};

module.exports = {
  name: "conquistas",
  description: "Mostra suas conquistas desbloqueadas.",
  commands: ["conquistas", "minhasconquistas"],
  usage: `${PREFIX}conquistas`,

  handle: async ({ message, sendText }) => {
    const userId = message.sender.id || message.sender;

    const fichario = carregarFichario();
    const conquistasUser = fichario[userId] || [];

    if (conquistasUser.length === 0) {
      await sendText("Você ainda não desbloqueou nenhuma conquista. Fale umas palavras chave aí para começar!");
      return;
    }

    let texto = `🎖️ Você desbloqueou ${conquistasUser.length} conquistas:\n\n`;
    for (const chave of conquistasUser) {
      texto += `  ${palavrasChave[chave] || chave}\n`;
    }
    texto += `\nTotal possível: ${Object.keys(palavrasChave).length}`;

    await sendText(texto);
  },
};
