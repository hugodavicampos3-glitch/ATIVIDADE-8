import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Campo = 'nome' | 'descricao' | 'categoria' | 'preco' | 'quantidade';

export default function CadastroProdutoScreen() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [erros, setErros] = useState<Record<Campo, string>>({ nome: '', descricao: '', categoria: '', preco: '', quantidade: '' });

  function validar(campo: Campo) {
    const valor = { nome, descricao, categoria, preco, quantidade }[campo].trim();
    let mensagem = '';
    if (!valor) mensagem = `Informe ${campo === 'nome' ? 'o nome do produto' : campo === 'descricao' ? 'a descrição' : campo === 'categoria' ? 'a categoria' : `o ${campo}`}.`;
    if (campo === 'quantidade' && valor && Number(valor.replace(',', '.')) <= 0) mensagem = 'A quantidade deve ser maior que zero.';
    setErros((anteriores) => ({ ...anteriores, [campo]: mensagem }));
    return !mensagem;
  }

  function alterar(campo: Campo, valor: string, atualizar: (texto: string) => void) {
    atualizar(valor);
    if (erros[campo]) setErros((anteriores) => ({ ...anteriores, [campo]: '' }));
  }

  const formularioValido = !!nome.trim() && !!descricao.trim() && !!categoria.trim() && !!preco.trim() && Number(quantidade.replace(',', '.')) > 0;
  const campos: Array<{ chave: Campo; label: string; placeholder: string; value: string; setValue: (texto: string) => void; keyboardType?: 'default' | 'numeric'; multiline?: boolean }> = [
    { chave: 'nome', label: 'Nome do produto', placeholder: 'Ex.: Caderno universitário', value: nome, setValue: setNome },
    { chave: 'descricao', label: 'Descrição', placeholder: 'Descreva o produto', value: descricao, setValue: setDescricao, multiline: true },
    { chave: 'categoria', label: 'Categoria', placeholder: 'Ex.: Informática, Material Escolar ou Eletrônicos', value: categoria, setValue: setCategoria },
    { chave: 'preco', label: 'Preço', placeholder: 'Ex.: 29,90', value: preco, setValue: setPreco, keyboardType: 'numeric' },
    { chave: 'quantidade', label: 'Quantidade', placeholder: 'Ex.: 1', value: quantidade, setValue: setQuantidade, keyboardType: 'numeric' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Cadastro de produto</Text>
      <Text style={styles.subtitulo}>Preencha os dados para adicionar um novo item.</Text>
      {campos.map((campo) => (
        <View key={campo.chave} style={styles.grupo}>
          <Text style={styles.label}>{campo.label}</Text>
          <TextInput style={[styles.input, campo.multiline && styles.descricao, erros[campo.chave] && styles.inputErro]} placeholder={campo.placeholder} value={campo.value} onChangeText={(texto) => alterar(campo.chave, texto, campo.setValue)} onBlur={() => validar(campo.chave)} keyboardType={campo.keyboardType} multiline={campo.multiline} />
          {!!erros[campo.chave] && <Text style={styles.erro}>{erros[campo.chave]}</Text>}
        </View>
      ))}
      <TouchableOpacity style={[styles.botao, !formularioValido && styles.botaoDesabilitado]} disabled={!formularioValido}>
        <Text style={styles.textoBotao}>CADASTRAR PRODUTO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F4F7FB', flexGrow: 1, padding: 24 }, titulo: { color: '#173B6C', fontSize: 27, fontWeight: '700', marginBottom: 6 }, subtitulo: { color: '#64748B', fontSize: 15, marginBottom: 26 }, grupo: { marginBottom: 14 }, label: { color: '#1E293B', fontSize: 15, fontWeight: '600', marginBottom: 7 }, input: { backgroundColor: '#FFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, fontSize: 16, padding: 14 }, descricao: { height: 92, textAlignVertical: 'top' }, inputErro: { borderColor: '#DC2626', borderWidth: 2 }, erro: { color: '#DC2626', fontSize: 13, marginTop: 5 }, botao: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, marginTop: 10, padding: 15 }, botaoDesabilitado: { backgroundColor: '#94A3B8' }, textoBotao: { color: '#FFF', fontSize: 15, fontWeight: '700' },
});
