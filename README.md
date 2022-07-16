<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    $nome-repositorio
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/$username-github/$nome-repositorio

$ cd $nome-repositorio

$ npm install

$ npm run dev
```

API:

```
- POST /cadastro
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "nome": "Lorem ipsum",
        "email": "lorem@gmail.com",
        "senha": "loremipsum"
    }
- POST /login
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsum"
    }
- GET /usuarios (autenticada)
    - Rota para listar todos os usuários
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
- GET /usuarios/:id (autenticada)
    - Rota para listar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
- PUT /usuarios/:id (autenticada)
    - Rota para atualizar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "nome": "Lorem ipsum2",
        "email": "lorem2@gmail.com",
        "senha": "loremipsum2"
    }
- DELETE /usuarios/:id (autenticada)
    - Rota para deletar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```
