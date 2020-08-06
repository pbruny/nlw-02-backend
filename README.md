# Como executar

Clone este repositório utilizando o comando `git clone https://github.com/pbruny/nlw-02-backend.git`

Após clonar o repositório, na sua linha de comando, utilize o comando `yarn start`

Caso queira se certificar de que o banco de dados estará zerado, existem duas opções:
- utilizar o comando `yarn knex:migrate:rollback` para eliminar todas as tabelas da base de dados existente;
- remover o arquivo `database.sqlite` da pasta `database` e, após isso, executar o comando `yarn knex:migrate`

Em caso de erros com o arquivo `yarn.lock`, remova-o e execute `yarn install`

## Rotas que comunicarão com o front-end

### /classes

- get: Utilizando o método get, caso não sejam adicionados os filtros de query, retornará erro. Caso adicione os filtros, retornará todas as classes encontradas com os filtros informados.
- post: deve-se inserir um corpo em JSON na requisição contendo os seguintes campos

o modelo do corpo de requisição é como segue:
```json
{
	"name": "José da Silva",
	"avatar": "https://avatars0.githubusercontent.com/u/14647700?s=460&u=18119ff02309fb80ba5d8b0cc1b858b37429fd5b&v=4",
	"whatsapp": "999999999",
	"bio": "Insert some bio here and be happy",
	"subject": "Matemática",
	"cost": 45,
	"schedule": [
		{ "week_day": 1, "from": "10:00", "to": "16:00"},
		{ "week_day": 3, "from": "10:00", "to": "16:00"},
		{ "week_day": 5, "from": "10:00", "to": "16:00"}
	]
}
```

- delete: WIP
- Update: WIP

### connections

- get: Retorna o total de conexões entre professores e alunos até o momento
- post: Insere uma nova conexão, no corpo, deve ser informado um id de usuário, no caso, professor existente.

o corpo deve ser como:
```json
{
	"user_id": 1
}
```
- delete: não é necessário até o momento
- update: não é necessário até o momento


## Conexões

- Rota para listar o total de conexões realizadas entre alunos e proffys
- Rota para criar uma nova conexão

## Aulas

- Rota para criar uma aula
- Rota para listar aulas
  - Filtrar por matéria, dia da semana e horário