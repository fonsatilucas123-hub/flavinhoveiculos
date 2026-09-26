# Flavinho Veículos — site + painel privado

Este projeto aproveita o visual do HTML enviado e adiciona um feed dinâmico e uma área de proprietário com login.

## Para colocar no ar
1. Crie um projeto no Supabase.
2. Crie seu único usuário em Authentication > Users com o e-mail e senha que só você conhece.
3. Rode `supabase.sql` no SQL Editor.
4. Em Settings > API copie Project URL e anon/public key para `config.js`.
5. Publique os arquivos em GitHub Pages, Netlify ou Vercel.
6. Entre em `/login.html` para publicar sem editar código.

A senha fica no sistema de autenticação, não no HTML. Nunca coloque uma service_role key no site.
