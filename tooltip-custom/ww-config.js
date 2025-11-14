export default {
  editor: {
    label: {
      en: "Tooltip Custom",
      pt: "Tooltip Customizado",
    },
    icon: "fontawesome/solid/comment-dots",
  },
  properties: {
    tooltipText: {
      label: {
        en: "Tooltip Text",
        pt: "Texto do Tooltip",
      },
      type: "Text",
      section: "settings",
      defaultValue: "This is a tooltip",
      bindable: true,
    },
    showIcon: {
      label: {
        en: "Show Icon",
        pt: "Exibir Ícone",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: true,
    },
    iconSize: {
      label: {
        en: "Icon Size (px)",
        pt: "Tamanho do Ícone (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 20,
      bindable: true,
    },
    iconColor: {
      label: {
        en: "Icon Color",
        pt: "Cor do Ícone",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#4A5568",
      bindable: true,
    },
    position: {
      label: {
        en: "Position",
        pt: "Posição",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "right", label: { en: "Right", pt: "Direita" } },
          { value: "left", label: { en: "Left", pt: "Esquerda" } },
          { value: "top", label: { en: "Top", pt: "Cima" } },
          { value: "bottom", label: { en: "Bottom", pt: "Baixo" } },
        ],
      },
      defaultValue: "right",
    },
    trigger: {
      label: {
        en: "Trigger",
        pt: "Acionamento",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "hover", label: { en: "Hover", pt: "Hover" } },
          { value: "click", label: { en: "Click", pt: "Click" } },
        ],
      },
      defaultValue: "hover",
    },
    theme: {
      label: {
        en: "Theme",
        pt: "Tema",
      },
      type: "TextSelect",
      section: "settings",
      options: {
        options: [
          { value: "dark", label: { en: "Dark", pt: "Escuro" } },
          { value: "light", label: { en: "Light", pt: "Claro" } },
        ],
      },
      defaultValue: "dark",
    },
    backgroundColor: {
      label: {
        en: "Background Color",
        pt: "Cor de Fundo",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#2d2d2d",
      bindable: true,
    },
    textColor: {
      label: {
        en: "Text Color",
        pt: "Cor do Texto",
      },
      type: "Color",
      section: "settings",
      defaultValue: "#FFFFFF",
      bindable: true,
    },
    maxWidth: {
      label: {
        en: "Max Width (px)",
        pt: "Largura Máxima (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 250,
      bindable: true,
    },
    delay: {
      label: {
        en: "Delay (ms)",
        pt: "Atraso (ms)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 200,
      bindable: true,
    },
    fontSize: {
      label: {
        en: "Font Size (px)",
        pt: "Tamanho da Fonte (px)",
      },
      type: "Number",
      section: "settings",
      defaultValue: 13,
      bindable: true,
    },
  },
};
