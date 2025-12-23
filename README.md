🩺 TI-Saúde – Backend API
Backend do projeto TI-Saúde, desenvolvido para fornecer uma API REST responsável pelo gerenciamento de usuários e dados da aplicação.
O sistema foi pensado para integrar um frontend web e futuramente ferramentas de análise de dados, simulando um ambiente real de aplicação.
📌 Funcionalidades
API REST com Node.js e Express
Cadastro e gerenciamento de usuários
Integração com banco de dados MongoDB
Estrutura organizada para escalabilidade
Comunicação pronta para frontend (React ou similar)
🛠️ Tecnologias Utilizadas
Node.js
Express.js
MongoDB
Mongoose
JavaScript
VS Code
📂 Estrutura do Projeto

ti-saude-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── app.js
├── .env.example
├── package.json
├── package-lock.json
└── README.md

▶️ Como Executar o Projeto
1️⃣ Clonar o repositório

git clone https://github.com/dinizdaniel284/ti-saude-backend.git

2️⃣ Acessar a pasta
cd ti-saude-backend

3️⃣ Instalar as dependências
npm install

4️⃣ Configurar variáveis de ambiente
Crie um arquivo .env baseado no .env.example e configure:
PORT=3000
MONGODB_URI=sua_string_de_conexao

5️⃣ Executar o servidor
npm run dev

O servidor estará disponível em: http://localhost:3000


🔗 Endpoints Principais (exemplo)
Método
Rota
Descrição
GET
/users
Lista usuários
POST
/users
Cria novo usuário
GET
/users/:id
Busca usuário por ID
PUT
/users/:id
Atualiza usuário
DELETE
/users/:id
Remove usuário
🎯 Objetivo do Projeto
Este backend foi desenvolvido com o objetivo de:
Praticar criação de APIs REST
Aplicar conceitos de backend profissional
Integrar banco de dados NoSQL
Servir como base para um projeto completo Full Stack
🚀 Próximas Melhorias (Roadmap)
Implementar autenticação (JWT)
Validação de dados
Paginação e filtros
Documentação com Swagger
Deploy em produção (Render)
👨‍💻 Autor
Daniel Diniz
Estudante de Análise e Desenvolvimento de Sistemas
Foco em Backend, com experiência em APIs REST e MongoDB
🔗 GitHub: https://github.com/dinizdaniel284
