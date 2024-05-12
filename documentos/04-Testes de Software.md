# Planos de Testes de Software

![alt text](./img/CTG1.png)
![alt text](./img/CTG2.png)
![alt text](./img/CTG3.png)
![alt text](./img/CTG4.png)
![alt text](./img/CTG5.png)
![alt text](./img/CTG6.png)


# Evidências de Testes de Software

## Evidências do back-end

Os testes no backend são feitos utilizando Jest. Para rodar o teste localmente precisamos criar uma imagem do banco de dados via docker. Iniciamos a API e o Docker para montar o ambiente da aplicação e depois precisamos rodar teste por teste, onde possui suites e casos de testes.

Para acessar os testes dentro do código, basta ir em aplicações> backend > src > test > unit

Esses testes são validados previamente com testes de rotas em ferramentas como postman. Depois disso fazemos a criação dos testes unitários.

### Login

![LoginBackend](./img/loginBackend.png)

### GetUser

![getUserBackend](./img/getUserBackend.png)

### Get - Company

![getCompany](./img/getCompanyBackend.png)

### Update - Company

![updateCompanyBackend](./img/updateCompanyBackend.png)

### Create - Artigo

![createArticleBackend](./img/createArticleBackend.png)

### DeleteByID - Artigo

![deleteByIdBackend](./img/deleteByIdBackend.png)

### GetAll - Artigo

![getAllBackend](./img/getAllBackend.png)

### GetByID - Artigo

![getByIdBackend](./img/getByIdBackend.png)

### UpdateByID - Artigo

![updateByIdBackend](./img/updateByIdBackend.png)

### Create - Banner

![createBannerBackend](./img/createBannerBackend.png)

### DeleteById - Banner

![deleteByIdBannerBackend](./img/image.png)

### GetAll - Banner

![getAllBannerBackend](./img/getAllBannerBackend.png)

### GetById - Banner

![getByIdBannerBackend](./img/getByIdBannerBackend.png)

### UpdateById - Banner

![updateByIdBannerBackend](./img/updateByIdBannerBackend.png)

### Create - Galeria

![createGaleriaBackend](./img/createGaleriaBackend.png)

### DeleteById - Galeria

![deleteByIDGaleriaBackend](./img/deleteByIDGaleriaBackend.png)

### GetAll - Galeria

![getAllGaleriaBackend](./img/getAllGaleriaBackend.png)

### GetById - Galeria

![getByIdGaleriaBackend](./img/getByIdGaleriaBackend.png)

### UpdateById - Galeria

![updateByIdGaleriaBackend](./img/updateByIdGaleriaBackend.png)


## Evidências do FrontEnd (UI)

Esses testes servem apenas para verificarmos se a interface está de acordo com o funcionamento esperado. A integração com o backend ainda está sendo feita até o momento deste envio, então os registros são das telas.

### Login

![loginFront](./img/loginFront.png)

### Eventos/ Nutrição / Artigos (são o mesmo princípio)

![TelaPadraoExibicao](./img/TelaPadraoExibicao.png)

#### Criação artigo
![criacaoArtigo](./img/criacaoArtigo.png)

### Quem somos

![quemSomos](./img/quemSomos.png)

### Fale Conosco

![faleConosco](./img/faleConosco.png)
