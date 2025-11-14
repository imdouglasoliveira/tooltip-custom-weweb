# Tooltip Custom - WeWeb Component

Componente de tooltip customizável para [WeWeb](https://www.weweb.io/).

## Descrição

Tooltip personalizável que pode ser aplicado a qualquer elemento no WeWeb. Basta passar o texto que deseja exibir e o tooltip aparecerá ao passar o mouse (hover) ou clicar no elemento.

### Características

- 📝 Texto totalmente customizável
- 🎨 Estilo visual configurável (cores, tamanho, posição)
- 🖱️ Ativação por hover ou click
- 📱 Responsivo e adaptável
- ⚡ Performance otimizada

### Casos de Uso

- Explicações de termos técnicos
- Informações complementares sobre elementos da UI
- Ajuda contextual para usuários
- Referências e definições (ex: SINAPI, normas, etc)

## Instalação

Para executar localmente, primeiro instale as dependências:

```bash
npm install
```

## Desenvolvimento

Para servir localmente, execute:

```bash
npm run serve --port=[PORT]
```

Depois vá no WeWeb Editor, abra o popup de desenvolvedor e adicione seu elemento customizado.

## Build

Antes de fazer release, verifique erros de build executando:

```bash
npm run build --name=tooltip-custom
```

## Configuração no WeWeb

No editor WeWeb, você poderá configurar:

- **Texto do Tooltip**: Conteúdo a ser exibido
- **Posição**: Top, bottom, left, right
- **Trigger**: Hover ou click
- **Tema**: Claro ou escuro
- **Delay**: Tempo de atraso para aparecer/desaparecer
