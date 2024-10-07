# Tarot Online

Este é um projeto de um site de Tarot Online onde os usuários podem escolher diferentes tipos de leituras de cartas e obter uma interpretação personalizada.

## Estrutura do Projeto

Abaixo está a estrutura do projeto, organizada para facilitar a manutenção e escalabilidade:

```
tarot_online/
├── assets
│   ├── css
│   │   ├── components
│   │   │   ├── form-cadastro.css
│   │   │   ├── nav-bar.css
│   │   │   └── tarot-board.css
│   │   └── global
│   │       ├── buttons.css
│   │       ├── card-container.css
│   │       ├── game-options.css
│   │       ├── interpretation.css
│   │       └── styles.css
│   ├── imagens
│   │   └── cartas
│   │       ├── asacerdotisa.jpg
│   │       ├── default.jpeg
│   │       ├── olouco.jpeg
│   │       └── omago.jpeg
│   └── js
│       ├── components
│       │   ├── initApp.js
│       │   └── loadComponents.js
│       ├── effects
│       │   └── fireworks.js
│       └── features
│           ├── cartas.js
│           └── sortearCartas.js
├── components
│   ├── form-cadastro.html
│   ├── nav-bar.html
│   └── tarot-board.html
├── index.html
├── package-lock.json
├── package.json
└── pages
    ├── baralho_cigano.html
    ├── cadastro.html
    ├── mesa_real.html
    ├── tres_cartas.html
    └── uma_carta.html
```

## Descrição das Pastas e Arquivos

### `assets/`
Esta pasta contém todos os recursos estáticos do projeto, como arquivos CSS, JavaScript, e imagens.

- **`css/`**: Contém arquivos de estilos.
  - `components/`: Estilos específicos para componentes reutilizáveis, como a barra de navegação, formulário de cadastro e tabuleiro de cartas.
  - `global/`: Estilos globais que podem ser utilizados em várias partes da aplicação, como botões, containers de cartas e o estilo principal (`styles.css`).

- **`imagens/`**: Contém as imagens usadas no projeto, organizadas em subpastas como `cartas`.

- **`js/`**: Contém os scripts JavaScript do projeto.
  - `components/`: Scripts relacionados a componentes reutilizáveis e inicialização da aplicação.
    - `initApp.js`: Inicializa eventos e funções ao carregar a página.
    - `loadComponents.js`: Script para carregar componentes HTML dinamicamente nas páginas.
  - `effects/`: Scripts para adicionar efeitos visuais, como animações.
    - `fireworks.js`: Gerencia o efeito de fogos de artifício ao sortear cartas.
  - `features/`: Scripts que implementam funcionalidades específicas do projeto.
    - `cartas.js`: Dados e características das cartas de Tarot.
    - `sortearCartas.js`: Lógica para sortear cartas e exibir interpretações.

### `components/`
Contém os arquivos HTML dos componentes reutilizáveis:
- **`form-cadastro.html`**: Formulário de cadastro para novos usuários.
- **`nav-bar.html`**: Barra de navegação para ser incluída em várias páginas.
- **`tarot-board.html`**: Tabuleiro de cartas de Tarot.

### `pages/`
Contém páginas HTML específicas do site:
- **`baralho_cigano.html`**, **`cadastro.html`**, **`mesa_real.html`**, **`tres_cartas.html`**, **`uma_carta.html`**: Páginas específicas para diferentes leituras de Tarot e cadastro de usuários.

### `index.html`
Página principal do projeto, onde os usuários podem escolher qual tipo de leitura de Tarot desejam realizar.

## Dependências
Este projeto utiliza algumas dependências gerenciadas pelo `package.json`:
- **`fireworks-js`**: Biblioteca para criar efeitos de fogos de artifício durante a interação do usuário.

Para instalar as dependências, execute:
```bash
npm install
```

## Instruções de Execução

1. **Clone o Repositório**:
   ```bash
   git clone <url-do-repositorio>
   cd tarot_online
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Execute em um Servidor Local**:
   Para executar o projeto localmente, você pode usar um servidor HTTP simples, como o `live-server`:
   ```bash
   npx live-server
   ```
   Ou, se preferir, abra diretamente o `index.html` no navegador.

## Próximos Passos
1. **Melhorar a Modularização**: Consolidar arquivos CSS e JS sempre que possível para reduzir a quantidade de `@import` e `script` tags.
2. **Adicionar Documentação**: Expandir a documentação do projeto, incluindo exemplos de uso e explicações mais detalhadas sobre cada componente.
3. **Testar Cross-browser**: Realizar testes em diferentes navegadores para garantir a compatibilidade.
4. **Adicionar Testes Automatizados**: Incluir testes para validar as funcionalidades principais da aplicação.

## Contribuições
Sinta-se à vontade para contribuir com o projeto enviando um Pull Request ou reportando problemas na seção de issues.

---

Este README foi gerado para fornecer uma visão geral do projeto e auxiliar desenvolvedores a entender sua estrutura e contribuir de forma eficaz.

---