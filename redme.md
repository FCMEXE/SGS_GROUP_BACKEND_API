Bom dia, Instruções para rodar a API

entre no erminal do VSCODE,
selecione o terminal BASH
escreva "node auth.js" e clique enter
abra outro terminal BASH
escreva "node colaboradores.js" e clique enter

muito bem!
esta indo bem!
abra o ThunferClient pelo VSCODE ou Postman ou Insominia tanto faz

teste a url GET http://localhost:3000/collaborators fazendo GET!!
se retonou os dados do "fe", esta funcionando

senha como adm:
user: user1
password: senha123

do collaborador é qualquer uma dessas (pra validar o login é Username e password):
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