# ⚙️ TI-Saúde - API & Backend

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
</p>

> Esta é a API responsável por gerenciar os dados do projeto TI-Saúde, lidando com o armazenamento no MongoDB e as regras de negócio do sistema.

---

### 🛠️ Tecnologias
- **Linguagem:** Python
- **Banco de Dados:** MongoDB (NoSQL)
- **Infra:** Render (Hospedagem da API)
- **Segurança:** Variáveis de ambiente (.env) para proteção de credenciais.

---

### 📂 Estrutura de Endpoints (Exemplos)
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| **GET** | `/pacientes` | Retorna a lista de pacientes |
| **POST** | `/quiz` | Envia as respostas do quiz para o banco |

---

### 🔐 Configuração
Para rodar este backend, é necessário configurar o arquivo `.env` com as seguintes chaves:
- `MONGO_URI`
- `PORT`

---

### 👨‍💻 Desenvolvido por Daniel Diniz
