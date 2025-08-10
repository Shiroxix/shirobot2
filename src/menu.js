/**
 * Menu do bot - Estilo Futurista
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
      "cenario",
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
  return commands.map(cmd => `  ▸  ${PREFIX}${cmd}`).join("\n");
}

exports.menuMessage = () => {
  const date = new Date();

  const topBorder = "╔════════════════════════════════════════════════╗";
  const bottomBorder = "╚════════════════════════════════════════════════╝";
  const middleBorder = "╠════════════════════════════════════════════════╣";

  let menu = `
${topBorder}
║ 🛰️  BEM VINDO AO  ${BOT_NAME.toUpperCase()}  🛰️
║────────────────────────────────────────────────║
║ Data: ${date.toLocaleDateString("pt-BR").padEnd(36)}║
║ Hora: ${date.toLocaleTimeString("pt-BR").padEnd(36)}║
║ Prefixo: ${PREFIX.padEnd(33)}║
║ Versão: ${packageInfo.version.padEnd(34)}║
║────────────────────────────────────────────────║
║${readMore().padEnd(48)}║
${middleBorder}
`;

  for (const section of sections) {
    const titleLine = `║ ⚡ ${section.emoji} ${section.title.toUpperCase()} ${" ".repeat(44 - section.title.length)}║`;
    const commands = formatCommands(section.commands).split("\n").map(line => `║${line.padEnd(48)}║`).join("\n");

    menu += `
${titleLine}
${commands}
${middleBorder}
`;
  }

  menu += bottomBorder;

  return menu;
};
