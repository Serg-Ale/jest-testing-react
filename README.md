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
| Componentes simples | Render + assertions sem mocks complexos | Queries byRole / byTestId | `Footer.test.tsx` |
| Navegação | Mock de `useNavigate` | `jest.mock('react-router', ...)` | `Header.test.tsx` |
| Interação do usuário | `userEvent` para cliques e digitação | Setup único em `beforeEach` | `Header.test.tsx` |
| Context (estado global) | Render com Providers reais | Asserts de mutação de estado | `cart.context.test.tsx` |
| Funções utilitárias | Testes determinísticos | Valores de entrada/saída | `utils/index.test.ts` |

### Boas práticas aplicadas

- `userEvent.setup()` centralizado em `beforeEach` para reduzir repetição
- `jest.clearAllMocks()` em `afterEach` para evitar vazamento de chamadas entre testes
- Evitado uso desnecessário de `beforeAll` / `afterAll` (isolamento primeiro)
- Queries preferindo semântica (ex: `getByAltText('logo')`) quando possível
- Separação clara: Arrange (render), Act (interação), Assert (expect)

### Próximos passos de testes (Roadmap)

- [ ] Adicionar testes de acessibilidade (axe / jest-axe)
- [ ] Cobrir estados de erro e carregamento (quando houver fetch)
- [ ] Introduzir MSW para simular API
- [ ] Medir cobertura (`--coverage`) e definir meta (ex: 80%)
- [ ] Adicionar testes de seleção de categorias / filtro de produtos

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
test/__mocks__/      # Mocks auxiliares (ex: fileMock)
```

## 📜 Convenções de Código & Teste

- Nome de arquivo de teste: `Componente.test.tsx` ou perto do alvo
- `describe` agrupa domínio funcional do componente / módulo
- Test names em inglês, no formato: `should <expected behavior> when <condition>`
- Evitar múltiplos asserts não relacionados em um único teste
- Não misturar responsabilidades: interação + efeito esperado claro
- Limpeza de mocks sempre local (`afterEach`) em vez de global (maior isolamento)

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

## 🔍 Exemplo de Teste (Header)

```tsx
describe('Header', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    render(<MemoryRouter><Header /></MemoryRouter>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should navigate to home page when clicking the logo', async () => {
    await user.click(screen.getByAltText('logo'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
```

### Por que evitar `resetAllMocks` aqui?
`clearAllMocks` preserva implementações custom de mocks; só limpamos histórico de chamadas. `resetAllMocks` também descarta implementações — desnecessário quando não sobrescrevemos `mockImplementation` entre testes.

## ✅ Qualidade & Boas Práticas

- ESLint configurado (pode evoluir para regras type-aware)
- Tipagem consistente em componentes / contextos
- Testes priorizam comportamento (não detalhes internos)
- Renderizações independentes por teste garantem isolamento

## 📌 Aprendizados até agora

1. Diferença entre limpar chamadas (`clearAllMocks`) e redefinir mocks (`resetAllMocks`)
2. Setup único de `userEvent` reduz duplicação e facilita manutenção
3. Mock seletivo de `useNavigate` para testar roteamento sem acoplamento à implementação
4. Importância de nomes descritivos nos testes para leitura futura

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

Se quiser ver próximos incrementos (ex: cobertura ou MSW) abra uma issue ou continue os experimentos. Bons testes! 🧪
