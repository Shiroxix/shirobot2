
/**
 * Menu do bot
 *
 * @author Dev Gui
 */
const { BOT_NAME, PREFIX } = require("./config");
const packageInfo = require("../package.json");
const { readMore } = require("./utils");

const sections = [
  {
    title: "DONO",
    emoji: "🌌",
    commands: [
      "exec",
      "get-id",
      "off",
      "on",
      "set-menu-image",
    ],
  },
  {
    title: "ADMINS",
    emoji: "⭐",
    commands: [
      "abrir",
      "agendar-mensagem",
      "anti-audio (1/0)",
      "anti-document (1/0)",
      "anti-event (1/0)",
      "anti-image (1/0)",
      "anti-link (1/0)",
      "anti-product (1/0)",
      "anti-sticker (1/0)",
      "anti-video (1/0)",
      "auto-responder (1/0)",
      "ban",
      "delete",
      "exit (1/0)",
      "fechar",
      "hidetag",
      "limpar",
      "link-grupo",
      "mute",
      "only-admin (1/0)",
      "promover",
      "rebaixar",
      "revelar",
      "unmute",
      "welcome (1/0)",
    ],
  },
  {
    title: "PRINCIPAL",
    emoji: "🚀",
    commands: [
      "attp",
      "cep",
      "exemplos-de-mensagens",
      "fake-chat",
      "gerar-link",
      "get-lid",
      "google-search",
      "perfil",
      "ping",
      "raw-message",
      "rename",
      "sticker",
      "to-image",
      "ttp",
      "yt-search",
    ],
  },
  {
    title: "DOWNLOADS",
    emoji: "🎶",
    commands: [
      "play-audio",
      "play-video",
      "tik-tok",
      "yt-mp3",
      "yt-mp4",
    ],
  },
  {
    title: "BRINCADEIRAS",
    emoji: "🎡",
    commands: [
      "abracar",
      "beijar",
      "dado",
      "jantar",
      "lutar",
      "matar",
      "socar",
    ],
  },
  {
    title: "IA",
    emoji: "🚀",
    commands: [
      "gemini",
      "ia-sticker",
      "pixart",
      "stable-diffusion-turbo",
    ],
  },
  {
    title: "CANVAS",
    emoji: "❇",
    commands: [
      "blur",
      "bolsonaro",
      "cadeia",
      "contraste",
      "espelhar",
      "gray",
      "inverter",
      "pixel",
      "rip",
    ],
  },
];

function formatCommands(commands) {
  return commands.map(cmd => `→ ${PREFIX}${cmd}`).join("\n");
}

exports.menuMessage = () => {
  const date = new Date();

  let menu = `
┌───────────────────────────────┐
│ ✨ BEM VINDO! ${readMore().trim()}
├───────────────────────────────┤
│ • Bot: ${BOT_NAME}
│ • Data: ${date.toLocaleDateString("pt-BR")}
│ • Hora: ${date.toLocaleTimeString("pt-BR")}
│ • Prefixo: ${PREFIX}
│ • Versão: ${packageInfo.version}
└───────────────────────────────┘
`;

  for (const section of sections) {
    menu += `
→─── ${section.emoji} ${section.title} ───→
${formatCommands(section.commands)}
`;
  }

  return menu.trim();
};
