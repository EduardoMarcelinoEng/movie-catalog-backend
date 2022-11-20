#DOCUMENTAÇÃO DA API
//Rotas
-Acesso aos filmes: Requisição http para a rota /movie usando método get. Para filtragem dos filmes, basta passar uma query string na URL. É possível filtrar por id, title, description, director, producer e activePage (activePage é a página a ser buscada). Exemplo de query string: http://localhost:8080?producer=Toshio+Suzuki
-Para atualizar banco de dados com os filmes da API: fazer requisição http para a rota /movie usando método post.
-Para deletar os filmes do nosso banco de dados: fazer requisição http para a rota /movie usando método delete.
-Qualquer outra requisição http com o método get terá como retorno o build (frontend) da aplicação.

//Configuração
Toda a configução do projeto é feita no arquivo index.js localizado na pasta src/config:
-Há três variáveis de ambientes: development, test e production. Basta configurar o ambiente desejado na variável, e selecionar qual ambiente será executado na variável env. 
-É possível configurar a porta e informações do banco de dados.

#EXECUÇÃO DO PROJETO
1) Configurar informações do banco de dados a ser utilizado no arquivo src/config/index.js;
2) Selecionar o ambiente configurado na variável env localizada no arquivo src/config/index.js;
3) Executar na raiz do projeto o comando npm install; //para instalar as dependências
4) Executar na raiz do projeto o comando npm run migrate; //para criar a estrutura do banco de dados
5) (OPCIONAL) - Para executar o frontend dentro do backend deverá ir no projeto do frontend, no arquivo src/config/index.js e alterar o conteúdo da variável env para 'production'. Feito isso, execute o comando yarn install e logo em seguida, yarn build para gerar o build do frontend, e colar na raiz do projeto do backend. Obs.: para mais detalhes, consulte o README do projeto frontend.
6) Executar o comando npm start na raiz do projeto.

#EXECUÇÃO DOS TESTES
-Para testar a API, basta executar o projeto no modo desenvolvimento, e executar o comando npm test na raiz do projeto.

#CONFIGURAÇÃO DO HTTPS
-Para habilitar o https, marcar no arquivo de configuração a opção isHttps como true, e preencher os caminhos das credenciais do certificados (ca, cert e key).
Obs.: habilitando o https, o http é desabilitado.