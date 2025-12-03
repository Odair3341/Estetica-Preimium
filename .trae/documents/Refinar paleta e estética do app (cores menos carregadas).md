## Objetivo
- Tornar o visual mais leve e premium, reduzindo a sensação de cor "carregada" sem perder identidade.

## Diagnóstico (onde as cores pesam hoje)
- Configuração de tema no `index.html:19-39` usa `primary: "#ee2b8c"` + `background-dark: "#221019"` (magenta saturado + dark muito escuro).
- Dark mode forçado por `class="dark"` no HTML (`index.html:2`), deixando o app sempre no tema escuro.
- Uso extensivo de `text-primary`, gradientes e sombras coloridas:
  - Botão central da bottom bar (`components/BottomNav.tsx:33-37`) com `bg-primary` e `shadow-primary/40`.
  - Banner com `bg-gradient-to-br from-primary to-purple-600` (`pages/Dashboard.tsx:40`).
  - Destaques e ícones frequentes em `text-primary` (ex.: `Dashboard.tsx:27-33, 85-90, 149-153`).

## Melhorias propostas
- Paleta mais suave e equilibrada:
  - Substituir `primary` por um tom menos saturado e com melhor contraste para textos brancos (ex.: `#e11d48` — rose 600) e eliminar sombras coloridas.
  - Ajustar fundos: `background-light: "#fafafa"` e `background-dark: "#121212"` para um dark mais confortável.
- Dark mode opcional:
  - Remover `class="dark"` padrão do HTML e deixar o tema claro como default; adicionar depois um toggle de tema.
- Uso mais contido de `primary`:
  - Ícones e textos informativos voltam para `zinc`/`stone` neutros; `primary` fica para chamadas à ação.
  - Gradientes do banner trocados por blocos claros com detalhe sutil (chip, borda ou ícone com `primary`).
- Tipografia e espessura:
  - Reduzir `font-bold` em listas e textos; usar `font-medium` e só manter `bold` em títulos/CTAs.
- Acessibilidade:
  - Garantir contraste AA para textos sobre `primary` e em dark; evitar `text-primary` sobre fundo escuro.
- Higiene de assets:
  - Corrigir referência a `index.css` inexistente (`index.html:72`) — remover link ou criar o arquivo.

## Mudanças técnicas (precisas)
- Atualizar `tailwind.config` inline em `index.html:19-39`:
```
<script>
  tailwind.config = {
    darkMode: "class",
    theme: { extend: {
      colors: {
        primary: "#e11d48",
        "background-light": "#fafafa",
        "background-dark": "#121212",
      },
      fontFamily: { display: ["Manrope", "sans-serif"] },
      borderRadius: { DEFAULT: "1rem", lg: "2rem", xl: "3rem", full: "9999px" },
    } }
  };
</script>
```
- HTML: mudar `index.html:2` de `<html lang="pt-BR" class="dark">` para `<html lang="pt-BR">`.
- Bottom bar (`components/BottomNav.tsx`):
  - `bg-primary` permanece, mas remover `shadow-primary/40` e usar `shadow-md` neutro (`linha 34`).
  - Função `getTabColor`: usar `text-zinc-700`/`dark:text-zinc-300` para inativo; ativo mantém `text-primary`.
- Banner (`pages/Dashboard.tsx:40-58`):
  - Trocar gradiente por cartão claro: `bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 p-6` e destacar CTA com `text-primary`.
- Ícones e labels: substituir `text-primary` em elementos não acionáveis por `text-zinc-600`/`dark:text-zinc-400` (ex.: `Dashboard.tsx:85-90, 149-153`).
- Login inputs: manter `focus:ring-primary/50`; com novo `primary` o anel fica mais suave.
- Corrigir `index.css` (remover link em `index.html:72` ou criar arquivo vazio).

## Resultados esperados
- Visual imediatamente mais leve (menos áreas grandes com cor saturada).
- Melhor conforto no dark mode e contraste adequado em CTAs.
- Menos ruído cromático, foco nos elementos que importam.

## Próximos passos
- Aplicar as mudanças acima nos arquivos citados.
- Revisar a UI página a página e ajustar locais remanescentes com `text-primary` sem função de ação.
- Se desejar, incluir um toggle de tema (claro/escuro) posteriormente.
