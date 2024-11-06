const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { Usuarios } = require('./models/users'); // Importa o modelo de usuários
require('dotenv').config();

const app = express();
const PORT = 3001;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json()); // Endpoint de login para autenticação e geração do token
app.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    // Busca o usuário no banco de dados com base no login e senha fornecidos
    const user = await Usuarios.findOne({ where: { login, senha } });
     if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Gera o token JWT com informações do usuário
    const accessToken = jwt.sign({ id: user.ID, tipo: user.tipo }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: user.ID }, SECRET_KEY, { expiresIn: '7d' });

    // Retorna o accessToken, refreshToken e tipo do usuário
    res.json({ access: accessToken, refresh: refreshToken, tipo: user.tipo });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
})
app.listen(PORT, () => {
  console.log(`API de Autenticação rodando na porta ${PORT}`);
});
