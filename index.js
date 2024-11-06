// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = 3001;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());

// Sincronizar com o banco de dados
sequelize.sync().then(() => {
  console.log("Tabelas sincronizadas.");
});

// Endpoint de login
app.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca o usuário no banco de dados pelo login
    const user = await User.findOne({ where: { login } });

    // Verifica se o usuário existe e se a senha está correta
    if (!user || user.senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gera o token JWT
    const accessToken = jwt.sign({ id: user.id, tipo: user.tipo }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '7d' });

    // Retorna o token e informações do usuário
    res.json({
      access: accessToken,
      refresh: refreshToken,
      nome: user.nome,
      email: user.email,
      tipo: user.tipo
    });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`API de Autenticação rodando na porta ${PORT}`);
});


User.bulkCreate([
    { nome: "John Doe", email: "john@example.com", login: "johndoe", senha: "senha123", tipo: "admin" },
    { nome: "Jane Smith", email: "jane@example.com", login: "janesmith", senha: "senha321", tipo: "usuario" }
  ])
  .then(() => console.log("Usuários adicionados."))
  .catch((err) => console.error("Erro ao adicionar usuários:", err));
  