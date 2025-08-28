import {
  gerarImagem,
  gerarImagemGet,
} from "../controllers/imageControllers.js";

export default async function imageRoutes(fastify) {
  // POST → retorna base64
  fastify.post("/relatorio", async (req, reply) => {
    return await gerarImagem(req, reply);
  });

  // GET → retorna PNG direto
  fastify.get("/relatorio", async (req, reply) => {
    return await gerarImagemGet(req, reply);
  });
}
