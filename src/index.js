import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import imageRoutes from "./routes/imageRoutes.js";

const app = fastify({ logger: true });
const PORT = process.env.PORT || 3333;

app.register(fastifyCors);
app.register(imageRoutes);

app
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log("Servidor rodando!"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
