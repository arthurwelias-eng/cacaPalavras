# PRD — Jogo Casual de Adivinhação de Palavras

## 1. Visão geral do produto

Produto: jogo casual diário de adivinhação de palavras
Plataforma: web responsiva mobile-first
Público: crianças e jovens
Mecânica principal: desafio diário com palavras por tema
Estratégia: foco em retenção diária e crescimento orgânico
Monetização: sem monetização no MVP

O produto é um jogo casual em que o jogador tenta descobrir uma palavra secreta em algumas tentativas. A experiência deve ser rápida, intuitiva e visualmente clara, com feedback imediato e ritual diário, para aumentar o hábito de retorno.

## 2. Problema a ser resolvido

Jogos casuais de palavras têm grande potencial de engajamento, mas muitas experiências falham por causa de:
- regras pouco claras
- onboarding pesado
- pouca clareza na mecânica
- baixa recorrência
- frustração por dificuldade excessiva
- falta de rotina e ritual diário

O produto resolve isso criando uma experiência:
- simples e acessível
- rápida de jogar
- visualmente direta
- organizada em temas
- recorrente e reforçada por streak

## 3. Objetivo do produto

Objetivo principal:
- aumentar a recorrência diária e manter uma sequência (streak) de jogadas

Objetivos secundários:
- tornar o jogo acessível para crianças e jovens
- ensinar palavras por tema de forma leve e divertida
- criar sensação de progresso sem exigir cadastro
- gerar crescimento orgânico por compartilhamento

## 4. Público-alvo

Público principal:
- crianças e jovens
- faixa etária aproximada: 8 a 18 anos
- usam celular e tablet com frequência
- gostam de jogos simples e rápidos
- respondem bem a feedback visual e desafios leves

Necessidades:
- entender a regra rapidamente
- gastar pouco tempo por partida
- sentir progresso
- receber retorno imediato
- manter um ritual diário sem esforço

## 5. Persona principal

Nome: Ana, 12 anos

Perfil:
- gosta de jogos rápidos e coloridos
- usa o celular todos os dias
- gosta de desafios e pequenas recompensas
- se interessa por temas e novidades
- gosta de compartilhar conquistas com amigos

Necessidades:
- entender o jogo em segundos
- sentir que está melhorando
- encontrar palavras relacionadas a temas que lhe interessam
- manter uma rotina divertida no dia a dia

## 6. Proposta de valor

O jogo oferece:
- uma partida por dia
- algumas tentativas para descobrir a palavra
- feedback visual claro
- sensação de aprendizagem incremental
- ritual diário com sequência
- temas interessantes por categoria
- compartilhamento simples e leve

## 7. Core loop do jogo

1. Usuário entra na tela inicial
2. Visualiza a categoria e a quantidade de letras
3. Tenta adivinhar a palavra
4. Recebe feedback por letra
5. Ajusta a próxima tentativa
6. Acerta ou esgota as tentativas
7. Vê o resultado final
8. Consulta estatísticas básicas
9. Compartilha o resultado sem revelar a solução

## 8. Regras do jogo

- Uma palavra por dia por usuário
- Palavra escolhida automaticamente pela data
- Palavra possui tamanho fixo (5 letras no MVP)
- O jogador tem até 6 tentativas
- A palavra pertence a uma categoria temática
- A categoria pode mudar todos os dias
- As letras recebem feedback por cor:
  - verde: correta e na posição correta
  - amarelo: correta, mas em outra posição
  - cinza: não existe na palavra
- O jogo não revela a resposta antes do fim
- O compartilhamento mostra apenas o resultado, sem expor a solução

## 9. Estrutura das categorias

A lista de temas pode incluir:
- animais
- comida
- ciência
- esportes
- natureza
- objetos
- profissões
- escola
- tecnologia
- hobbies

Para o MVP, a prioridade será:
- animais
- comida
- ciência
- esportes

Quantidade definida para o MVP: 4 temas prioritários (foco total no escopo).

## 10. Funcionalidades do MVP

### 10.1 Tela inicial
- nome do jogo
- botão para iniciar
- explicação curta de como funciona
- indicação do tema do dia

### 10.2 Tela de partida
- categoria do tema
- número de letras
- campo para inserir tentativas
- feedback por tentativa
- botão de envio
- opção de voltar ao início

### 10.3 Feedback visual
- letras com status visuais
- verde: correta e na posição correta
- amarelo: correta, mas em outra posição
- cinza: ausente
- destaque claro para facilitar leitura

### 10.4 Tela de resultado
- mensagem de vitória ou derrota
- quantidade de tentativas usadas
- palavra correta revelada ao final
- botão para voltar à tela inicial ou aguardar o próximo dia

### 10.5 Estatísticas
- streak atual
- melhor streak
- total de vitórias
- total de partidas
- última palavra resolvida
- percentual de acerto

### 10.6 Compartilhamento
- botão para copiar resultado
- botão para compartilhar em redes sociais
- mensagem sem revelar a solução
- exemplo: "Acabei de jogar hoje e usei 4 tentativas!"

## 11. Requisitos funcionais

- O sistema deve gerar uma palavra do dia com base na data
- O sistema deve associar a palavra a uma categoria
- O sistema deve validar se a tentativa é uma palavra válida
- O sistema deve calcular feedback por letra
- O sistema deve limitar o número de tentativas
- O sistema deve registrar o resultado da partida
- O sistema deve manter sequência diária do usuário
- O sistema deve armazenar histórico básico de jogadas
- O sistema deve exibir estatísticas simples
- O sistema deve permitir compartilhamento de resultado
- O sistema deve funcionar em mobile e desktop responsivo
- O sistema deve aceitar entrada por teclado e teclado virtual
- O sistema deve usar palavras com nível adequado à faixa etária

