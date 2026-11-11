<br />
<div align="center">
https://celiy.github.io/portfolioweb/
</div>
<br />

# Portfolioweb

Portfólio pessoal de Diogo Carvalho Viegas. Mostra quem eu sou, as tecnologias que uso, meus projetos e experiências, e traz alguns cards com dados vivos do GitHub, do Codewars e de onde eu moro.

Ele é um cliente do CHT Template, então não roda sozinho. O código do site fica aqui e o resto vem do `cht-main`, que traz o `cht-base`, o `cht-design-system` e o `cht-shared`. Esta pasta precisa ficar dentro do `cht-main`, ao lado deles.

## O que ele usa

Vue 3 com TypeScript, Vue Router e Tailwind CSS 4. O build e o servidor de desenvolvimento são do Vite, mas quem configura isso é o `cht-base`. Os botões, badges, tooltips e outros componentes vêm do `cht-design-system`.

A página inicial é a única com conteúdo. Projetos, Sobre e Contato já têm rota, em `/projects`, `/about` e `/contact`, mas as páginas ainda estão em branco.

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

O arquivo `.github/workflows/deploy-pages.yml` faz o build e publica o site no GitHub Pages. Ele roda a cada push na `main`, a cada 6 horas e pelo botão Run workflow na aba Actions.

Como o build mora no `cht-main`, o workflow baixa o `cht-main` e coloca este repositório dentro dele. Depois pega a `main` do `cht-base`, do `cht-design-system` e do `cht-shared`, instala as dependências, roda o script de dados e gera o site. Cada publicação já sai com os commits e o Codewars atualizados, e nada disso é commitado. Por isso a pasta `docs` fica fora do git e não existe cópia dos arquivos no repositório.

Antes do primeiro deploy falta uma configuração. Em Settings, Pages, Source, escolha GitHub Actions.

Como ele segue a `main` dos repositórios do núcleo, uma mudança neles só aparece no site depois de chegar na `main` deles.

## Testando o build

```bash
node scripts/buildDocs.mjs
```

Gera na pasta `docs` o mesmo site que o workflow publica, para olhar antes de dar push. Ela é ignorada pelo git e apagada a cada vez. O script também cria o `404.html`, cópia do `index.html`, para o Pages entregar o app em links diretos, e o arquivo `.nojekyll`, que evita que o Pages processe a saída com Jekyll.

O Pages serve um repositório de projeto em `usuario.github.io/portfolioweb`, então o site precisa saber que mora nessa subpasta. O script define isso na constante `BASE`, que hoje vale `/portfolioweb/` e vira a variável `CHT_BASE` do build. Se o site passar a morar na raiz do domínio, seja em `usuario.github.io` ou num domínio próprio, troque `BASE` para `/`. Sem essa variável o build usa `/`.

## Estrutura

```
cht.config.ts      nome do site e cores do tema
src/pages          páginas
src/components     cards e componentes do portfólio
src/constants      projetos e experiências
src/services       leitura do JSON de perfis
src/data           JSON gerado pelo script
scripts            atualização dos dados e build para o Pages
docs               build local de teste, fora do git
old                versão antiga do portfólio
```
