const BASE_URL = "/api";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || `Request failed: ${response.status}`);
  }
  return data;
}

export async function fetchFeatured() {
  return request("/featured");
}

export async function fetchCompanies() {
  return request("/companies");
}

export async function fetchCompany(ticker) {
  return request(`/companies/${encodeURIComponent(ticker)}`);
}

export async function fetchReport(ticker) {
  return request(`/reports/${encodeURIComponent(ticker)}`);
}

export async function fetchEarnings(status) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return request(`/earnings${query}`);
}

export async function fetchScreening() {
  return request("/screening");
}

export async function healthCheck() {
  return request("/health");
}

export async function fetchMarketPulse() {
  return request("/market-pulse");
}

export async function checkFreshness() {
  return request("/freshness");
}

export async function triggerPipeline() {
  const response = await fetch(`${BASE_URL}/pipeline/run`, { method: "POST" });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || `Pipeline failed: ${response.status}`);
  }
  return data;
}
