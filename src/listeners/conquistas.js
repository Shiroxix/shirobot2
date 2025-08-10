const fs = require("fs");
const path = require("path");

const palavrasChave = {
  "foda": "🔥 Conquista desbloqueada: *Fogo no Parquinho*! Você chegou chegando.",
  "caralho": "💥 Conquista desbloqueada: *Explosão de Energia*. Cuidado que você é intenso!",
  // ... (adicione todas as palavras que quiser)
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

async function processarMensagem(message, socket) {
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
        await socket.sendText(message.from, `${conquista} (${conquistasUser}/${totalConquistas} conquistas desbloqueadas)`);
      }
      break;
    }
  }
}

module.exports = { processarMensagem };
