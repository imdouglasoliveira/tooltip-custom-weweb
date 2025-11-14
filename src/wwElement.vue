<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @touchstart="handleTouchStart"
    ref="tooltipWrapper"
  >
    <!-- Slot para conteúdo customizado OU ícone padrão -->
    <slot>
      <svg
        v-if="showIcon"
        class="tooltip-icon"
        :style="iconStyle"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 16v-4"></path>
        <path d="M12 8h.01"></path>
      </svg>
    </slot>

    <transition name="tooltip-fade">
      <div
        v-if="isVisible"
        class="tooltip-content"
        :class="[
          `tooltip-${position}`,
          `tooltip-theme-${theme}`
        ]"
        :style="tooltipStyle"
        ref="tooltip"
      >
        <div class="tooltip-inner">
          {{ tooltipText }}
        </div>
        <div
          class="tooltip-arrow"
          :style="{ color: tooltipStyle.backgroundColor }"
        ></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      isVisible: false,
      timeoutId: null,
      isMobile: false,
      adjustedPosition: null,
    };
  },
  computed: {
    tooltipText() {
      return this.content.tooltipText || 'Tooltip text';
    },
    position() {
      return this.adjustedPosition || this.content.position || 'right';
    },
    theme() {
      return this.content.theme || 'dark';
    },
    showIcon() {
      return this.content.showIcon !== false;
    },
    iconStyle() {
      return {
        width: `${this.content.iconSize || 20}px`,
        height: `${this.content.iconSize || 20}px`,
        color: this.content.iconColor || '#4A5568',
        cursor: 'pointer',
      };
    },
    trigger() {
      // Auto-detect: hover para desktop (>900px), click para mobile (<=900px)
      if (this.isMobile) {
        return 'click';
      }
      return this.content.trigger || 'hover';
    },
    tooltipStyle() {
      const style = {
        maxWidth: `${this.content.maxWidth || 280}px`,
        fontSize: `${this.content.fontSize || 13}px`,
      };

      if (this.theme === 'dark') {
        style.backgroundColor = this.content.backgroundColor || '#2d2d2d';
        style.color = this.content.textColor || '#FFFFFF';
      } else {
        style.backgroundColor = '#FFFFFF';
        style.color = '#2d2d2d';
        style.border = '1px solid #E2E8F0';
      }

      return style;
    },
    arrowStyle() {
      return {};
    },
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 900;
    },
    handleMouseEnter() {
      // Hover apenas em desktop (>900px)
      if (!this.isMobile && this.trigger === 'hover') {
        this.showTooltip();
      }
    },
    handleMouseLeave() {
      // Hover apenas em desktop (>900px)
      if (!this.isMobile && this.trigger === 'hover') {
        this.hideTooltip();
      }
    },
    handleClick(event) {
      // Click em mobile (<=900px) ou se configurado para click
      if (this.isMobile || this.trigger === 'click') {
        event.stopPropagation();
        event.preventDefault();
        this.toggleTooltip();
      }
    },
    handleTouchStart(event) {
      // Touch events para mobile
      if (this.isMobile) {
        event.stopPropagation();
        this.toggleTooltip();
      }
    },
    showTooltip() {
      clearTimeout(this.timeoutId);
      const delay = this.content.delay || 0;
      this.timeoutId = setTimeout(() => {
        this.isVisible = true;
        this.$nextTick(() => {
          this.adjustTooltipPosition();
        });
      }, delay);
    },
    adjustTooltipPosition() {
      if (!this.$refs.tooltip || !this.$refs.tooltipWrapper) return;

      const tooltip = this.$refs.tooltip;
      const wrapper = this.$refs.tooltipWrapper;
      const tooltipRect = tooltip.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 10;

      let newPosition = this.content.position || 'right';

      // Check horizontal overflow
      if (newPosition === 'left' && tooltipRect.left < margin) {
        newPosition = 'right';
      } else if (newPosition === 'right' && tooltipRect.right > viewportWidth - margin) {
        newPosition = 'left';
      }

      // Check vertical overflow
      if (newPosition === 'top' && tooltipRect.top < margin) {
        newPosition = 'bottom';
      } else if (newPosition === 'bottom' && tooltipRect.bottom > viewportHeight - margin) {
        newPosition = 'top';
      }

      // Additional check: if still overflowing on right, force left
      if (newPosition === 'right') {
        const potentialRight = wrapperRect.right + tooltip.offsetWidth + 20;
        if (potentialRight > viewportWidth - margin) {
          newPosition = 'left';
        }
      }

      this.adjustedPosition = newPosition;
    },
    hideTooltip() {
      clearTimeout(this.timeoutId);
      this.isVisible = false;
      this.adjustedPosition = null;
    },
    toggleTooltip() {
      if (this.isVisible) {
        this.hideTooltip();
      } else {
        this.showTooltip();
      }
    },
    handleClickOutside(event) {
      if (this.isVisible) {
        if (this.$refs.tooltipWrapper && !this.$refs.tooltipWrapper.contains(event.target)) {
          this.isVisible = false;
        }
      }
    },
    handleResize() {
      this.checkScreenSize();
      // Fecha tooltip ao mudar de tamanho de tela
      if (this.isVisible) {
        this.isVisible = false;
      }
    },
  },
  mounted() {
    // Detecta tamanho de tela inicial
    this.checkScreenSize();

    // Adiciona listeners
    document.addEventListener('click', this.handleClickOutside);
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // Remove listeners
    document.removeEventListener('click', this.handleClickOutside);
    window.removeEventListener('resize', this.handleResize);
    clearTimeout(this.timeoutId);
  },
};
</script>

<style lang="scss" scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
}

.tooltip-icon {
  display: block;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.tooltip-content {
  position: absolute;
  z-index: 9999;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  white-space: normal;
  word-wrap: break-word;
  min-width: 240px;
  width: max-content;
}

.tooltip-inner {
  padding: 12px 16px;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

// Position - Top
.tooltip-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 12px;

  .tooltip-arrow {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px 6px 0 6px;
    border-color: currentColor transparent transparent transparent;
  }
}

// Position - Bottom
.tooltip-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 12px;

  .tooltip-arrow {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent currentColor transparent;
  }
}

// Position - Left
.tooltip-left {
  right: 100%;
  top: 0;
  margin-right: 6px;

  .tooltip-arrow {
    left: 100%;
    top: 10px;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent currentColor;
  }
}

// Position - Right
.tooltip-right {
  left: 100%;
  top: 0;
  margin-left: 6px;

  .tooltip-arrow {
    right: 100%;
    top: 10px;
    border-width: 6px 6px 6px 0;
    border-color: transparent currentColor transparent transparent;
  }
}

// Theme styles are handled in computed properties

// Transitions
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;

  &.tooltip-top {
    transform: translateX(-50%) translateY(4px);
  }

  &.tooltip-bottom {
    transform: translateX(-50%) translateY(-4px);
  }

  &.tooltip-left {
    transform: translateX(4px);
  }

  &.tooltip-right {
    transform: translateX(-4px);
  }
}
</style>
