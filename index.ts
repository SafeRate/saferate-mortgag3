import { Hono } from "hono";

const app = new Hono();

app.get("/hello", (c) => {
  return c.text("hello");
});

app.get("/greet/:name", async (c) => {
  const name = c.req.param("name");

  if (!name) {
    return c.json({ message: "Missing route param for `name`!" }, 400);
  }

  return c.json({ message: `Hello ${name}!` });
});

app.post("/submit", async (c) => {
  const data = await c.req.json();
  return c.json({
    body: data,
    message: "You just posted data",
  });
});

app.fire();
