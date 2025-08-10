const { TIMEOUT_IN_MILLISECONDS_BY_EVENT } = require("./config");
const path = require("node:path");
const { errorLog } = require("./utils/logger");
const { badMacHandler } = require("./utils/badMacHandler");
const { processarMensagem } = require("./listeners/conquistas");

exports.load = (socket) => {
  global.BASE_DIR = path.resolve(__dirname);

  const safeEventHandler = async (callback, data, eventName) => {
    try {
      await callback(data);
    } catch (error) {
      if (badMacHandler.handleError(error, eventName)) {
        return;
      }
      errorLog(`Erro ao processar evento ${eventName}: ${error.message}`);
      if (error.stack) {
        errorLog(`Stack trace: ${error.stack}`);
      }
    }
  };

  socket.ev.on("messages.upsert", async (data) => {
    const startProcess = Date.now();
    setTimeout(() => {
      safeEventHandler(async () => {
        for (const message of data.messages) {
          await processarMensagem(message, socket);
          // Aqui você pode chamar outros middlewares de mensagens se tiver
        }
      }, data, "messages.upsert");
    }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
  });

  process.on("uncaughtException", (error) => {
    if (badMacHandler.handleError(error, "uncaughtException")) return;
    errorLog(`Erro não capturado: ${error.message}`);
  });

  process.on("unhandledRejection", (reason) => {
    if (badMacHandler.handleError(reason, "unhandledRejection")) return;
    errorLog(`Promessa rejeitada não tratada: ${reason}`);
  });
};
