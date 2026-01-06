# ExplicaAí
### IA para leitura, interpretação, resumos e traduções de imagens

---

## 📌 Sobre o Projeto

**ExplicaAí** é um aplicativo web baseado em Inteligência Artificial que realiza a análise completa de imagens enviadas pelo usuário, retornando informações organizadas sobre o contexto da imagem, texto identificado (OCR), interpretação do conteúdo, possíveis usos e observações relevantes.

O projeto foi desenvolvido como um **MVP funcional**, com foco em simplicidade, clareza e aplicabilidade prática, utilizando a plataforma Lovable para construção e publicação.

🔗 Aplicação publicada:  
https://explica-ai-genius.lovable.app

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido vinculado à **Universidade Federal de São Carlos (UFSCar)**, com o objetivo de **complementação de horas acadêmicas**.

O projeto será enviado à coordenação do curso como documentação oficial, conforme solicitado na disciplina.

**Orientador:**  
Prof. Dr. Emerson Carlos Pedrino  

**Aluno:**  
Heitor P. Colichio  

---

## 💡 Motivação

A motivação do projeto surgiu da necessidade de compreender rapidamente o conteúdo de imagens, especialmente:

- Prints de tela  
- Documentos  
- Avisos  
- Erros de sistema  
- Imagens informativas em geral  

Muitas imagens contêm informações importantes que não são imediatamente claras. O **ExplicaAí** utiliza IA para interpretar essas imagens e fornecer explicações diretas, organizadas e confiáveis, sem que o usuário precise explicar previamente o que deseja fazer com a imagem.

---

## 🎯 Objetivos do Aplicativo

O ExplicaAí tem como objetivos principais:

- Receber qualquer tipo de imagem enviada pelo usuário  
- Identificar automaticamente o contexto da imagem  
- Extrair todo o texto presente na imagem (OCR)  
- Explicar o significado do conteúdo de forma clara e acessível  
- Apresentar possíveis usos ou aplicações do conteúdo  
- Exibir observações relevantes e referências quando aplicável  

---

## 👥 Público-Alvo

O aplicativo pode ser utilizado por:

- Estudantes  
- Professores  
- Pessoas com dificuldade de leitura  
- Profissionais de diferentes áreas  
- Usuários que precisam entender documentos, avisos ou erros técnicos  

---

## 🧱 Stack Tecnológica

### Frontend
- **React 18 + TypeScript** – Interface reativa com tipagem estática  
- **Vite** – Build tool rápido para desenvolvimento  
- **Tailwind CSS** – Estilização utility-first  
- **shadcn/ui** – Componentes acessíveis e customizáveis  

### Backend
- **Lovable Cloud (Supabase)** – Backend serverless  
- **Deno Edge Functions** – Processamento de requisições  
- **Lovable AI Gateway** – Acesso aos modelos de IA  

### Modelo de IA
- **Google Gemini 2.5 Flash** – Modelo multimodal (texto + imagem)

---

## 🔄 Estrutura e Fluxo do Aplicativo

O fluxo do aplicativo foi projetado para ser simples e intuitivo:

1. O usuário informa seu nome  
2. O app exibe uma saudação personalizada  
3. O usuário pode informar o que deseja saber sobre a imagem (campo opcional)  
4. O usuário realiza o upload da imagem  
5. A IA processa a imagem  
6. O resultado é exibido de forma organizada em seções  

---

## 🖥️ Interface do Usuário (UI/UX)

O design do ExplicaAí segue os seguintes princípios:

- Interface clean e minimalista  
- Tipografia legível  
- Layout centralizado  
- Facilidade de uso  
- Pouca poluição visual  

O objetivo é permitir uso imediato, sem necessidade de instruções complexas.

---

## ⚙️ Funcionalidades Implementadas

