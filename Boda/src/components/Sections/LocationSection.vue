<template>
  <SectionWrapper
    id="lugar"
    eyebrow="Dónde y cuándo"
    title="Lugar y horarios"
    subtitle="Nos vemos en el Club de Campo de Alicante. Aquí tienes todo para llegar sin estrés."
  >
    <article class="card">
      <h3 class="card__title">Celebración</h3>

      <p class="card__line">
        <strong>Fecha:</strong> Viernes, 25 de septiembre de 2026
      </p>
      <p class="card__line"><strong>Hora:</strong> 14:00</p>
      <p class="card__line">
        <strong>Lugar:</strong> Club de Campo de Alicante
      </p>

      <div class="actions">
        <a class="btn" :href="mapsUrl" target="_blank" rel="noreferrer"
          >Abrir en Google Maps</a
        >
        <button class="btn btn--ghost" type="button" @click="copyAddress">
          Copiar enlace
        </button>
      </div>

      <p v-if="copied" class="toast">Enlace copiado ✅</p>
    </article>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionWrapper from "../layout/SectionWrapper.vue";

const mapsUrl =
  "https://www.google.com/maps/place//data=!4m2!3m1!1s0xd6237286e4ca97b:0x479bc17eed470133?sa=X&ved=1t:8290&ictx=111";

const copied = ref(false);

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(mapsUrl);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1400);
  } catch {
    // noop
  }
};
</script>

<style scoped>
.card {
  max-width: 780px;
  padding: 18px;

  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(43, 42, 45, 0.12);
  border-radius: 18px;

  box-shadow:
    0 12px 28px rgba(43, 42, 45, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.75) inset;

  /* para que el contenido respire */
  display: grid;
  gap: 8px;
}

.card__title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 800;
  color: var(--ink-900);
}

.card__line {
  margin: 0;
  color: var(--ink-700);
  font-size: 14px;
  line-height: 1.55;
}

.card__line strong {
  color: var(--ink-900);
}

/* Botonera */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

/* Botón base claro */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  text-decoration: none;
  border: 1px solid rgba(43, 42, 45, 0.14);
  background: rgba(255, 255, 255, 0.7);
  color: var(--ink-900);

  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;

  transition:
    background 150ms ease,
    transform 150ms ease,
    border-color 150ms ease,
    box-shadow 150ms ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(43, 42, 45, 0.18);
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(43, 42, 45, 0.1);
}

/* Primary coral suave (para el link a maps) */
.btn:is(a) {
  background: rgba(247, 135, 98, 0.16);
  border-color: rgba(247, 135, 98, 0.28);
}

.btn:is(a):hover {
  background: rgba(247, 135, 98, 0.22);
  border-color: rgba(247, 135, 98, 0.34);
}

/* Ghost */
.btn--ghost {
  background: transparent;
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* Toast pill sakura */
.toast {
  margin: 10px 0 0;
  display: inline-block;
  width: fit-content;

  padding: 8px 10px;
  border-radius: 999px;

  background: rgba(249, 194, 187, 0.22);
  border: 1px solid rgba(249, 194, 187, 0.4);
  color: var(--ink-700);

  font-size: 12px;
  font-weight: 700;
}
</style>
