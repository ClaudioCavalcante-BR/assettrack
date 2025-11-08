function fetchWithTimeout(url, ms = 4000, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  const req = fetch(url, { ...opts, signal: ctrl.signal });
  const timeout = new Promise((_, rej) =>
    setTimeout(() => rej(new Error("Timeout na requisição")), ms)
  );
  return Promise.race([req, timeout]).finally(() => clearTimeout(t));
}

export async function fetchCep(cep) {
  const onlyDigits = String(cep || "").replace(/\D/g, "");
  if (!/^\d{8}$/.test(onlyDigits)) 
    throw new Error("CEP inválido (use 8 dígitos)");

  const r = await fetchWithTimeout(`https://viacep.com.br/ws/${onlyDigits}/json/`, 4000);
  if (!r.ok) throw new Error("Falha na consulta do CEP");

  const j = await r.json();
  if (j.erro) throw new Error("CEP não encontrado");
  return j;
}

export async function fetchCepsByAddress(uf, cidade, logradouroPrefix) {
  const UF = String(uf || "").toUpperCase().trim();
  const city = String(cidade || "").trim();
  const log = String(logradouroPrefix || "").trim();
  if (!UF || !city || log.length < 3) {
    throw new Error("Informe UF, cidade e pelo menos 3 letras do logradouro.");
  }
  const u = `https://viacep.com.br/ws/${encodeURIComponent(UF)}/${encodeURIComponent(city)}/${encodeURIComponent(log)}/json/`;

  const r = await fetchWithTimeout(u, 6000);
  if (!r.ok) 
    throw new Error("Falha na consulta de endereços");
  
  const j = await r.json();

  if (!Array.isArray(j)) return [];

  return j.map((it, i) => ({
    id: `${it.cep}-${i}`,
    cep: it.cep || "",
    logradouro: it.logradouro || "",
    complemento: it.complemento || "",
    bairro: it.bairro || "",
    localidade: it.localidade || "",
    uf: it.uf || UF,
    ibge: it.ibge || "",
    ddd: it.ddd || "",
    siafi: it.siafi || ""
  }));
}
