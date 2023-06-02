<h1>Readme - Comandos Docker, Postgres e SQL</h1>

Este readme contém uma lista de comandos úteis para trabalhar com Docker, Postgres e SQL.

<h1>Comandos Docker</h1>

```bash
- docker pull <nome_da_imagem> - Baixa uma imagem
- docker rmi <nome_da_imagem> - Remove uma imagem
- docker ps - Lista os containers rodando
- docker ps -a - Lista todos os containers (incluindo os parados)
- docker run --name <nome_do_container> -e POSTGRES_USER=<usuario> -e POSTGRES_PASSWORD=<senha> -p 5432:5432 -d postgres - Cria um container e utiliza a imagem (As flags -e são variáveis de ambiente)
- docker start <nome_do_container> - Inicia um container
- docker stop <nome_do_container> - Para um container
- docker container rm <nome_do_container> - Deleta um container
- docker exec -it <nome_do_container> bash - Executa um container
```

<h1>Comandos Postgres</h1>
- psql -U <usuario> - Loga no banco de dados utilizando o usuário criado
- \l - Lista as bases de dados
- \c <nome_da_base> - Conecta à base de dados
- \dt - Lista as tabelas na base de dados

SELECT
efficiencies.id AS id,
efficiencies.date,
efficiencies.available_hours,
rigs.name AS rig_name,
users.name AS user_name,
dtm_details.id AS dtm_id,
fluid_ratio.ratio AS fluid_ratio,
equipment_ratio.ratio AS equipment_ratio,
gloss_details.id AS gloss_detail_id,
repair_details.id AS repair_detail_id
FROM
efficiencies
JOIN rigs ON efficiencies.rig_id = rigs.id
JOIN users ON efficiencies.user_id = users.id
LEFT JOIN gloss_details ON gloss_details.efficiency_id = efficiencies.id
LEFT JOIN repair_details ON repair_details.efficiency_id = efficiencies.id
LEFT JOIN dtm_details ON dtm_details.efficiency_id = efficiencies.id
LEFT JOIN fluid_ratio ON fluid_ratio.efficiency_id = efficiencies.id
LEFT JOIN equipment_ratio ON equipment_ratio.efficiency_id = efficiencies.id;