## 12. Requisitos não funcionais

- interface clara e de leitura simples
- carregamento rápido
- layout responsivo
- boa legibilidade em telas pequenas
- alta acessibilidade visual
- baixo consumo de dados
- sem necessidade de cadastro obrigatório
- desempenho consistente em navegadores modernos
- suporte básico para acessibilidade visual:
  - contraste adequado
  - fontes legíveis
  - botões grandes

## 13. Regras de negócio

- a palavra do dia é a mesma para todos os usuários daquela data
- a palavra deve estar no banco de palavras permitidas
- as palavras escolhidas devem atender ao tema do dia
- o usuário não pode repetir uma tentativa já feita
- palavras inválidas devem gerar aviso claro
- o sistema deve registrar a partida do dia como concluída ou não
- o sistema deve atualizar o streak quando o usuário joga e retorna no dia seguinte
- o sistema deve respeitar a lógica de "um jogo por dia" no MVP
- o streak é contínuo: se o jogador pular um dia, o streak é reiniciado

## 14. Fluxo principal do usuário

Fluxo principal:
1. abrir o jogo
2. ver a categoria e a quantidade de letras
3. inserir a primeira tentativa
4. receber feedback
5. ajustar a próxima tentativa
6. repetir até resolver
7. confirmar resultado
8. ver estatísticas
9. compartilhar

## 15. Histórias de usuário

- Como jogador casual, quero entender a regra em poucos segundos para começar sem esforço.
- Como usuário, quero receber feedback visual por letra para saber como me aproximar da resposta.
- Como usuário jovem, quero ter temas divertidos para me interessar em jogar todos os dias.
- Como jogador, quero ver meu progresso para sentir que estou melhorando.
- Como usuário, quero compartilhar meu resultado sem expor a resposta para incentivar outros a jogar.
- Como jogador, quero continuar minha sequência diária para manter o hábito.

## 16. Critérios de aceitação

- A tela inicial deve carregar em menos de 2 segundos em rede estável
- O tutorial deve caber em até 2 frases curtas
- O jogo deve permitir ao menos 6 tentativas
- A palavra deve ser validada antes de confirmar
- O feedback deve ser exibido imediatamente após a tentativa
- O resultado deve aparecer sem atraso
- O sistema deve manter o streak do usuário em base diária
- O resultado compartilhado não deve revelar a solução
- A experiência deve funcionar em celular com largura pequena

## 17. Métricas de sucesso

Principais métricas:
- retenção em 1 dia
- retenção em 3 dias
- retenção em 7 dias
- taxa de conclusão da partida
- taxa de vitória
- média de tentativas por partida
- tempo médio de sessão
- streak médio
- número de compartilhamentos
- taxa de retorno no dia seguinte

Métricas de qualidade:
- taxa de tentativa inválida
- taxa de abandono na primeira tela
- taxa de erro de entendimento da mecânica
- tempo até a primeira jogada

## 18. Riscos e desafios

- palavras muito difíceis para a faixa etária
- excesso de frustração em alguns temas
- baixa retenção se o ritual diário não ficar claro
- pouca variedade se as categorias forem reduzidas demais
- compartilhamento sem engajamento real
- dificuldade de destacar o jogo em um mercado competitivo

## 19. Escopo do MVP

O MVP deve incluir:
- palavra do dia
- categoria temática
- até 6 tentativas
- feedback por letras
- tela de resultado
- streak simples
- estatísticas básicas
- compartilhamento
- layout mobile-first
- sem cadastro obrigatório
- sem monetização

## 20. O que não entra no MVP

- ranking global
- multiplayer
- compras internas
- assinatura
- sistema de avatar avançado
- temas muito complexos
- tutorial longo
- sistema de recompensas pesado

## 21. Roadmap sugerido

### MVP
- palavra do dia por tema
- feedback por letras
- streak diário
- estatísticas básicas
- compartilhamento simples

### Próxima fase
- mais categorias
- mais palavras por tema
- dificuldade personalizada
- histórico detalhado
- desafios semanais
- elementos sociais leves

## 22. Definição final do produto

Produto: jogo casual diário de adivinhação de palavras para público jovem, com temas e ritual diário, pensado para web mobile-first, sem monetização no MVP, com foco em retenção orgânica.

## 23. Conclusão

Este PRD estabelece uma base sólida para o desenvolvimento do jogo, priorizando simplicidade, aprendizado leve, feedback visual claro e recorrência diária. O MVP é focado em oferecer uma experiência acessível e habit-forming, com grande potencial de expansão em futuras versões.

---

## 24. Registro de decisões do MVP

Durante a elaboração do PRD, com base na pesquisa aprofundada sobre jogos casuais de adivinhação de palavras (Wordle, Quordle, Contexto, etc.) e nos alinhamentos realizados, as seguintes decisões foram consolidadas:

- Feedback por letra (verde/amarelo/cinza), no modelo clássico do Wordle.
- Palavra do dia com tamanho fixo de 5 letras e até 6 tentativas.
- Temas prioritários no MVP: animais, comida, ciência e esportes.
- Streak contínuo: se o jogador pular um dia, o streak é reiniciado.
- Compartilhamento no MVP: cópia de texto da mensagem.
- Acessibilidade visual priorizada: alto contraste, fontes legíveis e botões grandes.

https://codelabs.developers.google.com/codelabs/beyond-vibe-coding-for-the-web?hl=pt-br#0
