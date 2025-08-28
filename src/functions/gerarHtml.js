export function gerarHtml(dados) {
  const { aluno, periodo, ano, disciplinas } = dados;

  // Monta as linhas da tabela
  const linhas = disciplinas
    .map((d, i) => {
      const background = i % 2 === 0 ? "#fff" : "#f9f7ff";
      const corRisco =
        d.risco === "Alto risco" || d.risco === "Altíssimo Risco"
          ? "#ef5350"
          : d.risco === "Risco Moderado"
          ? "#ffca28"
          : "#66bb6a"; // verde para "Sem risco" ou outros casos

      return `
        <tr style="background:${background}; height:65px; color:#000;">
          <td style="vertical-align:middle;">${d.nome}</td>
          <td style="vertical-align:middle;">${d.notaAtual}</td>
          <td style="vertical-align:middle;">${d.notaNecessaria}</td>
          <td style="vertical-align:middle;">${d.necessidade}</td>
          <td style="background:${corRisco}; color:#000; font-weight:600; vertical-align:middle;">
            ${d.risco}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color:#000;">
      <div style="background:white; border-radius:16px; padding:25px; box-shadow:0 6px 16px rgba(0,0,0,0.08); max-width:850px; margin:auto; color:#000;">
        <h2 style="margin:0; font-weight:600; font-size:20px; color:#000;">Aluno: ${aluno}</h2>
        <p style="margin:6px 0; font-size:15px; color:#000;">Período Avaliado: ${periodo}</p>
        <p style="margin:6px 0 20px 0; font-size:15px; color:#000;">Ano: ${ano}</p>

        <table style="width:100%; border-collapse: collapse; text-align:center; font-size:15px; border-radius:12px; overflow:hidden; color:#000;">
          <tr style="background-color:#6C63FF; color:#000; font-weight:600; font-size:15px; height:60px;">
            <th>Disciplinas</th>
            <th>Médias atuais</th>
            <th>Nota necessária</th>
            <th>Necessidade</th>
            <th>Análise de Risco Escolar</th>
          </tr>
          ${linhas}
        </table>

        <p style="margin-top:15px; font-size:14px; color:#000;">Demais disciplinas não informadas</p>
      </div>
    </div>
  `;
}
