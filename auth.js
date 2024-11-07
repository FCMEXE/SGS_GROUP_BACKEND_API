const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'seu-segredo-jwt'; // Substitua por uma chave secreta mais forte em produção

app.use(bodyParser.json());

// Mock de usuários para autenticação
const users = [
  { id: 1, username: "user1", password: "senha123", role: "admin" },
  { id: 2, username: "user2", password: "senha321", role: "colaborador" },
];

// Endpoint de login para autenticação e geração do token
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário existe e a senha está correta
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  // Gera o token JWT com informações do usuário
  const accessToken = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' }); // Exemplo de token de refresh

  // Retorna o accessToken, refreshToken e role
  res.json({ access: accessToken, refresh: refreshToken, role: user.role });
});


app.listen(PORT, () => {
  console.log(`API de Autenticação rodando na porta ${PORT}`);
});
