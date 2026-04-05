exports.handler = async (event) => {
  const token = event.headers["x-postback-token"];
  const expectedToken = process.env.POSTBACK_TOKEN;

  if (!expectedToken || token !== expectedToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ ok: false, message: "Unauthorized" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, receivedAt: new Date().toISOString() }),
  };
};
