# 👁️ nex.tools

> O compêndio definitivo e utilitário de bolso para jogadores e mestres do RPG **Ordem Paranormal**.

Com a constante expansão do universo de Ordem Paranormal (Livro Base, Sobrevivendo ao Horror, Arquivos Secretos mensais, HQs e revistas), encontrar rapidamente a página daquele ritual ou regra específica no meio da sessão de RPG se tornou um verdadeiro desafio. 

O **nex.tools** nasce para resolver exatamente essa dor: ser um indexador digital rápido, moderno e direto ao ponto, ajudando a comunidade a consultar regras, rituais e habilidades em segundos, sempre guiando o jogador de volta ao livro original.

---

## 🚀 O que é o projeto?

Atualmente em fase inicial, o nex.tools funciona como um indexador inteligente focado na extrema agilidade de busca. Através de um painel interativo, você filtra a gigantesca base de dados por Elemento, Círculo, Fonte ou Categoria e descobre na hora em qual livro e página a regra completa se encontra.

### 📌 Roadmap (O que vem por aí)
Nossa visão para o futuro do nex.tools é ampla e contínua:
- [x] **Indexador de Rituais:** Buscas avançadas por elemento, círculo e fonte.
- [ ] **Indexador de Habilidades:** Classes, Origens, Trilhas e Poderes Paranormais.
- [ ] **Expansão de Conteúdo:** Itens catalogados, Maldições e Equipamentos extras.
- [ ] **Indexador de Regras Avançadas:** "Onde rolar testes de Furtividade?", "Como funciona a ação de Conserto?" — Um guia rápido apontando no livro exato onde revisar a regra.
- [ ] **Integração Homebrew:** Inclusão de conteúdos não-oficiais muito famosos na comunidade, com um *toggle* (chaveador) para que os usuários garantam que só estão vendo conteúdo oficial se desejarem.
- [ ] **Utilitários de Mesa:** Roladores de dados customizáveis e voltados especificamente para suprir as dores do mestre do sistema.
- [ ] **Módulos VTT:** Sessão com links de hospedagem e documentação de módulos para serem integrados ao FoundryVTT.

---

## 🛠️ Tecnologias e Arquitetura

O nex.tools foi arquitetado como uma SPA (Single Page Application) estática moderna, sem depender de banco de dados robusto de servidor, permitindo ser hospedado facilmente e rodar liso.
- **React 18** (Vite)
- **Tailwind CSS 4** (Responsivo e Dark-mode native)
- **Lucide Icons**
- **Arquivos JSON** estáticos gerenciando os dados dos livros, o que torna as contribuições comunitárias incrivelmente simples.

---

## 🤝 Como Contribuir

O projeto é **Open Source** e feito pela comunidade, para a comunidade! Toda ajuda é muito bem-vinda, seja adicionando as novas habilidades de uma HQ recém-lançada nos arquivos `.json` ou programando novas ferramentas na interface.

Se você quer ajudar, mas não tem familiaridade técnica com o GitHub, não se preocupe. A documentação oficial deles é muito clara:

1. **Relatar Erros ou Dar Ideias:** Encontrou um erro de digitação de status ou tem uma ideia nova?
   👉 [Veja como abrir uma Issue rapidamente](https://docs.github.com/pt/issues/tracking-your-work-with-issues/creating-an-issue).
2. **Adicionar Rituais, Habilidades ou Código:** Quer mexer de verdade nos arquivos `.json` ou nos componentes em TypeScript? Você só precisa Clonar/Fazer um Fork, alterar e enviar para nós.
   👉 [Aprenda o passo-a-passo simples para fazer um Fork e Pull Request (PR)](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

---

## ⚠️ Aviso Legal e Direitos de Uso (Disclaimer)

**A indexação de conteúdo oficial presente neste projeto é feita estritamente de Fã para Fãs e possui caráter não lucrativo.**

Nenhum conteúdo oficial transcrito ou catalogado neste repositório tem a intenção de substituir, plagiar ou concorrer comercialmente com os materiais de origem. O **nex.tools** atua essencialmente como um **índice descritivo de consulta rápida**, com o único objetivo de facilitar a vida dos jogadores durante uma mesa ativa. Nós sempre indicamos a Sigla do material oficial e a página de referência para impulsionar a consulta, compra e leitura do material fonte.

*(Nota: Eventuais páginas de financiamento coletivo ou doação vinculadas ao projeto destinam-se exclusivamente à manutenção da infraestrutura, aos custos de servidor e ao desenvolvimento de ferramentas ou aventuras utilitárias 100% autorais e independentes).*

Todo o universo, artes (quando aplicáveis), logotipos e as mecânicas de jogo de **Ordem Paranormal** são propriedade intelectual única e exclusiva da **Jambô Editora**, **Rafael Lange (Cellbit)** e criadores associados.

> *Caso você seja representante legal dos detentores dos direitos e entenda que algum trecho de texto transcrito em nosso indexador supera as limitações do "uso aceitável" para ferramentas de referência da comunidade, não hesite em abrir uma `Issue` ou nos contatar para que realizemos o ajuste ou a remoção imediata dos dados.*

#### Código
A estrutura da aplicação web (Componentes UI, interface, código TypeScript) distribuída neste repositório está sob licença **MIT**, ou seja: desenvolvedores são livres para estudar, copiar ou utilizar a nossa casca visual e arquitetura como base para criar suas próprias ferramentas.
