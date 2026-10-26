# BioIlhas

Aplicativo educacional em Expo e React Native para apoiar aulas de biologia com biomas brasileiros, leitura guiada e salvamento do ponto de leitura.

## Executar

```bash
npm install
npm run start
```

Abra no Expo Go ou pressione `w` no terminal para iniciar a versão web.

## Firebase

O app salva o progresso no dispositivo e sincroniza com o Cloud Firestore quando um projeto Firebase está configurado. Para ativar a sincronização:

1. Crie um projeto Firebase e registre um app Web.
2. Em **Authentication > Sign-in method**, habilite **E-mail/senha**.
3. Em **Authentication > Users**, crie a conta da professora Patrícia.
4. Crie um banco Cloud Firestore.
5. Copie `.env.example` para `.env.local` e preencha as configurações do app Firebase.
6. Reinicie o Expo para carregar as variáveis:

```bash
npm run start
```

O login usa Firebase Authentication com e-mail e senha; a tela também oferece redefinição de senha. A conta da professora deve ser criada no Console do Firebase. O progresso sincronizado é salvo em `users/{uid}/progress/current`.

Use regras do Firestore que limitem cada conta aos próprios documentos:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

As chaves `EXPO_PUBLIC_*` são incluídas no app cliente; não coloque credenciais administrativas ou chaves privadas nelas.

## Conteúdo didático

As telas incluem textos de demonstração originais para mostrar a navegação e a leitura por páginas. Substitua esses exemplos por materiais que a escola ou a cliente tenha autorização para usar.
