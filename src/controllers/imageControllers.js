import { gerarHtml } from "../functions/gerarHtml.js";
import { criarImagemPuppeteer } from "../functions/generateImage.js";

// Dados fixos de exemplo (pode ser removido se sempre usar POST)
const dadosExemplo = {
  aluno: "Nicole",
  periodo: "1º Trimestre",
  ano: "8º ano – Ensino Fundamental II",
  disciplinas: [
    {
      nome: "Matemática",
      notaAtual: 6.0,
      notaNecessaria: 7.5,
      necessidade: "Aumento percentual de 25%",
      risco: "Baixo risco",
    },
    {
      nome: "Matemática 2",
      notaAtual: 6.0,
      notaNecessaria: 7.5,
      necessidade: "Aumento percentual de 25%",
      risco: "Alto risco",
    },
    {
      nome: "Literatura",
      notaAtual: 6.4,
      notaNecessaria: 7.3,
      necessidade: "Aumento percentual de 14%",
      risco: "Risco Moderado",
    },
    {
      nome: "Redação",
      notaAtual: 6.73,
      notaNecessaria: 7.54,
      necessidade: "Aumento percentual de 12%",
      risco: "Risco Moderado",
    },
    {
      nome: "Língua Portuguesa",
      notaAtual: 7.06,
      notaNecessaria: 6.97,
      necessidade: "Manter nota com rotina de estudos",
      risco: "Risco Moderado",
    },
  ],
};

// POST /relatorio → recebe dados via body
export const gerarImagem = async (req, reply) => {
  try {
    const dados = req.body || dadosExemplo; // usa dados do body ou exemplo
    const html = gerarHtml(dados);

    const buffer = await criarImagemPuppeteer(html);

    // Retorna a imagem como base64 dentro do JSON
    return reply.status(200).send({
      success: true,
      imagemBase64: buffer.toString("base64"),
    });
  } catch (error) {
    console.error("❌ Erro ao gerar a imagem:", error.message);
    return reply.status(500).send({ success: false, error: error.message });
  }
};

// GET /relatorio → retorna imagem diretamente como PNG
export const gerarImagemGet = async (req, reply) => {
  try {
    const html = gerarHtml(dadosExemplo);
    const buffer = await criarImagemPuppeteer(html);

    reply.header("Content-Type", "image/png").send(buffer);
  } catch (error) {
    console.error("❌ Erro ao gerar a imagem:", error.message);
    reply.code(500).send({ success: false, error: error.message });
  }
};
