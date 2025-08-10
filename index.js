/*
 * Este arquivo index.js é o mesmo existente em "src/index.js", ele só está aqui
 * para facilitar a execução do bot em algumas hosts.
 *
 * (seu comentário original aqui...)
 */

const { connect } = require("./src/connection");
const { load } = require("./src/loader");
const { badMacHandler } = require("./src/utils/badMacHandler");
const {
  successLog,
  errorLog,
  warningLog,
  bannerLog,
  infoLog,
} = require("./src/utils/logger");

// Importa o listener de conquistas automáticas
const autoConquistasListener = require('./src/listeners/autoConquistas');

process.on("uncaughtException", (error) => {
  if (badMacHandler.handleError(error, "uncaughtException")) {
    return;
  }

  errorLog(`Erro crítico não capturado: ${error.message}`);
  errorLog(error.stack);

  if (
    !error.message.includes("ENOTFOUND") &&
    !error.message.includes("timeout")
  ) {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  if (badMacHandler.handleError(reason, "unhandledRejection")) {
    return;
  }

  errorLog(`Promessa rejeitada não tratada:`, reason);
});

async function startBot() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    process.setMaxListeners(1500);

    bannerLog();
    infoLog("Iniciando meus componentes internos...");

    const stats = badMacHandler.getStats();
    if (stats.errorCount > 0) {
      warningLog(
        `BadMacHandler stats: ${stats.errorCount}/${stats.maxRetries} erros`
      );
    }

    const socket = await connect();

    load(socket);

    // Adiciona o listener aqui para escutar as mensagens
    socket.on('message', autoConquistasListener.handle);

    successLog("✅ Bot iniciado com sucesso!");

    setInterval(() => {
      const currentStats = badMacHandler.getStats();
      if (currentStats.errorCount > 0) {
        warningLog(
          `BadMacHandler stats: ${currentStats.errorCount}/${currentStats.maxRetries} erros`
        );
      }
    }, 300_000);
  } catch (error) {
    if (badMacHandler.handleError(error, "bot-startup")) {
      warningLog("Erro Bad MAC durante inicialização, tentando novamente...");

      setTimeout(() => {
        startBot();
      }, 5000);
      return;
    }

    errorLog(`Erro ao iniciar o bot: ${error.message}`);
    errorLog(error.stack);
    process.exit(1);
  }
}

startBot();
