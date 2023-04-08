# Boas-vindas ao repositório do projeto ?tunes!

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Neste projeto criei o ?tunes, uma aplicação capaz de reproduzir músicas das mais variadas bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. Essa aplicação é capaz de:

  - Fazer login;
  - Pesquisar por uma banda ou artista;
  - Listar os álbuns disponíveis dessa banda ou artista;
  - Visualizar as músicas de um álbum selecionado;
  - Reproduzir uma prévia das músicas deste álbum;
  - Favoritar e desfavoritar músicas;
  - Ver a lista de músicas favoritas;
  - Ver o perfil da pessoa logada;
  - Editar o perfil da pessoa logada;

  ### Protótipo do projeto
  Você pode acessar um protótipo no link abaixo:

  https://www.figma.com/file/BDQgAJvOe4KNUjmrYh5t68/TrybeTunes-Figma
</details>

<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

Neste projeto, fui capaz de:

- Fazer requisições e consumir dados vindos de uma `API`;

- Utilizar os ciclos de vida de um componente React;

- Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado

- Utilizar o componente `BrowserRouter` corretamente;

- Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`;

- Utilizar o `Switch` do `React Router`

- Criar links de navegação na aplicação com o componente `Link`;
</details>

# Orientações

<details>

  1. Clone o repositório

  - Use o comando: `git clone git@github.com:tryber/sd-022-a-project-trybetunes.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-022-a-project-trybetunes`

  2. Instale as dependências

  - `npm install`.  
  
<details>
  <summary><strong>🛠 Testes</strong></summary><br />

  Neste projeto a Trybe utilizou a [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) para execução de testes.

  Para verificar a solução proposta, você pode executar todos os testes localmente, basta executar:

  ```bash
  npm test
  ```
  Você também pode rodar apenas um arquivo de teste, por exemplo:

  ```bash
  npm test 01.LoginPage.test.js
  ```

  ou

  ```bash
  npm test 01.LoginPage
  ```

  Uma outra forma para driblar esse problema é a utilização da função `.only` após o `it`. Com isso, será possível que apenas um requisito rode localmente e seja avaliado.

  ```js
  it.only('Será validado se existe uma página para rotas não mapeadas', () => {
    renderPath('/not-found');

    expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  });
  ```
  ![image](only-image.png)
</details>

<details>
  <summary><strong>:convenience_store: Desenvolvimento </strong></summary><br />

  Este repositório já continha um template com um App React criado pela trybe

  Também já existia no projeto o diretório `src/services` que contém os arquivos `favoriteSongsAPI.js`, `searchAlbumsAPI.js`, `userAPI.js` e `musicsAPI.js`. Esses arquivos são responsáveis por lidar com as requisições simuladas que foram usadas durante o desenvolvimento. Entenda mais sobre eles abaixo:

  <details><summary><strong> <code>userAPI.js</code></strong></summary>

  O arquivo `userAPI.js` é utilizado para manipular as informações da pessoa logada, dentro dele estão as funções para recuperar e atualizar as informações da pessoa usuária, além de criar um novo perfil. Todas essas funções simulam o funcionamento de uma API.

  - Para recuperar as informações da pessoa usuária, utilizei a função `getUser`. Ela retorna um objeto com as informações da pessoa logada caso exista.
  **Atenção:** caso não encontre nenhuma informação da pessoa usuária, a API retornará um objeto vazio.

  - Para criar um novo perfil, utilizei a função `createUser`, ela recebe como parâmetro o objeto que contém as informações da pessoa usuária. Esse objeto deverá conter a seguinte estrutura:

  ```javascript
  {
    name: '',
    email: '',
    image: '',
    description: '',
  }
  ```

  Para atualizar as informações da pessoa logada, utilizei a função `updateUser`. Assim como a função anterior, ela também recebe um objeto com as informações que serão atualizadas, esse objeto deve conter a mesma estrutura do anterior.
  </details>

  <details><summary><strong> <code>searchAlbumsAPI.js</code></strong></summary>

  O arquivo `searchAlbumsAPI.js` contém uma função que faz uma requisição a uma API e retorna os álbuns de uma banda ou artista. Para essa função funcionar, ela recebe como parâmetro uma string, que deve ser o nome da banda ou artista. O retorno dessa função, quando encontra as informações, é um array com cada álbum dentro de um objeto.
  **Atenção:** caso não encontre nenhuma informação da banda ou artista, a API retornará um array vazio.
  </details>
  <details><summary><strong> <code>favoriteSongsAPI.js</code></strong></summary>

  O arquivo `favoriteSongsAPI.js` é responsável por manipular as informações das músicas favoritas. Nele há as funções `getFavoriteSongs`, `addSong` e `removeSong`, que recuperam, adicionam e removem músicas dos favoritos, respectivamente. Assim como nos arquivos anteriores, todas as funções simulam o funcionamento de uma API.

  A função `getFavoriteSongs` retorna um array com as músicas favoritas ou um array vazio, caso não haja nenhuma música.

  A função `addSong` recebe um objeto que representa a música que você quer salvar como favorita e adiciona ao array já existente das músicas que já foram favoritadas.

  A função `removeSong` também recebe um objeto que representa a música que você deseja remover da lista de músicas favoritas.

  </details>
  <details><summary><strong> <code>musicsAPI.js</code></strong></summary>

  O arquivo `musicsAPI.js` contém a função `getMusics` que faz uma requisição a uma API e retorna os as músicas de um álbum. Ela recebe como parâmetro uma string, que deve ser o id do álbum. O retorno dessa função, quando encontra as informações, é um array onde o primeiro elemento é um objeto com informações do álbum e o restante dos elementos são as músicas do álbum.
  **Atenção:** caso não encontre nenhuma informação, a API retornará um array vazio.
  </details>
</details>

<details>
  <summary><strong>🗣 Me dê feedbacks sobre o projeto!</strong></summary><br />
</details>

---
