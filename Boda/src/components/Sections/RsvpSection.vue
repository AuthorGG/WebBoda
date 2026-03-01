<template>
  <SectionWrapper
    id="rsvp"
    eyebrow="Confirmación"
    title="Confirma tu asistencia"
    subtitle="Para organizarlo todo bien, necesitamos que rellenes el formulario."
  >
    <article class="card">
      <h3 class="card__title">Es imprescindible que lo completes 🤍</h3>

      <p class="card__text">
        Para confirmar si vienes a la boda (y con cuántos acompañantes),
        necesitamos que rellenes este formulario. Es la forma más fácil para
        tenerlo todo ordenado.
      </p>

      <p class="card__text">¡Muchas gracias!</p>

      <div class="actions">
        <a
          class="btn btn--primary"
          :href="formUrl"
          target="_blank"
          rel="noreferrer"
        >
          Ir al formulario de asistencia
        </a>
      </div>

      <p class="hint">
        Consejo: rellénalo cuanto antes para que podamos cerrar lista.
      </p>
    </article>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionWrapper from "../layout/SectionWrapper.vue";

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfDZRkYrP9ALXe5meV5jteId7Gb8yCQXAgJtDgg0Gc-Wqrn_g/viewform?usp=publish-editor";

const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(formUrl);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1400);
  } catch {
    // noop
  }
};
</script>

<style scoped>
.card {
  max-width: 860px;
  padding: 18px;

  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(43, 42, 45, 0.12);
  border-radius: 18px;

  box-shadow:
    0 12px 28px rgba(43, 42, 45, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.75) inset;

  display: grid;
  gap: 10px;

  text-align: center;
}

.card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  color: var(--ink-900);
}

.card__text {
  margin: 0;
  color: var(--ink-700);
  font-size: 14px;
  line-height: 1.65;
  max-width: 70ch;
  margin-left: auto;
  margin-right: auto;
}

.card__text strong {
  color: var(--ink-900);
  font-weight: 900;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
  justify-content: center;
}

/* Botón base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
  border: 1px solid rgba(43, 42, 45, 0.14);
  background: rgba(255, 255, 255, 0.7);
  color: var(--ink-900);

  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 800;
  font-size: 13px;

  transition:
    background 150ms ease,
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.92);
  border-color: rgba(43, 42, 45, 0.18);
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(43, 42, 45, 0.1);
}

/* Primary coral suave */
.btn--primary {
  background: rgba(247, 135, 98, 0.16);
  border-color: rgba(247, 135, 98, 0.28);
}

.btn--primary:hover {
  background: rgba(247, 135, 98, 0.22);
  border-color: rgba(247, 135, 98, 0.34);
}

/* Ghost */
.btn--ghost {
  background: transparent;
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.7);
}

/* Toast pill sakura */
.toast {
  margin: 2px 0 0;
  display: inline-block;
  width: fit-content;

  padding: 8px 10px;
  border-radius: 999px;

  background: rgba(249, 194, 187, 0.22);
  border: 1px solid rgba(249, 194, 187, 0.4);
  color: var(--ink-700);

  font-size: 12px;
  font-weight: 800;

  margin-left: auto;
  margin-right: auto;
}

.hint {
  margin: 4px 0 0;
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
  max-width: 70ch;
}

@media (max-width: 520px) {
  .btn {
    width: 100%;
  }
}
</style>
