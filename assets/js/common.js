// assets/js/common.js
const SUPABASE_URL = "https://ynirnyysgicmrwxtqkht.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluaXJueXlzZ2ljbXJ3eHRxa2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzMxNjEsImV4cCI6MjA3OTE0OTE2MX0.xKhdbDqeDnumPYDjyYR-DN2-V7Y2BF1vIM8o_l5l8Jw"; // reemplaza por tu key anon

async function apiInsert(table, payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Error al guardar en la base de datos");
  }

  return res.json();
}

// Helper para generar descargas en CSV desde arrays JS
function downloadCSV(filename, rows) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(";"),
    ...rows.map(row => headers.map(h => `"${(row[h] ?? "").toString().replace(/"/g, '""')}"`).join(";"))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