- Upload de qualquer tipo de imagem  
- Identificação automática do contexto  
- OCR completo  
- Análise estruturada em 6 seções  
- Campo opcional para direcionar a análise  
- 3 níveis de detalhamento (Resumido, Padrão, Detalhado)  
- Resumo rápido no topo dos resultados  
- Tradução para 5 idiomas com reversão perfeita  
- Perguntas sugeridas para follow-up  
- Botão para copiar o resultado  
- Botão para analisar outra imagem  
- Aviso de privacidade (imagens não armazenadas)  

---

## 🧠 Estrutura da Resposta da IA

A resposta da IA segue sempre esta estrutura fixa:

- 📌 Contexto da imagem  
- 📝 Texto identificado (OCR)  
- 💡 Explicação e interpretação  
- 🎯 Possíveis usos ou aplicações  
- ⚠️ Observações relevantes  
- 📚 Fontes confiáveis (quando aplicável)  

---

## ▶️ Como Utilizar o Projeto

1. Acesse o link do aplicativo  
2. Informe seu nome na tela inicial  
3. (Opcional) Descreva o que deseja saber sobre a imagem  
4. Envie uma imagem para análise  
5. Aguarde o processamento  
6. Leia o resultado organizado exibido na tela  

---

## 🧭 Passo a Passo do Desenvolvimento do Projeto

### Fase 1 – MVP
- Setup do projeto com Vite + React + TypeScript  
- Configuração do Tailwind CSS e shadcn/ui  
- Componente inicial de upload de imagem  
- Edge Function inicial para análise  

### Fase 2 – Estruturação da Análise
- Definição das 6 seções obrigatórias  
- Criação do prompt de sistema estruturado  
- Componente de exibição dos resultados  

### Fase 3 – Experiência do Usuário
- Fluxo de identificação por nome  
- Campo opcional para foco da análise  
- Implementação dos níveis de detalhamento  

### Fase 4 – Resumo Rápido
- Extração automática do contexto  
- Exibição destacada no topo dos resultados  

### Fase 5 – Sistema de Tradução
- Edge Function dedicada à tradução  
- Seleção de idiomas  
- Tradução literal com reversão ao idioma original  

### Fase 6 – Refinamentos
- Correção de bugs  
- Ajustes finos nos prompts  
- Perguntas sugeridas  
- Polimento visual e UX  

---

## 🔁 Como Replicar o Projeto

Existem **duas formas principais** de replicar este projeto.

---

### 🔹 Opção A – Replicação via GitHub (Desenvolvimento Local)

#### Pré-requisitos
- Node.js 18+  
- Git  
- Conta no Supabase  

#### Passos

```bash

Criar arquivo .env na raiz do projeto:

VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
npm install

Configurar o Supabase:

Criar projeto no Supabase
Fazer deploy das Edge Functions em supabase/functions/
Configurar secrets de API
Executar localmente:
npm run dev

Build de produção:
npm run build

Opção B – Remix via Lovable (Recomendado)

Acessar o projeto original no Lovable
Clicar em Settings → Remix this project
O Lovable cria uma cópia completa do projeto
Backend e Edge Functions já vêm configurados
Publicar com um clique


🔐 Considerações de Privacidade
As imagens não são armazenadas

Processamento ocorre apenas em memória

Nome do usuário salvo apenas no localStorage

Aplicação stateless (sem banco de usuários)

🌐 Hospedagem
O aplicativo está hospedado na infraestrutura do Lovable e permanece disponível enquanto o projeto existir na conta do desenvolvedor, sem prazo automático de expiração.

📈 Possibilidades de Expansão
Modo acadêmico ou profissional

Comparação entre imagens

Exportação em PDF

Novos idiomas

Melhorias visuais

📄 Licença e Uso
Este projeto possui finalidade acadêmica, podendo ser utilizado como base para estudos, demonstrações e trabalhos relacionados à disciplina, desde que mantidos os créditos ao autor e ao orientador.

🙏 Agradecimentos
Agradeço ao Professor Dr. Emerson Carlos Pedrino pela orientação, suporte e acompanhamento durante o desenvolvimento do projeto.


