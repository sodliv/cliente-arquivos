// Inicializa Supabase
const supabaseUrl = 'https://yihykuogkltxlqmjdcxx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpaHlrdW9na2x0eGxxbWpkY3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTgxNDYsImV4cCI6MjA3ODYzNDE0Nn0.AEamOcEMH01JeM40nxq-Z_Xg7Fe6DHwIWlKsywKrhH0';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Pega o ID do cliente da URL
const clienteId = new URLSearchParams(window.location.search).get('id');

// Função para listar arquivos do Storage
async function listarArquivos(clienteId) {
  const { data: arquivos, error } = await supabaseClient
    .storage
    .from('clientes')
    .list(String(clienteId)); // pasta do cliente

  if (error) {
    console.error('Erro ao listar arquivos:', error);
    document.getElementById('listaArquivos').textContent = 'Erro ao carregar arquivos.';
    return [];
  }

  return arquivos.map(arq => ({
    nome: arq.name,
    url: supabaseClient.storage.from('clientes').getPublicUrl(`${clienteId}/${arq.name}`).data.publicUrl
  }));
}

// Mostra os arquivos no site
listarArquivos(clienteId).then(arquivos => {
  const lista = document.getElementById('listaArquivos');
  if (arquivos.length === 0) {
    lista.textContent = 'Nenhum arquivo encontrado.';
  } else {
    lista.innerHTML = arquivos.map(a => `<a href="${a.url}" target="_blank">${a.nome}</a>`).join('<br>');
  }
});
