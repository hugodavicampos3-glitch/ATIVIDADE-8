import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  function validarEmail() {
    if (!email.trim()) {
      setErroEmail('O e-mail é obrigatório.');
      return false;
    }
    if (!email.includes('@')) {
      setErroEmail('Digite um e-mail válido.');
      return false;
    }
    setErroEmail('');
    return true;
  }

  function validarSenha() {
    if (!senha) {
      setErroSenha('A senha é obrigatória.');
      return false;
    }
    if (senha.length < 6) {
      setErroSenha('A senha deve possuir no mínimo 6 caracteres.');
      return false;
    }
    setErroSenha('');
    return true;
  }

  const formularioValido = email.trim().includes('@') && senha.length >= 6;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acesse sua conta</Text>
      <Text style={styles.subtitulo}>Entre para continuar no CodeClass.</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={[styles.input, erroEmail && styles.inputErro]}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={(texto) => { setEmail(texto); if (erroEmail) setErroEmail(''); }}
        onBlur={validarEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!!erroEmail && <Text style={styles.erro}>{erroEmail}</Text>}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={[styles.input, erroSenha && styles.inputErro]}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={(texto) => { setSenha(texto); if (erroSenha) setErroSenha(''); }}
        onBlur={validarSenha}
        secureTextEntry
      />
      {!!erroSenha && <Text style={styles.erro}>{erroSenha}</Text>}

      <TouchableOpacity style={[styles.botao, !formularioValido && styles.botaoDesabilitado]} disabled={!formularioValido}>
        <Text style={styles.textoBotao}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7FB', padding: 24, justifyContent: 'center' },
  titulo: { color: '#173B6C', fontSize: 28, fontWeight: '700', marginBottom: 6 },
  subtitulo: { color: '#64748B', fontSize: 16, marginBottom: 30 },
  label: { color: '#1E293B', fontSize: 15, fontWeight: '600', marginBottom: 7 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: 10, borderWidth: 1, fontSize: 16, marginBottom: 8, padding: 14 },
  inputErro: { borderColor: '#DC2626', borderWidth: 2 },
  erro: { color: '#DC2626', fontSize: 13, marginBottom: 14 },
  botao: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 10, marginTop: 16, padding: 15 },
  botaoDesabilitado: { backgroundColor: '#94A3B8' },
  textoBotao: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});
