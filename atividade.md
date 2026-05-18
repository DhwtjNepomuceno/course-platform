# 💼 Exercício 5A: Desenhando Tabelas da Plataforma de Cursos

> **Objetivo:** Sophia vai desenhar 3 tabelas novas: `Curso`, `Aula` e `Matricula`  
> **Duração:** ~30 minutos  
> **Dificuldade:** ⭐⭐⭐ (Intermediária)  
> **Pré-requisito:** Ter feito a tabela `Usuario` com sucesso

---

## 📚 Cenário

Vocês estão criando uma **plataforma de cursos online** (tipo Udemy, mas simples).

Até agora têm:
- ✅ **Tabela Usuario** — Quem se inscreve nos cursos

Faltam:
- ❓ **Tabela Curso** — Os cursos oferecidos
- ❓ **Tabela Aula** — Videoaulas dentro de cada curso
- ❓ **Tabela Matricula** — Rastrear quem está matriculado em qual curso

---

## ✅ Referência: Tabela Usuario (Já Feita)

```prisma
model Usuario {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  password  String
  name      String
  birthday  DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**O que tem aqui:**
- `id` → Identificador único (sempre é assim)
- `email` → Dado específico do usuário
- `password` → Dado específico do usuário
- `name` → Dado específico do usuário
- `birthday` → Dado específico do usuário
- `createdAt` / `updatedAt` → Timestamps (boa prática)

---

## 🎬 Tarefa 1: Tabela Curso

### Dados que você precisa armazenar:

Imagine que você precisa **descrever um curso** para alguém. O que você faria?

```
"Estou criando um curso chamado 'JavaScript Avançado'.
 Ele custa R$ 199.
 Tem uma descrição bem legal.
 Foi criado em janeiro."
```

**Perguntas para ajudar:**

1. **Cada curso precisa de um identificador único?**  
   Sim! Como você diferenciaria entre "JavaScript Avançado" (seu) e "JavaScript Avançado" (de outro criador)?

2. **Um curso tem nome?**  
   Sim! "JavaScript Avançado"

3. **Um curso tem descrição?**  
   Sim! "Aprenda as features modernas do JavaScript..."

4. **Um curso tem preço?**  
   Sim! R$ 199.00 (tipo `Decimal`)

5. **Um curso tem data de criação?**  
   Sim! Timestamp é importante.

6. **Um curso tem criador?**  
   🤔 **Pista importante:** Alguém precisa criar esse curso. Quem é? Um `Usuario`!  
   → Mas **não vou te dizer como fazer essa conexão**. Pense em como armazenar isso.

---

### ✏️ Seu trabalho:

Escreva o `model Curso` com:
- `id` (identificador único)
- `name` (String)
- `description` (String, pode ser longo)
- `price` (Decimal para preços)
- `createdAt` / `updatedAt` (timestamps)
- **Bônus:** Pense em como saber quem criou o curso. Você vai armazenar isso como um simples número inteiro?

```prisma
model Curso {
  // ← Complete aqui!
}
```

---

## 🎥 Tarefa 2: Tabela Aula

### Dados que você precisa armazenar:

```
"No curso 'JavaScript Avançado' tem uma aula chamada 'Arrow Functions'.
 É a aula número 5.
 Tem 12 minutos de duração.
 O vídeo está em youtube.com/watch?v=xxx"
```

**Perguntas para ajudar:**

1. **Cada aula precisa de um identificador único?**  
   Sim! Pode ter várias aulas chamadas "Arrow Functions" em cursos diferentes.

2. **Uma aula tem título?**  
   Sim! "Arrow Functions"

3. **Uma aula tem número/ordem?**  
   Sim! "Aula 5 do curso", "Aula 1 do curso"

4. **Uma aula tem duração?**  
   Sim! 12 minutos (tipo `Int`)

5. **Uma aula tem um URL do vídeo?**  
   Sim! `youtube.com/watch?v=xxx`

6. **Uma aula pertence a um curso específico?**  
   🤔 **Pista importante:** "Arrow Functions" é do curso "JavaScript Avançado", não do curso "React Basics".  
   → Como você armazenaria essa informação? Seria um número inteiro?

---

### ✏️ Seu trabalho:

Escreva o `model Aula` com:
- `id` (identificador único)
- `title` (String)
- `orderInCourse` (Int — qual número da aula é)
- `durationMinutes` (Int)
- `videoUrl` (String)
- `createdAt` / `updatedAt` (timestamps)
- **Bônus:** Como você sabe que essa aula pertence ao curso "JavaScript Avançado"?

```prisma
model Aula {
  // ← Complete aqui!
}
```

---

## 📋 Tarefa 3: Tabela Matricula

### Dados que você precisa armazenar:

```
"Sophia está matriculada no curso 'JavaScript Avançado'.
 Se matriculou em 05/02/2026.
 Ela assistiu até a aula 7."
