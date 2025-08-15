<div align="center">

# React Store (Curso Alura: "React – Testes com Jest e Testing Library")

Aplicação modelo utilizada para estudo de testes em aplicações React modernas com Vite + TypeScript. O foco principal do repositório é consolidar práticas de testes (unidade e comportamento) usando **Jest** e **Testing Library**, além de demonstrar organização de contexto, componentes e rotas.

</div>

## 🎯 Objetivos do Projeto

- Exercitar escrita de testes confiáveis e legíveis
- Consolidar diferenças entre `beforeEach`, `afterEach`, `afterAll` e estratégias de limpeza de mocks
- Testar componentes isolados (ex: `Header`, `Footer`, `ProductCard`)
- Testar Context API (ex: carrinho) e helpers utilitários
- Simular navegação com `react-router` e `useNavigate`
- Criar uma base estruturada para evoluir (ex: cobertura, testes de acessibilidade, mocks de API)

## 🧪 Estratégia de Testes

| Alvo | Abordagem | Técnicas | Exemplos |
|------|-----------|----------|----------|
| Componentes simples | `renderWithProviders` (ou sem providers) + assertions | Queries por função semântica (`getByRole`, `getByText`) | `Footer.test.tsx` |
| Navegação | Mock centralizado de `useNavigate` | Mock único em `jest.setup.ts` via `routerMocks.ts` | `Header.test.tsx` |
| Interação do usuário | `userEvent` já retornado pelo helper | `const { user } = renderWithProviders(...)` | `Header.test.tsx` |
| Context (estado global) | Providers reais + harness mínimo | Mutação / ordem / isolamento de estado | `cart.context.test.tsx` |
| Funções utilitárias | Testes determinísticos e abrangendo bordas | Entradas inválidas / limites / formatação | `utils/index.test.ts` |
| Fetch / API fake | Mock global de `fetch` determinístico | `mockFetch` instalado em `jest.setup.ts` | (futuro: telas com dados) |

### Boas práticas aplicadas

- Helper `renderWithProviders` reduz repetição (router + context + `userEvent`).
- Mock de navegação (`mockNavigate`) e de `fetch` centralizados em `jest.setup.ts` para consistência.
- Uso preferencial de queries semânticas (`getByRole`, `findByRole`, `getByText`).
- Evitado `beforeAll` / `afterAll` – cada teste isola seu ambiente.
- Fabricação determinística de dados em testes de contexto (IDs previsíveis, sem `Math.random`).
- `act` explícito encapsulado no harness do contexto para React 19 (silencia warnings e garante flush de updates).
- Separação clara: Arrange (render), Act (interação), Assert (expect).

### Próximos passos de testes (Roadmap)

- [ ] Adicionar testes de acessibilidade (axe / jest-axe)
- [ ] Cobrir estados de erro e carregamento (quando houver fetch real)
- [ ] Introduzir MSW para simular API (e eventualmente remover mockFetch global)
- [ ] Medir cobertura (`--coverage`) e definir meta (ex: 80%)
- [ ] Adicionar testes de seleção de categorias / filtro de produtos
- [ ] Teste de fluxo completo (adicionar item ao carrinho -> finalizar pedido) 

## 🧩 Stack Técnica

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (ambiente rápido de desenvolvimento)
- TypeScript (tipagem estática)
- React Router v7 (navegação)
- Context API para estado de carrinho / produtos / categorias
- Jest (runner) + @testing-library/react + @testing-library/user-event
- Tailwind CSS (utilitário de estilos)
- JSON Server (mock de backend local)

## 📂 Estrutura de Pastas (resumida)

```
src/
  components/        # UI reutilizável (Button, Header, ProductCard, ...)
  context/           # Providers e lógica de estado global
  routes/            # Definição de rotas e helpers
  screens/           # Páginas (Home, Cart, Product, NotFound)
  utils/             # Funções utilitárias e tipos
  assets/            # Imagens e ícones
  test-utils/        # Helpers e mocks compartilhados (render, routerMocks, mockFetch, fileMock)
```

## 📜 Convenções de Código & Teste

- Nome de arquivo de teste: `Componente.test.tsx` ao lado do alvo.
- `describe` agrupa domínio funcional do componente / módulo.
- Test names em inglês (ou português consistente) descrevendo comportamento.
- Preferir uma expectativa principal por cenário lógico (adicionais ok se relacionados).
- Não testar detalhes de implementação (focar comportamento / UI / contrato público).
- Mocks centrais configurados em `jest.setup.ts` (navegação + fetch). Limpeza automática via `afterEach` lá.
- Em novos testes, obter `user` de `renderWithProviders` em vez de `userEvent.setup()` manual.

## ⚙️ Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Ambiente de desenvolvimento Vite (HMR) |
| `pnpm test` | Executa todos os testes Jest |
| `pnpm build` | Build de produção (TypeScript + Vite) |
| `pnpm preview` | Servir build gerado |
| `pnpm server` | Sobe JSON Server na porta 3001 |
| `pnpm lint` | Rodar ESLint |

## 🚀 Execução Local

```bash
# Instalar dependências
pnpm install

# Rodar aplicação
pnpm dev

# Rodar servidor mock
pnpm server

# Rodar testes
pnpm test
```

## 🔍 Exemplo de Teste (Header) – padrão atual

```tsx
import { screen } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { renderWithProviders } from '@/test-utils/render';
import { mockNavigate } from '@/test-utils/routerMocks';

describe('Header', () => {
  test('navega para home ao clicar no logo', async () => {
    const { user } = renderWithProviders(<Header />, { withProviders: false });
    await user.click(screen.getByRole('img', { name: /logo/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
```

### Por que não usamos mais `userEvent.setup()` manual?
O helper já cria e retorna `user`, reduzindo repetição e garantindo configuração consistente entre testes.

### Sobre limpeza de mocks
Histórico de chamadas de `fetch` e `mockNavigate` é limpo automaticamente no `jest.setup.ts`. Só adicione `clearAllMocks` localmente se um teste definir implementações específicas de outros mocks.

## ✅ Qualidade & Boas Práticas

- ESLint configurado (pode evoluir para regras type-aware)
- Tipagem consistente em componentes / contextos
- Testes priorizam comportamento (não detalhes internos)
- Renderizações independentes por teste garantem isolamento

## 📌 Aprendizados até agora

1. Diferenciar limpar chamadas (`mockClear`) de redefinir implementação (`mockReset`).
2. Helper de render melhora consistência e reduz boilerplate (router + providers + user).
3. Mock centralizado de `useNavigate` evita mocks duplicados e divergentes em cada arquivo.
4. IDs determinísticos em testes de estado previnem flakiness oculta.
5. Queries semânticas geram testes mais robustos do que `data-testid` na maioria dos casos.

## 🛣️ Roadmap Futuro

- [ ] Testes de integração leves (fluxos completos: adicionar item ao carrinho)
- [ ] Mock de requisições com MSW
- [ ] Testes de acessibilidade (axe / jest-axe)
- [ ] Storybook para isolamento de componentes + snapshot visual
- [ ] Pipeline CI com lint + test + coverage gate

## 🤝 Contribuição (estudo pessoal)

O repositório é principalmente educacional (curso Alura). Sugestões de melhoria de testes ou cobertura são bem-vindas via issues / PRs.

## 📚 Referências

- [Jest Docs](https://jestjs.io/)
- [Testing Library](https://testing-library.com/docs/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Se quiser ver próximos incrementos (ex: cobertura, MSW ou acessibilidade) abra uma issue ou continue os experimentos. Bons testes! 🧪
