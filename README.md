# AssetTrack

Aplicação web para gestão do ciclo de vida de ativos corporativos, com cadastro, listagem, edição e exclusão de ativos, além de consulta de endereço por CEP. Construído com React + Vite, React Router, React Query, Context/Redux e MUI DataGrid. Integra ViaCEP e está preparado para cruzar dados do IBGE Localidades, buscando o número do IBGE relacionado a localização.

---

## Sumário

1. Objetivos
2. Principais funcionalidades
3. Stack de tecnologias
4. Arquitetura e diretrizes
5. Estrutura de pastas
6. Como executar
7. Scripts NPM
8. Configurações e variáveis
9. Qualidade e padrões
10. Testes manuais sugeridos
11. Compatibilidade entre navegadores
12. Solução de problemas
13. Segurança e privacidade
14. Licença
15. Autor

---

## 1. Objetivos

- Centralizar informações dos ativos: identificação, categoria, localização, valor e status.
- Disponibilizar um CRUD simples, responsivo e com boa usabilidade.
- Agilizar cadastros via consulta de CEP e autopreenchimento.
- Manter base de código limpa, escalável e fácil de evoluir.

---

## 2. Principais funcionalidades

- CRUD de ativos com formulário controlado e tabela rica (paginação, colunas manualmente ajustáveis e configuráveis).
- Busca e filtro na listagem, com contagem de resultados.
- Consulta de CEP integrada ao ViaCEP; base para UF/Município (IBGE Localidades).
- Rotas privadas (login) e layout responsivo com CSS Modules.
- Cache e estados de carregamento/erro com React Query.

---

## 3. Stack de tecnologias

- React e Vite
- React Router
- @tanstack/react-query
- Context API e Redux Toolkit
- MUI e MUI DataGrid
- CSS Modules
- Fetch/Axios
- LocalStorage (persistência local, sem back-end)

---

## 4. Arquitetura e diretrizes

- Componentes coesos (responsabilidade única) e nomes semânticos.
- Hooks para estado/efeitos e lógica compartilhável.
- React Query para cache e estados de requisição.
- CSS Modules para escopo local de estilos.
- Camadas bem definidas: app, features, pages, components, services, store, routes, styles, utils, types.

---

## 5. Estrutura de pastas

```
ASSETTRACK (assettrack) — Estrutura atual de pastas e arquivos

assettrack/
├── dist/    --> Build de produção (Vite)
├── docs/    --> Evidências e documentação
│   └── compat/    --> Evidências de compatibilidade entre navegadores
│       ├── desktop_Chrome-janela anonima.png
│       ├── desktop_Chrome.png
│       ├── desktop_FIREFOX.png
│       └── desktop_safari.png
├── public/    --> Arquivos estáticos servidos em /
│   ├── landing.jpg
│   ├── transporte.jpg
│   └── vite.svg
├── src/    --> Código-fonte (React/Vite)
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Demo/
│   │   │   └── ClassClock.jsx
│   │   ├── Landing/
│   │   │   ├── Landing.jsx
│   │   │   └── Landing.module.css
│   │   ├── Layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   └── UI/
│   │       ├── Card.jsx
│   │       ├── ConfirmDialog.jsx
│   │       └── StatusBadge.jsx
│   ├── context/
│   │   ├── AssetsContext.jsx
│   │   └── AuthContext.jsx
│   ├── forms/
│   │   ├── AssetForm.jsx
│   │   ├── AssetItem.jsx
│   │   └── AssetList.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── LoginPage.module.css
│   │   ├── CepSearch.jsx
│   │   └── Dashboard/
│   │       └── Dashboard.jsx
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   └── Router.jsx
│   ├── services/
│   │   └── ViaCepService.js
│   ├── store/
│   │   └── index.js
│   └── styles/
│       └── globals.css
├── node_modules/    --> Dependências instaladas (NPM)
├── .gitignore    --> Arquivos/pastas ignorados pelo Git
├── index.html    --> Template HTML raiz do Vite
├── package.json    --> Metadados e scripts do projeto
├── package-lock.json    --> Resolução exata das dependências
├── vite.config.js    --> Configurações do Vite (plugins/aliases/build)
├── eslint.config.js    --> Regras de lint quando configuradas
└── README.md    --> Documentação resumida do projeto
```

---

**Padrões de nomes:**
- Páginas: `SomethingPage.jsx`
- Componentes: `PascalCase.jsx`
- Hooks: `useSomething.js`
- Serviços: `somethingApi.js`
- Estilos locais: `Nome.module.css`

---

## 6. Como executar

Pré-requisitos
- macOS com Git e Node.js LTS
- VS Code (recomendado)

Instalação rápida (macOS)
1. Instale o Homebrew (se necessário)  
   `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Instale Git e Node.js LTS  
   `brew install git node`
3. Instale o VS Code  
   `brew install --cask visual-studio-code`

Clonar e rodar
1. `git clone https://github.com/SEU_USUARIO/assettrack.git`
2. `cd assettrack`
3. `npm install`
4. `npm run dev`  
   Acesse http://localhost:5173

Build de produção
1. `npm run build`
2. `npm run preview`  
   Acesse http://localhost:4173

Observações
- Porta ocupada: `export PORT=5174 && npm run dev`
- Cache corrompido: `rm -rf node_modules package-lock.json && npm install`

---

## 7. Scripts NPM

- Desenvolvimento: `npm run dev` ou `npm run dev -- --open`
- Build: `npm run build`
- Preview: `npm run preview`
- Lint/Testes (se configurados): `npm run lint`, `npm test`

---

## 8. Configurações e variáveis

- ViaCEP: consumo direto da API pública.
- IBGE Localidades: preparado para UF/Município.
- Quando houver back-end: configurar `.env`.

`.env.example`
```
VITE_API_BASE_URL=http://localhost:8080
```

---

## 9. Qualidade e padrões

- Componentes coesos, nomes semânticos, CSS Modules.
- React Query para cache de requisições.
- Validações e mensagens de erro claras.
- ESLint/Prettier para padronização.
- Responsividade validada nas telas principais.

---

## 10. Testes manuais sugeridos

1) Ativos  
- Criar, editar e remover.  
- Filtrar por nome; validar contagem e paginação.

2) CEP  
- CEP válido: autopreenchimento.  
- CEP inválido: mensagens adequadas e bloqueio do fluxo quando exigido.

3) Login e rotas  
- Rotas privadas acessíveis somente autenticado.  
- Logout com redirecionamento.

4) Responsividade  
- Validar breakpoints em desktop e mobile.

---

## 11. Compatibilidade entre navegadores

- Chrome, Firefox, Safari e Edge.  
- Evidências em `docs/compat/`.

---

## 12. Solução de problemas

- Porta em uso: altere a porta (ver seção 9).  
- Dependências: reinstale `node_modules`.  
- Variáveis: confira `.env` e URLs.  
- Rede corporativa: proxy/whitelist para ViaCEP/IBGE.

---

## 13. Segurança e privacidade

- Nunca versionar segredos.  
- Usar variáveis de ambiente para chaves/tokens.  
- Avaliar LGPD antes de produção.

---

## 14. Licença

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 15. Autor

Claudio Cavalcante de Almeida
repositorio github: https://github.com/ClaudioCavalcante-BR/assettruck.git