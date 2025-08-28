import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import imageRoutes from "./routes/imageRoutes.js";

const app = fastify({ logger: true });

app.register(fastifyCors);
app.register(imageRoutes);

app
  .listen({ port: 3333, host: "0.0.0.0" })
  .then(() => console.log("Servidor rodando!"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
