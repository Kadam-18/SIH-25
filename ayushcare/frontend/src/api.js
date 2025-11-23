// src/api.js
export const BASE_URL = "http://127.0.0.1:8000";

function buildHeaders(token = null) {
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function apiPost(url, body, token = null) {
  const full = BASE_URL + url;
  console.log("[apiPost] ->", full, "token?", !!token, "body:", body);

  try {
    const res = await fetch(full, {
      method: "POST",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log("[apiPost] response json:", json);
      return json;
    } catch (e) {
      console.error("[apiPost] non-json response:", text);
      return { success: false, message: "Non-JSON response", raw: text, status: res.status };
    }
  } catch (err) {
    console.error("[apiPost] fetch error:", err);
    return { success: false, message: "Network error", error: String(err) };
  }
}

export async function apiGet(url, token = null) {
  const full = BASE_URL + url;
  console.log("[apiGet] ->", full, "token?", !!token);

  try {
    const res = await fetch(full, {
      method: "GET",
      headers: buildHeaders(token),
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log("[apiGet] response json:", json, "status:", res.status);
      return json;
    } catch (e) {
      console.error("[apiGet] non-json response:", text);
      return { success: false, message: "Non-JSON response", raw: text, status: res.status };
    }
  } catch (err) {
    console.error("[apiGet] fetch error:", err);
    return { success: false, message: "Network error", error: String(err) };
  }
}

export async function apiPut(url, body, token = null) {
  const full = BASE_URL + url;
  console.log("[apiPut] ->", full, "token?", !!token, "body:", body);

  try {
    const res = await fetch(full, {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const json = JSON.parse(text);
      console.log("[apiPut] response json:", json);
      return json;
    } catch (e) {
      console.error("[apiPut] non-json response:", text);
      return { success: false, message: "Non-JSON response", raw: text, status: res.status };
    }
  } catch (err) {
    console.error("[apiPut] fetch error:", err);
    return { success: false, message: "Network error", error: String(err) };
  }
}
