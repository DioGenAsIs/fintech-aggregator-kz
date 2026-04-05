const fallbackTargets = {
  "2291": "https://example.com/offers/2291",
  "4905": "https://example.com/offers/4905",
  "6288": "https://example.com/offers/6288",
  "6322": "https://example.com/offers/6322",
  "6225": "https://example.com/offers/6225",
  "3321": "https://example.com/offers/3321",
};

const allowedParam = (key) =>
  key.startsWith("utm_") || key === "cid" || key.startsWith("sub");

exports.handler = async (event) => {
  const offerId = event.queryStringParameters?.offerId;

  if (!offerId) {
    return {
      statusCode: 302,
      headers: { Location: "/" },
    };
  }

  const envKey = `OFFER_${offerId}_URL`;
  const target = process.env[envKey] ?? fallbackTargets[offerId];

  if (!target) {
    return {
      statusCode: 302,
      headers: { Location: "/" },
    };
  }

  const redirectUrl = new URL(target);

  for (const [key, value] of Object.entries(event.queryStringParameters ?? {})) {
    if (value && allowedParam(key)) {
      redirectUrl.searchParams.set(key, value);
    }
  }

  return {
    statusCode: 302,
    headers: { Location: redirectUrl.toString() },
  };
};
