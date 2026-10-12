import axios from "axios";

const APIS = [
  {
    name: "Claude",
    url: "https://api.azbry.com/api/ai/claude",
  },
  {
    name: "GPTFree",
    url: "https://api.azbry.com/api/ai/gptfree",
  },
];

async function askAI(question) {
  let lastError = null;

  for (const api of APIS) {
    try {
      const response = await axios.get(api.url, {
        params: { q: question },
        timeout: 30000,
      });

      const data = response.data;

      if (typeof data === "string") return data;
      if (data?.result) return data.result;
      if (data?.response) return data.response;
      if (data?.answer) return data.answer;
      if (data?.message) return data.message;

      return JSON.stringify(data, null, 2);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    lastError?.response?.data?.message ||
      lastError?.message ||
      "Semua API AI gagal digunakan."
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method tidak diizinkan. Gunakan POST." });
  }

  const { question } = req.body || {};

  if (!question || typeof question !== "string" || !question.trim()) {
    return res.status(400).json({ error: "Pertanyaan tidak boleh kosong." });
  }

  if (question.length > 4000) {
    return res.status(400).json({ error: "Pertanyaan terlalu panjang (maks 4000 karakter)." });
  }

  try {
    const answer = await askAI(question.trim());
    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(502).json({ error: err.message });
  }
}
