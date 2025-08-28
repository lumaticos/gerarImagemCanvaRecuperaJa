import { gerarHtml } from "../functions/gerarHtml.js";
import { criarImagemPuppeteer } from "../functions/generateImage.js";

// POST /relatorio → recebe dados via body
export const gerarImagem = async (req, reply) => {
  try {
    const body = req.body;

    // Se não vier body, retorna erro
    if (!body || !Array.isArray(body) || body.length === 0) {
      return reply.status(400).send({ success: false, error: "Body inválido" });
    }

    // Pega o primeiro elemento do array (ajustar se quiser suportar múltiplos)
    const dados = body[0];

    // Converte para o formato interno que seu HTML espera
    const html = gerarHtml({
      aluno: dados?.Aluno || "Aluno Exemplo", // caso queira receber
      periodo: dados?.Periodo || "Período Exemplo",
      ano: dados?.Ano || "Ano Exemplo",
      disciplinas: dados.AnaliseDoBoletim.map((disciplina) => ({
        nome: disciplina.Disciplina,
        notaAtual: disciplina["Média Atual"],
        notaNecessaria: disciplina["Nota Necessária (por bimestre)"],
        necessidade: disciplina["Percentual Necessário (por bimestre)"],
        risco: disciplina["Risco de Recuperação"],
        melhorCenario: disciplina["Melhor Cenário (95%)"],
        piorCenario: disciplina["Pior Cenário (5%)"],
        tendencia: disciplina.Tendência,
      })),
      planoDeEstudos: dados.PlanoDeEstudosSugerido,
    });

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
    // Exemplo de dados fixos no mesmo formato
    const dadosExemplo = [
      {
        AnaliseDoBoletim: [
          {
            Disciplina: "Matemática",
            "Média Atual": 6.0,
            "Nota Necessária (por bimestre)": 7.5,
            "Percentual Necessário (por bimestre)": "25%",
            "Risco de Recuperação": "Baixo risco",
            Tendência: "Melhora",
            "Melhor Cenário (95%)": 7.5,
            "Pior Cenário (5%)": 5.5,
          },
        ],
        PlanoDeEstudosSugerido: {
          "Total Geral de Dedicação Semanal": 10,
          "Total Horas Aula (Escola) Semanal": 5,
          "Total Horas Aulas Particulares Sugeridas (Semanal)": 2,
          "Total Horas Estudo Individual Sugeridas (Semanal)": 3,
        },
      },
    ];

    const dados = dadosExemplo[0];

    const html = gerarHtml({
      aluno: "Aluno Exemplo",
      periodo: "Período Exemplo",
      ano: "Ano Exemplo",
      disciplinas: dados.AnaliseDoBoletim.map((disciplina) => ({
        nome: disciplina.Disciplina,
        notaAtual: disciplina["Média Atual"],
        notaNecessaria: disciplina["Nota Necessária (por bimestre)"],
        necessidade: disciplina["Percentual Necessário (por bimestre)"],
        risco: disciplina["Risco de Recuperação"],
        melhorCenario: disciplina["Melhor Cenário (95%)"],
        piorCenario: disciplina["Pior Cenário (5%)"],
        tendencia: disciplina.Tendência,
      })),
      planoDeEstudos: dados.PlanoDeEstudosSugerido,
    });

    const buffer = await criarImagemPuppeteer(html);

    reply.header("Content-Type", "image/png").send(buffer);
  } catch (error) {
    console.error("❌ Erro ao gerar a imagem:", error.message);
    reply.code(500).send({ success: false, error: error.message });
  }
};
