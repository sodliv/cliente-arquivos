// URL do seu Supabase
const SUPABASE_URL = "https://yihykuogkltxlqmjdcxx.supabase.co";

// ANON KEY do seu Supabase
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaHlrdW9na2x0eGxxbWpkY3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTgxNDYsImV4cCI6MjA3ODYzNDE0Nn0.AEamOcEMH01JeM40nxq-Z_Xg7Fe6DHwIWlKsywKrhH0";

// Criar cliente do Supabase CORRETAMENTE
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Pega o ID da URL
const params = new URLSearchParams(window.location.search);
const clientId = params.get("id");

// Carrega arquivos
async function loadFiles() {

    const { data, error } = await supabaseClient
        .from("arquivos_clientes")
        .select("*")
        .eq("cliente_id", clientId);

    if (error) {
        console.error("Erro Supabase:", error);
        return;
    }

    const container = document.getElementById("files");
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = "<p>Nenhum arquivo encontrado.</p>";
        return;
    }

    data.forEach(file => {
        const link = document.createElement("a");
        link.href = file.url;
        link.textContent = file.nome_arquivo;
        link.target = "_blank";

        const div = document.createElement("div");
        div.appendChild(link);
        container.appendChild(div);
    });
}

loadFiles();
