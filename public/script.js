import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'SUA_URL_AQUI';
const supabaseAnonKey = 'SUA_ANON_KEY_AQUI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function carregarCliente() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const { data: cliente } = await supabase
    .from('clientes')
    .select('*')
    .eq('id', id)
    .single();

  document.getElementById("cliente-nome").innerText =
    `Cliente: ${cliente.nome}`;

  const { data: arquivos } = await supabase
    .storage
    .from('clientes')
    .list(cliente.pasta);

  const lista = document.getElementById("lista-arquivos");

  arquivos.forEach(arquivo => {
    const link = supabase.storage
      .from('clientes')
      .getPublicUrl(`${cliente.pasta}/${arquivo.name}`).data.publicUrl;

    const li = document.createElement('li');
    li.innerHTML = `<a href="${link}" target="_blank">${arquivo.name}</a>`;
    lista.appendChild(li);
  });
}

carregarCliente();
