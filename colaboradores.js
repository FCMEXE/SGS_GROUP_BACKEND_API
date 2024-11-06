const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

//Endpoint para Registrar um Ponto
app.post('/pontos', async (req, res) => {
  const { userId, day, entryTime, exitTime, lunchStart, lunchEnd } = req.body;

  try {
    const novoPonto = await Ponto.create({
      userId,
      day,
      entryTime,
      exitTime,
      lunchStart,
      lunchEnd
    });
    res.status(201).json(novoPonto);
  } catch (error) {
    console.error('Erro ao adicionar ponto:', error);
    res.status(500).json({ message: 'Erro ao adicionar ponto' });
  }
});

//Endpoint para Obter Pontos de um Usuário
app.get('/pontos/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const pontos = await Ponto.findAll({ where: { userId } });
    res.json(pontos);
  } catch (error) {
    console.error('Erro ao obter pontos:', error);
    res.status(500).json({ message: 'Erro ao obter pontos' });
  }
});



app.use(bodyParser.json());

// Mock de colaboradores para fins de exemplo
let collaborators = [];

// Função para resetar os horários de entrada, saída e almoço dos colaboradores
const resetSchedules = () => {
  collaborators.forEach(collaborator => {
    collaborator.schedules = {
      segunda: { entry: null, exit: null, lunch: { start: null, end: null } },
      terca: { entry: null, exit: null, lunch: { start: null, end: null } },
      quarta: { entry: null, exit: null, lunch: { start: null, end: null } },
      quinta: { entry: null, exit: null, lunch: { start: null, end: null } },
      sexta: { entry: null, exit: null, lunch: { start: null, end: null } },
      sabado: { entry: null, exit: null, lunch: { start: null, end: null } },
      domingo: { entry: null, exit: null, lunch: { start: null, end: null } }
    };
  });
  console.log('Horários dos colaboradores resetados');
};

// Chama a função de reset todo domingo à meia-noite
cron.schedule('0 0 * * 0', resetSchedules);

// Endpoint para adicionar um colaborador
app.post('/collaborators', (req, res) => {
  const { name, password, cpf, birthDate, admissionDate, status } = req.body;

  // Cria um novo colaborador com um ID único
  const newCollaborator = {
    id: collaborators.length + 1,
    name,
    password,
    cpf,
    birthDate,
    admissionDate,
    status,
    schedules: { // Armazena horários de entrada, saída e almoço
      segunda: { entry: null, exit: null, lunch: { start: null, end: null } },
      terca: { entry: null, exit: null, lunch: { start: null, end: null } },
      quarta: { entry: null, exit: null, lunch: { start: null, end: null } },
      quinta: { entry: null, exit: null, lunch: { start: null, end: null } },
      sexta: { entry: null, exit: null, lunch: { start: null, end: null } },
      sabado: { entry: null, exit: null, lunch: { start: null, end: null } },
      domingo: { entry: null, exit: null, lunch: { start: null, end: null } }
    }
  };

  collaborators.push(newCollaborator);
  res.status(201).json(newCollaborator);
});

// Endpoint para excluir um colaborador
// Endpoint para excluir um colaborador
app.delete('/collaborators/:id', (req, res) => {
  const { id } = req.params;
  // Lógica para encontrar e excluir o colaborador com o ID fornecido
  const collaboratorIndex = collaborators.findIndex(collaborator => collaborator.id === parseInt(id));
  
  if (collaboratorIndex !== -1) {
    const removedCollaborator = collaborators.splice(collaboratorIndex, 1); // Remove o colaborador
    
    // Aqui você pode adicionar qualquer lógica adicional se necessário
    // Por exemplo, você pode armazenar em um log ou realizar outras ações

    res.status(204).send(); // No content
  } else {
    res.status(404).send({ message: 'Colaborador não encontrado' }); // Não encontrado
  }
});


// Endpoint para obter todos os colaboradores
app.get('/collaborators', (req, res) => {
  res.json(collaborators);
});

// Endpoint para atualizar os horários de um colaborador
app.patch('/collaborators/:id/schedules', (req, res) => {
  const { id } = req.params;
  const { day, entry, exit, lunchStart, lunchEnd } = req.body;

  const collaborator = collaborators.find(c => c.id === parseInt(id));
  if (!collaborator) {
    return res.status(404).json({ message: 'Colaborador não encontrado' });
  }

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
    res.status(400).json({ message: 'Dia inválido. Use: segunda, terca, quarta, quinta, sexta, sabado, domingo.' });
  }
});

// Função para calcular horas trabalhadas
function calculateHoursWorked(entry, exit) {
  // Implemente a lógica para calcular as horas trabalhadas com base nos horários de entrada e saída
  return 'Horas calculadas'; // Exemplo; substitua pela lógica real
}

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
