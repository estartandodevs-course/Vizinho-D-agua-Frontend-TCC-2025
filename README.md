# 🌊 Vizinho D’Água — Frontend

---

## 🎯 Sobre o Projeto

Interface web do projeto Vizinho D’Água, desenvolvida em **React + TypeScript + Vite**, com foco em uma experiência simples, intuitiva e otimizada para dispositivos móveis.

O objetivo é facilitar o registro de **denúncias**, participação em **comunidades**, acesso a **dicas** e acompanhamento de **conteúdos educativos**.

A aplicação exibe funcionalidades como denúncias, comunidades, dicas e alertas. Esta é uma **versão de estudo**, onde parte das informações é apresentada utilizando **dados mockados** para simular o comportamento final.

---

## 📱 Foco em Mobile

O projeto adota a metodologia **mobile-first**, garantindo uma experiência de usuário (UX) otimizada para dispositivos móveis.

---

## 🚀 Funcionalidades e Status de Integração

A tabela abaixo detalha as principais funcionalidades e seu status de integração com a API:

| Funcionalidade | Integração | Descrição |
| :--- | :--- | :--- |
| **📝 Denúncias** | ✅ Real | Criar, editar e visualizar denúncias (Integração real) |
| **👥 Comunidades** | ❌ Mock | Visualizar e simular interações com comunidades (Dados simulados) |
| **💡 Dicas e Conteúdo**| ❌ Mock | Acessar dicas e conteúdos educativos (Dados simulados) |
| **📣 Alertas** | ❌ Mock | Exibição de alertas informativos na Home (Dados simulados) |

---

## 🧰 Tecnologias Utilizadas

* **React 18**
* **TypeScript**
* **Vite**
* **Redux** (store global)
* **React Router DOM**
* **CSS Modules**
* **Arquitetura modular** (`components`/`pages`/`hooks`)

---

## 📂 Estrutura do Projeto

```bash
/
├── public/                # Assets públicos (imagens, PDFs)
├── src/
│   ├── assets/            # Ícones, imagens internas e mídias
│   ├── components/        # Componentes reutilizáveis
│   ├── contexts/          # Context API (estado global)
│   ├── hooks/             # Hooks personalizados
│   ├── mocks/             # Dados mockados para testes
│   ├── pages/             # Telas da aplicação
│   ├── routes/            # Configuração de rotas
│   ├── theme/             # Variáveis e tema global
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```
---
## ⚙️ Como Executar o Projeto

**Observação:** O projeto utiliza dados mockados para a maioria das funcionalidades. **Não é necessário rodar a API** para testar o frontend.

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/estartandodevs-course/Vizinho-D-agua-Frontend-TCC-2025.git
    cd Vizinho-D-agua-Frontend-TCC-2025
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará disponível em: **👉 http://localhost:5173/**

> Recomenda-se **utilizar o modo mobile do navegador** (DevTools) para a melhor experiência.

### 🛠 Build para Produção
Para gerar a versão otimizada para produção:
```bash
npm run build
```
---
📄 Licença

Projeto desenvolvido exclusivamente para o TCC Estartando Devs 2025.
