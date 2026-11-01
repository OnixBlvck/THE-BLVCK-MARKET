<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Homepage is one scrolling page (`src/routes/index.tsx`) composed from section components in `src/components/site/`; nav uses in-page anchors because the brief asked for section scrolling.
- All approved/fixed wording (brand, program line, package names, offer terms) lives in `src/content/site.ts`; edit copy there, not inside components, and keep `src/test/inquiry.test.ts` in sync.
- Inquiry delivery goes through `submitInquiry` in `src/lib/inquiry.ts` — the single integration seam; the UI must reflect its `delivered` result honestly.
- Campaign colorways are CSS classes (`.campaign-violet`, `.campaign-lime`) in `src/styles.css` that override accent tokens; components only use tokens.
