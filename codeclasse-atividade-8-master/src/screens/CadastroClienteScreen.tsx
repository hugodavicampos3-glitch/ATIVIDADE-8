import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Campo = 'nome' | 'email' | 'endereco' | 'telefone' | 'cidade' | 'bairro' | 'estado';

export default function CadastroClienteScreen() {
  const [nome, setNome] = useState(''); const [email, setEmail] = useState(''); const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState(''); const [cidade, setCidade] = useState(''); const [bairro, setBairro] = useState(''); const [estado, setEstado] = useState('');
  const [erros, setErros] = useState<Record<Campo, string>>({ nome: '', email: '', endereco: '', telefone: '', cidade: '', bairro: '', estado: '' });
  const valores = { nome, email, endereco, telefone, cidade, bairro, estado };

  function validar(campo: Campo) {
    const valor = valores[campo].trim(); let mensagem = '';
    if (!valor) mensagem = `Informe ${campo === 'nome' ? 'o nome' : campo === 'email' ? 'o e-mail' : campo === 'endereco' ? 'o endereço' : campo === 'telefone' ? 'o telefone' : `a ${campo}`}.`;
    if (campo === 'email' && valor && !valor.includes('@')) mensagem = 'Digite um e-mail válido.';
    if (campo === 'telefone' && valor && valor.replace(/\D/g, '').length < 10) mensagem = 'O telefone deve possuir pelo menos 10 números.';
    setErros((anteriores) => ({ ...anteriores, [campo]: mensagem }));
  }
  function alterar(campo: Campo, valor: string, atualizar: (texto: string) => void) { atualizar(valor); if (erros[campo]) setErros((anteriores) => ({ ...anteriores, [campo]: '' })); }

  const formularioValido = !!nome.trim() && email.trim().includes('@') && !!endereco.trim() && telefone.replace(/\D/g, '').length >= 10 && !!cidade.trim() && !!bairro.trim() && !!estado.trim();
  const campos: Array<{ chave: Campo; label: string; placeholder: string; value: string; setValue: (texto: string) => void; keyboardType?: 'default' | 'email-address' | 'phone-pad'; autoCapitalize?: 'none' | 'words' | 'characters' }> = [
    { chave: 'nome', label: 'Nome', placeholder: 'Digite o nome completo', value: nome, setValue: setNome, autoCapitalize: 'words' }, { chave: 'email', label: 'E-mail', placeholder: 'Digite seu e-mail', value: email, setValue: setEmail, keyboardType: 'email-address', autoCapitalize: 'none' }, { chave: 'endereco', label: 'Endereço', placeholder: 'Rua das Flores, 120, Pernambuco', value: endereco, setValue: setEndereco, autoCapitalize: 'words' }, { chave: 'telefone', label: 'Telefone', placeholder: '(00) 00000-0000', value: telefone, setValue: setTelefone, keyboardType: 'phone-pad' }, { chave: 'cidade', label: 'Cidade', placeholder: 'Digite a cidade', value: cidade, setValue: setCidade, autoCapitalize: 'words' }, { chave: 'bairro', label: 'Bairro', placeholder: 'Digite o bairro', value: bairro, setValue: setBairro, autoCapitalize: 'words' }, { chave: 'estado', label: 'Estado', placeholder: 'Ex.: MG ou SP', value: estado, setValue: setEstado, autoCapitalize: 'characters' },
  ];
  return <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled"><Text style={styles.titulo}>Cadastro de cliente</Text><Text style={styles.subtitulo}>Informe os dados para criar um novo cadastro.</Text>{campos.map((campo) => <View key={campo.chave} style={styles.grupo}><Text style={styles.label}>{campo.label}</Text><TextInput style={[styles.input, erros[campo.chave] && styles.inputErro]} placeholder={campo.placeholder} value={campo.value} onChangeText={(texto) => alterar(campo.chave, texto, campo.setValue)} onBlur={() => validar(campo.chave)} keyboardType={campo.keyboardType} autoCapitalize={campo.autoCapitalize} autoCorrect={false} />{!!erros[campo.chave] && <Text style={styles.erro}>{erros[campo.chave]}</Text>}</View>)}<TouchableOpacity style={[styles.botao, !formularioValido && styles.botaoDesabilitado]} disabled={!formularioValido}><Text style={styles.textoBotao}>CADASTRAR CLIENTE</Text></TouchableOpacity></ScrollView>;
}

const styles = StyleSheet.create({ container: { backgroundColor: '#F4F7FB', flexGrow: 1, padding: 24 }, titulo: { color: '#173B6C', fontSize: 27, fontWeight: '700', marginBottom: 6 }, subtitulo: { color: '#64748B', fontSize: 15, marginBottom: 26 }, grupo: { marginBottom: 14 }, label: { color: '#1E293B', fontSize: 15, fontWeight: '600', marginBottom: 7 }, input: { backgroundColor: '#FFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, fontSize: 16, padding: 14 }, inputErro: { borderColor: '#DC2626', borderWidth: 2 }, erro: { color: '#DC2626', fontSize: 13, marginTop: 5 }, botao: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, marginTop: 10, padding: 15 }, botaoDesabilitado: { backgroundColor: '#94A3B8' }, textoBotao: { color: '#FFF', fontSize: 15, fontWeight: '700' } });
