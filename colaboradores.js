const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Mock de colaboradores para fins de exemplo
let collaborators = [
  { 
    id: 1, 
    username: "fe", 
    password: "password123", 
    name: "Felipe Camargo", 
    status: "em rota",
    cpf: "123.456.789-00", 
    birthDate: "1990-01-01", 
    admissionDate: "2020-05-15", 
    schedules: {
      monday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      tuesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      wednesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      thursday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      friday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      saturday: { entry: "08:00", exit: "12:00", lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 2, 
    username: "john_doe", 
    password: "johnpassword", 
    name: "John Doe", 
    status: "online",
    cpf: "987.654.321-00", 
    birthDate: "1985-03-22", 
    admissionDate: "2018-02-01", 
    schedules: {
      monday: { entry: "09:00", exit: "18:00", lunch: { start: "13:00", end: "14:00" } },
      tuesday: { entry: "09:00", exit: "18:00", lunch: { start: "13:00", end: "14:00" } },
      wednesday: { entry: "09:00", exit: "18:00", lunch: { start: "13:00", end: "14:00" } },
      thursday: { entry: "09:00", exit: "18:00", lunch: { start: "13:00", end: "14:00" } },
      friday: { entry: "09:00", exit: "18:00", lunch: { start: "13:00", end: "14:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 3, 
    username: "susan_smith", 
    password: "susanpassword", 
    name: "Susan Smith", 
    status: "online",
    cpf: "321.654.987-00", 
    birthDate: "1992-07-10", 
    admissionDate: "2021-11-11", 
    schedules: {
      monday: { entry: "07:30", exit: "16:30", lunch: { start: "12:30", end: "13:00" } },
      tuesday: { entry: "07:30", exit: "16:30", lunch: { start: "12:30", end: "13:00" } },
      wednesday: { entry: "07:30", exit: "16:30", lunch: { start: "12:30", end: "13:00" } },
      thursday: { entry: "07:30", exit: "16:30", lunch: { start: "12:30", end: "13:00" } },
      friday: { entry: "07:30", exit: "16:30", lunch: { start: "12:30", end: "13:00" } },
      saturday: { entry: "08:00", exit: "12:00", lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 4, 
    username: "maria_oliveira", 
    password: "mariapassword", 
    name: "Maria Oliveira", 
    status: "online",
    cpf: "654.987.321-00", 
    birthDate: "1994-12-05", 
    admissionDate: "2022-06-20", 
    schedules: {
      monday: { entry: "10:00", exit: "19:00", lunch: { start: "14:00", end: "15:00" } },
      tuesday: { entry: "10:00", exit: "19:00", lunch: { start: "14:00", end: "15:00" } },
      wednesday: { entry: "10:00", exit: "19:00", lunch: { start: "14:00", end: "15:00" } },
      thursday: { entry: "10:00", exit: "19:00", lunch: { start: "14:00", end: "15:00" } },
      friday: { entry: "10:00", exit: "19:00", lunch: { start: "14:00", end: "15:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 5, 
    username: "pedro_silva", 
    password: "pedropassword", 
    name: "Pedro Silva", 
    status: "em rota",
    cpf: "111.222.333-44", 
    birthDate: "1988-09-15", 
    admissionDate: "2019-01-10", 
    schedules: {
      monday: { entry: "08:30", exit: "17:30", lunch: { start: "12:30", end: "13:30" } },
      tuesday: { entry: "08:30", exit: "17:30", lunch: { start: "12:30", end: "13:30" } },
      wednesday: { entry: "08:30", exit: "17:30", lunch: { start: "12:30", end: "13:30" } },
      thursday: { entry: "08:30", exit: "17:30", lunch: { start: "12:30", end: "13:30" } },
      friday: { entry: "08:30", exit: "17:30", lunch: { start: "12:30", end: "13:30" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 6, 
    username: "anna_maria", 
    password: "annapassword", 
    name: "Anna Maria", 
    status: "online",
    cpf: "567.890.123-45", 
    birthDate: "1982-05-20", 
    admissionDate: "2015-08-10", 
    schedules: {
      monday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      tuesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      wednesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      thursday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      friday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      saturday: { entry: "09:00", exit: "13:00", lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 7, 
    username: "lucas_santos", 
    password: "lucaspassword", 
    name: "Lucas Santos", 
    status: "em rota",
    cpf: "234.567.890-12", 
    birthDate: "1991-06-30", 
    admissionDate: "2017-12-18", 
    schedules: {
      monday: { entry: "09:30", exit: "18:30", lunch: { start: "13:30", end: "14:00" } },
      tuesday: { entry: "09:30", exit: "18:30", lunch: { start: "13:30", end: "14:00" } },
      wednesday: { entry: "09:30", exit: "18:30", lunch: { start: "13:30", end: "14:00" } },
      thursday: { entry: "09:30", exit: "18:30", lunch: { start: "13:30", end: "14:00" } },
      friday: { entry: "09:30", exit: "18:30", lunch: { start: "13:30", end: "14:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 8, 
    username: "juliana_souza", 
    password: "juliapassword", 
    name: "Juliana Souza", 
    status: "online",
    cpf: "345.678.901-23", 
    birthDate: "1984-11-14", 
    admissionDate: "2020-03-17", 
    schedules: {
      monday: { entry: "08:30", exit: "17:30", lunch: { start: "12:00", end: "13:00" } },
      tuesday: { entry: "08:30", exit: "17:30", lunch: { start: "12:00", end: "13:00" } },
      wednesday: { entry: "08:30", exit: "17:30", lunch: { start: "12:00", end: "13:00" } },
      thursday: { entry: "08:30", exit: "17:30", lunch: { start: "12:00", end: "13:00" } },
      friday: { entry: "08:30", exit: "17:30", lunch: { start: "12:00", end: "13:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 9, 
    username: "pedro_gomes", 
    password: "pedrogomespassword", 
    name: "Pedro Gomes", 
    status: "offline",
    cpf: "456.789.012-34", 
    birthDate: "1993-10-11", 
    admissionDate: "2019-05-25", 
    schedules: {
      monday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      tuesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      wednesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      thursday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      friday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  },
  { 
    id: 10, 
    username: "paula_oliveira", 
    password: "paulapassword", 
    name: "Paula Oliveira", 
    status: "online",
    cpf: "567.890.123-45", 
    birthDate: "1992-02-15", 
    admissionDate: "2023-04-12", 
    schedules: {
      monday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      tuesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      wednesday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      thursday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      friday: { entry: "08:00", exit: "17:00", lunch: { start: "12:00", end: "13:00" } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  }
];



// Endpoint para registrar o ponto (entrada e saída)
app.post('/attendance', (req, res) => {
  const { id, entry, exit } = req.body;

  // Verifica se os dados necessários foram enviados
  if (!id || !entry || !exit) {
    return res.status(400).json({ message: 'Faltando dados obrigatórios (id, entry, exit).' });
  }

  const collaborator = collaborators.find(c => c.id === parseInt(id));
  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador não encontrado' });
  }

  // Atualiza o horário de entrada e saída para o colaborador
  collaborator.schedules.monday.entry = entry;  // Ou o dia correto, dependendo da lógica de como registrar
  collaborator.schedules.monday.exit = exit;    // Ou o dia correto

  res.status(200).json({
    message: 'Ponto registrado com sucesso!',
    collaborator: {
      id: collaborator.id,
      name: collaborator.name,
      entry,
      exit
    }
  });
});


// Endpoint para adicionar um colaborador
app.post('/collaborators', (req, res) => {
  const { username, password, cpf, birthDate, admissionDate, status, name } = req.body;

  // Verifica se o username já existe
  const existingCollaborator = collaborators.find(c => c.username === username);
  if (existingCollaborator) {
    return res.status(400).json({ message: 'Username já existe!' });
  }

  // Cria um novo colaborador com um ID único
  const newCollaborator = {
    id: collaborators.length + 1,
    username,
    password,
    name,
    cpf, // Adicionando CPF
    birthDate, // Adicionando data de nascimento
    admissionDate, // Adicionando data de admissão
    status,
    schedules: {
      monday: { entry: null, exit: null, lunch: { start: null, end: null } },
      tuesday: { entry: null, exit: null, lunch: { start: null, end: null } },
      wednesday: { entry: null, exit: null, lunch: { start: null, end: null } },
      thursday: { entry: null, exit: null, lunch: { start: null, end: null } },
      friday: { entry: null, exit: null, lunch: { start: null, end: null } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  };

  // Adiciona o novo colaborador à lista
  collaborators.push(newCollaborator);

  res.status(201).json({
    message: 'Colaborador criado!',
    collaborator: {
      id: newCollaborator.id,
      username: newCollaborator.username,
      name: newCollaborator.name,
      cpf: newCollaborator.cpf, // Incluindo CPF na resposta
      birthDate: newCollaborator.birthDate, // Incluindo data de nascimento na resposta
      admissionDate: newCollaborator.admissionDate, // Incluindo data de admissão na resposta
      status: newCollaborator.status
    }
  });
});

// Endpoint GET para pegar os horários de um colaborador para um dia específico
app.get('/collaborators/:id/schedules', (req, res) => {
  const { id } = req.params;
  const { day } = req.query;  // Obtém o valor do query parameter 'day'

  const collaborator = collaborators.find(c => c.id === parseInt(id));
  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador não encontrado' });
  }

  // Verifica se o dia informado é válido
  const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  if (!validDays.includes(day)) {
    return res.status(400).json({ message: 'Dia inválido. Use: monday, tuesday, wednesday, thursday, friday, saturday, sunday.' });
  }

  // Retorna os horários para o dia solicitado
  res.json({
    day: day,
    schedules: collaborator.schedules[day]
  });
});



// Endpoint para excluir um colaborador
app.delete('/collaborators/:id', (req, res) => {
  const { id } = req.params;
  const collaboratorIndex = collaborators.findIndex(collaborator => collaborator.id === parseInt(id));
  
  if (collaboratorIndex !== -1) {
    collaborators.splice(collaboratorIndex, 1); // Remove o colaborador
    res.status(204).send();
  } else {
    res.status(404).send({ message: 'Colaborador não encontrado' });
  }
});

// Endpoint para obter um colaborador pelo ID
app.get('/collaborators/:id', (req, res) => {
  const { id } = req.params;
  const collaborator = collaborators.find(c => c.id === parseInt(id));

  if (collaborator) {
    res.json({
      id: collaborator.id,
      username: collaborator.username,
      name: collaborator.name,
      cpf: collaborator.cpf, // Incluindo CPF na resposta
      birthDate: collaborator.birthDate, // Incluindo data de nascimento na resposta
      admissionDate: collaborator.admissionDate, // Incluindo data de admissão na resposta
      status: collaborator.status
    });
  } else {
    res.status(404).json({ message: 'Colaborador não encontrado' });
  }
});

// Endpoint para obter todos os colaboradores
app.get('/collaborators', (req, res) => {
  res.json(collaborators); // Retorna todos os colaboradores cadastrados
});

// Endpoint para atualizar os horários de um colaborador
app.patch('/collaborators/:id/schedules', (req, res) => {
  const { id } = req.params;
  const { day, entry, exit, lunchStart, lunchEnd } = req.body;

  const collaborator = collaborators.find(c => c.id === parseInt(id));
  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador não encontrado' });
  }

  // Validação de horários
 

  // Atualiza os horários para o dia especificado
  if (collaborator.schedules[day]) {
    collaborator.schedules[day] = {
      entry: entry || collaborator.schedules[day].entry,
      exit: exit || collaborator.schedules[day].exit,
      lunch: {
        start: lunchStart || collaborator.schedules[day].lunch.start,
        end: lunchEnd || collaborator.schedules[day].lunch.end
      }
    };
    res.json(collaborator);
  } else {
    res.status(400).json({ message: 'Dia inválido. Use: monday, tuesday, wednesday, thursday, friday, saturday, sunday.' });
  }
});

// Função para resetar os horários de entrada, saída e almoço dos colaboradores
const resetSchedules = () => {
  collaborators.forEach(collaborator => {
    collaborator.schedules = {
      monday: { entry: null, exit: null, lunch: { start: null, end: null } },
      tuesday: { entry: null, exit: null, lunch: { start: null, end: null } },
      wednesday: { entry: null, exit: null, lunch: { start: null, end: null } },
      thursday: { entry: null, exit: null, lunch: { start: null, end: null } },
      friday: { entry: null, exit: null, lunch: { start: null, end: null } },
      saturday: { entry: null, exit: null, lunch: { start: null, end: null } },
      sunday: { entry: null, exit: null, lunch: { start: null, end: null } }
    };
  });
  console.log('Horários dos colaboradores resetados');
};

// Chama a função de reset todo domingo à meia-noite
cron.schedule('0 0 * * 0', resetSchedules);

// Função para calcular horas trabalhadas
function calculateHoursWorked(entry, exit) {
  if (!entry || !exit) return 0;
  
  const [entryHours, entryMinutes] = entry.split(':').map(Number);
  const [exitHours, exitMinutes] = exit.split(':').map(Number);
  
  const entryTime = entryHours * 60 + entryMinutes;
  const exitTime = exitHours * 60 + exitMinutes;
  
  const totalMinutes = exitTime - entryTime;
  return totalMinutes > 0 ? totalMinutes / 60 : 0;
}

// Endpoint GET /login para retornar todos os colaboradores e suas senhas
app.get('/login', (req, res) => {
  // Mapeia todos os colaboradores e retorna o username e senha
  const loginDetails = collaborators.map(c => ({
    username: c.username,
    password: c.password
  }));

  res.status(200).json({
    message: 'Lista de usuários e senhas.',
    loginDetails
  });
});

// Endpoint para atualizar o status de um colaborador
app.patch('/collaborators/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // status deve ser passado no corpo da requisição

  // Validação simples do status
  const validStatuses = ['online', 'offline', 'almoço'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Status inválido. Use: "online", "offline", ou "almoço".' });
  }

  const collaborator = collaborators.find(c => c.id === parseInt(id));
  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador não encontrado' });
  }

  // Atualiza o status do colaborador
  collaborator.status = status;

  // Retorna o colaborador atualizado
  res.json({
    message: 'Status atualizado com sucesso!',
    collaborator: {
      id: collaborator.id,
      name: collaborator.name,
      status: collaborator.status
    }
  });
});



// Endpoint para login
app.post('/login', (req, res) => {
  const { username, password } = req.body;



  const collaborator = collaborators.find(c => c.username === username && c.password === password);

  if (collaborator) {
    res.status(200).json({
      message: 'Login bem-sucedido!',
      collaborator: {
        id: collaborator.id,
        name: collaborator.name,
        status: collaborator.status
      }
    });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
