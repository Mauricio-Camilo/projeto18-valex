<p align="center">
  <a href="https://github.com/$username-github/$nome-repositorio">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h1 align="center">
    projeto18-valex
  </h1>
</p>

## Usage

```bash
$ git clone https://github.com/$username-github/$nome-repositorio

$ cd $nome-repositorio

$ npm install

$ npm run dev
```

  <h3 align="left">
    Database
  </h3>

```
DATABASE_URL: postgres://gnxheqdjhjqjob:37ab86f0323975582cc675f21953d895d6ea536fa51404d48afa59bc4e4cf529@ec2-34-231-177-125.compute-1.amazonaws.com:5432/d5je8di32ctmi1
```

  <h3 align="left">
    API <br></br>
    Entidade cards
  </h3>
  
```
 
- POST /cards (autenticada)
    - Rota para criar um novo card
    - headers: {["x-api-key"]}
    - body: {
        "employeeId": "id",
        "type": "loremipsum",
    }
    
- PUT /cards
    - Rota para ativar o cartão
    - headers: {}
    - body: {
    "cardId": "lorem@gmail.com",
    "inputSecurityCode": "loremipsum",
    "inputPassword": "loremipsum"
    }
    
- GET /cards 
    - Rota para listar todas as transações
    - body: {}
    
- PUT /cards/block
    - Rota para bloquear um cartão
    - body: {
      "cardId": "id",
    }
- PUT /cards/release
    - Rota para desbloquear um cartão
    - body: {
      "cardId": "id",
    }
```
<h3 align="left">
    Entidade de recharges
  </h3>
  
```
- POST /recharges (autenticada)
    - Rota para criar um registro de recarga
    - headers: {["x-api-key"]}
    - body: {
        "cardId": "id",
        "amount": "número positivo",
    }
```
<h3 align="left">
    Entidade de purchases
  </h3>
  
```
- POST /purchases (autenticada)
    - Rota para criar um registro de compra
    - headers: {["x-api-key"]}
    - body: {
        "cardId": "id",
        "amount": "número positivo",
        "businessId": "id",
    }
```

