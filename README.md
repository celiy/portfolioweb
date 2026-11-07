# Portfolioweb

Portfólio pessoal de Diogo Carvalho Viegas. Mostra quem eu sou, as tecnologias que uso, meus projetos e experiências, e traz alguns cards com dados vivos do GitHub, do Codewars e de onde eu moro.

Ele é um cliente do CHT Template, então não roda sozinho. O código do site fica aqui e o resto vem do `cht-main`, que traz o `cht-base`, o `cht-design-system` e o `cht-shared`. Esta pasta precisa ficar dentro do `cht-main`, ao lado deles.

## O que ele usa

Vue 3 com TypeScript, Vue Router e Tailwind CSS 4. O build e o servidor de desenvolvimento são do Vite, mas quem configura isso é o `cht-base`. Os botões, badges, tooltips e outros componentes vêm do `cht-design-system`.

Hoje só a página inicial existe. A navegação já tem Projetos, Sobre e Contato, mas essas rotas ainda não foram criadas.

## Rodando

Os comandos abaixo rodam na raiz do `cht-main`, não nesta pasta.

```bash
npx chtmain dev --client:portfolioweb
```

Para gerar o build:

```bash
npx chtmain build portfolioweb
```

O resultado vai para `builds/portfolioweb/dist`. Se usar a opção `--out`, aponte para uma subpasta como `dist`. O comando apaga a pasta de saída antes de copiar e recusa pastas de cliente e repositórios git, justamente para não apagar código por engano.

## Dados do GitHub e do Codewars

Os cards de commits, atividade e Codewars não consultam nenhuma API no navegador. Eles leem o arquivo `src/data/publicProfiles.json`, e quem escreve esse arquivo é o script `scripts/updatePublicProfiles.mjs`. Assim o site nunca esbarra no limite de 60 requisições por hora da API do GitHub.

```bash
node scripts/updatePublicProfiles.mjs
```

O script não precisa de dependências. Se existir a variável `GITHUB_TOKEN` ele usa o token e o limite sobe bastante. Quando uma parte falha o valor antigo fica no lugar, e o arquivo só é regravado se algum dado mudou. O percentil de honra do Codewars não existe na API deles, então o script lê esse número direto da página pública do perfil. Se o Codewars mudar a página esse número some do card e o resto continua funcionando.

## Workflow

O arquivo `.github/workflows/update-public-profiles.yml` roda o script a cada 6 horas e também pelo botão Run workflow na aba Actions. Se o JSON mudou ele faz um commit direto na `main`. Por isso o repositório precisa deixar a Action escrever, e se o push for recusado vale conferir em Settings, Actions, General se as permissões estão em leitura e escrita.

Ele só atualiza o JSON. O site publicado continua com os dados antigos até alguém gerar o build de novo.

## Publicando no GitHub Pages

```bash
node scripts/buildDocs.mjs
```

O script faz o build e coloca o resultado na pasta `docs`, que é apagada e refeita a cada vez. Ele também cria o `404.html`, cópia do `index.html`, para o Pages entregar o app em links diretos. O arquivo `.nojekyll` evita que o Pages processe a saída com Jekyll.

Depois é commitar a pasta `docs` e escolher em Settings, Pages a branch `main` com a pasta `/docs`.

O Pages serve um repositório de projeto em `usuario.github.io/portfolioweb`, então o site precisa saber que mora nessa subpasta. O script define isso na constante `BASE`, que hoje vale `/portfolioweb/` e vira a variável `CHT_BASE` do build. Se o site passar a morar na raiz do domínio, seja em `usuario.github.io` ou num domínio próprio, troque `BASE` para `/` e gere de novo. Sem essa variável o build usa `/`.

## Estrutura

```
cht.config.ts      nome do site e cores do tema
src/pages          páginas
src/components     cards e componentes do portfólio
src/constants      projetos e experiências
src/services       leitura do JSON de perfis
src/data           JSON gerado pelo script
scripts            atualização dos dados e build para o Pages
docs               site publicado
old                versão antiga do portfólio
```