```

**Perguntas para ajudar:**

1. **Cada matrícula é única?**  
   Sim! Sophia pode se matricular no mesmo curso só uma vez. Portanto, "Sophia + JavaScript Avançado" = 1 matrícula única.

2. **Uma matrícula sabe QUEM está matriculado?**  
   🤔 **Pista:** "Sophia está matriculada" — seria um número inteiro representando Sophia?

3. **Uma matrícula sabe EM QUAL CURSO?**  
   🤔 **Pista:** "...no curso 'JavaScript Avançado'" — seria um número inteiro?

4. **Uma matrícula tem data?**  
   Sim! Quando se matriculou.

5. **Uma matrícula sabe o progresso?**  
   Sim! "Assistiu até a aula 7" (tipo `Int`)

6. **Uma matrícula tem status?**  
   Sim! Pode ser "ativo", "concluído", "pausado" (tipo `String` ou `Enum`)

---

### ✏️ Seu trabalho:

Escreva o `model Matricula` com:
- `id` (identificador único)
- `enrolledAt` (DateTime — quando se matriculou)
- `lastWatchedAulaId` (Int — qual foi a última aula assistida)
- `status` (String: "ativo", "concluído", "pausado")
- `updatedAt` (DateTime)
- **Bônus:** Como você sabe QUEM está matriculado? Como você sabe EM QUAL CURSO?

```prisma
model Matricula {
  // ← Complete aqui!
}
```

---

## 🔍 Dicas Ocultas (Se Ficar Preso)

Clique para expandir:

<details>
<summary>💡 Dica 1: Como "conectar" dados?</summary>

Você notou que sempre pedi "como você armazenaria isso?"

**Resposta:** Como um número inteiro simples!

- A `Aula` "Arrow Functions" armazena o número `1` para dizer "pertence ao curso ID 1"
- A `Matricula` armazena o número `1` para dizer "Sophia (ID 1) está matriculada"

É assim que bancos de dados funcionam: você guarda **identificadores** (números), não os dados inteiros.

Isso cria uma "conexão" entre tabelas, mas **sem saber o nome técnico**, você já fez!

</details>

<details>
<summary>💡 Dica 2: Qual tipo de dados usar?</summary>

- **Identificadores:** `Int` com `@id @default(autoincrement())`
- **Textos curtos:** `String`
- **Textos longos:** `String` (Prisma trata igual)
- **Números decimais (preço):** `Decimal` ou `Float`
- **Datas/timestamps:** `DateTime`
- **Verdadeiro/Falso:** `Boolean`
- **Números inteiros:** `Int`

</details>

<details>
<summary>💡 Dica 3: Attributes Prisma</summary>

```prisma
@id              // Campo é chave primária (identificador único)
@default(...)    // Valor padrão ao criar registro
@unique          // Deve ser único (só um registro com esse valor)
@updatedAt       // Atualiza automaticamente quando muda
```

Você já viu isso na tabela `Usuario`!

</details>

---

## 📝 Checklist Antes de Finalizar

Suas 3 tabelas devem ter:

- [ ] **Curso**
  - [ ] `id` com `@id @default(autoincrement())`
  - [ ] `name` (String)
  - [ ] `description` (String)
  - [ ] `price` (Decimal ou Float)
  - [ ] `createdAt` e `updatedAt`
  - [ ] Um campo que armazena quem criou (número inteiro)

- [ ] **Aula**
  - [ ] `id` com `@id @default(autoincrement())`
  - [ ] `title` (String)
  - [ ] `orderInCourse` (Int)
  - [ ] `durationMinutes` (Int)
  - [ ] `videoUrl` (String)
  - [ ] `createdAt` e `updatedAt`
  - [ ] Um campo que armazena qual curso pertence (número inteiro)

- [ ] **Matricula**
  - [ ] `id` com `@id @default(autoincrement())`
  - [ ] `enrolledAt` (DateTime)
  - [ ] `lastWatchedAulaId` (Int)
  - [ ] `status` (String)
  - [ ] `updatedAt` (DateTime)
  - [ ] Um campo para quem está matriculado (número inteiro)
  - [ ] Um campo para qual curso (número inteiro)

---

## 🚀 Próximo Passo

Quando terminar:

1. **Abra seu `prisma/schema.prisma`**
2. **Adicione seus 3 novos models** (junto com Usuario)
3. **Execute:**
   ```bash
   npx prisma migrate dev --name add_curso_aula_matricula
   ```
4. **Abra Prisma Studio para visualizar:**
   ```bash
   npx prisma studio
   ```

---

## 💭 Reflexão Final

Você acabou de desenhar uma estrutura de dados **de verdade**!

Empresas como Udemy, Coursera, Skillshare têm tabelas exatamente assim.
- Você pensou em que dados armazenar? ✅
- Você pensou em como conectar dados? ✅
- Você viu que tudo é número + timestamp? ✅

**Parabéns, você está pensando como um desenvolvedor de banco de dados.** 🎉

---

**Dúvidas?**  
Deixe uma mensagem ou chama Wallace para revisar seu schema!

**Tempo previsto:** ~30 minutos  
**Quando terminar:** Wallace vai revisar e dar feedback

---

**Wallace:** [Aqui você adiciona o schema completo de Sophia para feedback]
