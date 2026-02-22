<template>
  <section :id="id" class="section">
    <div class="container">
      <header v-if="title || subtitle" class="section__header">
        <p v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</p>
        <h2 v-if="title" class="section__title">{{ title }}</h2>
        <p v-if="subtitle" class="section__subtitle">{{ subtitle }}</p>
      </header>

      <div class="section__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.section {
  padding: 72px 0;
  scroll-margin-top: 84px; /* para que el header fijo no tape el título */

  /* Fondo muy sutil por sección (papel) */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0)
  );
}

.container {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
}

.section__header {
  margin-bottom: 28px;
}

/* “Eyebrow” con toque sakura */
.section__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;

  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;

  color: var(--ink-700);
  margin: 0 0 12px;
}

/* Línea decorativa tipo “washi” */
.section__eyebrow::before {
  content: "";
  width: 22px;
  height: 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--sakura-300) 45%, white);
  border: 1px solid
    color-mix(in srgb, var(--sakura-300) 55%, rgba(43, 42, 45, 0.1));
}

/* Títulos más elegantes y claros */
.section__title {
  font-size: 34px;
  line-height: 1.1;
  margin: 0 0 10px;
  color: var(--ink-900);
  letter-spacing: 0.01em;
}

/* Subtítulo “papel” */
.section__subtitle {
  margin: 0;
  color: var(--ink-500);
  max-width: 70ch;
}

/* Un contenedor suave para el contenido (opcional pero queda brutal) */
.section__content {
  border-radius: var(--radius-lg);
}

/* Responsive */
@media (max-width: 520px) {
  .section {
    padding: 56px 0;
  }
  .section__title {
    font-size: 28px;
  }
}
</style>
