const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Jota',
  password: '3631Jotinha',
  database: 'forca',
  insecureAuth: true
});

// Conecta ao banco de dados
connection.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
  }
});

// Middleware para permitir análise do corpo das solicitações em formato JSON
app.use(express.json());

// Middleware para permitir análise do corpo das solicitações em formato URL-encoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/css/estilo.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/estilo.css');
});

app.get('/cadastro.html', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

app.get('/css/estilo.css', (req, res) => {
  res.sendFile(__dirname + '/public/css/estilo.css');
});


// Rota para registrar um novo usuário
app.post('/registro', (req, res) => {
  console.log('Rota /registro foi acessada.');

  const { usuario, nick, email, password, dtNascimento } = req.body;
  console.log('Dados do formulário:', usuario, nick, email, password, dtNascimento);
  const emailQuery = `SELECT * FROM users WHERE email = ?`;
  connection.query(emailQuery, [email], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao processar o registro.');
    } else {
      if (results.length > 0) {
        // O email já está em uso
        res.status(409).send('O email já está em uso.');
      } else {
        // Insere o novo usuário no banco de dados
        const insertQuery = `INSERT INTO users (usuario, nick, email, password, dtNascimento) VALUES (?, ?, ?, ?, ?)`;
        connection.query(insertQuery, [usuario, nick, email, password, dtNascimento], (err) => {
          if (err) {
            console.error('Erro ao inserir o usuário:', err);
            res.status(500).send('Erro ao processar o registro.');
          } else {
            // Registro bem-sucedido
            res.status(200).send('Registro bem-sucedido!');
          }
        });
      }
    }
  });
});
// Rota para validar o login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Consulta o banco de dados para verificar o login
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro ao processar o login.');
    } else {
      if (results.length === 1) {
        // Login válido
        res.status(200).send('Login bem-sucedido!');
      } else {
        // Login inválido
        res.status(401).send('Credenciais inválidas.');
      }
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
