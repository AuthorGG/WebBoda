<template>
  <div class="overlay" role="dialog" aria-modal="true" @click.self="close">
    <div class="modal">
      <div class="modal__header">
        <h3 class="modal__title">{{ experience.title }}</h3>
        <button class="x" type="button" @click="close" aria-label="Cerrar">
          ✕
        </button>
      </div>

      <p class="modal__desc">{{ experience.description }}</p>

      <!-- COSTE / APORTACIÓN LIBRE -->
      <div class="box">
        <template v-if="experience.kind === 'withCost'">
          <p class="k">Coste de la experiencia</p>
          <p class="v">{{ formatMoney(experience.totalCost) }}</p>
          <p class="hint">
            La aportación es <strong>voluntaria</strong>: puedes aportar lo que
            te apetezca 🤍
          </p>
        </template>

        <template v-else>
          <p class="k">Aportación libre</p>
          <p class="v">Importe a tu elección</p>
          <p class="hint">
            Puedes aportar lo que quieras, para lo que sea. De verdad, gracias
            🤍
          </p>
        </template>
      </div>

      <!-- CONCEPTO -->
      <div class="box">
        <p class="k">Concepto recomendado</p>
        <p class="v">{{ concept }}</p>
        <button class="btn" type="button" @click="copy(concept)">
          Copiar concepto
        </button>
      </div>

      <!-- BIZUM -->
      <div class="grid">
        <div class="box">
          <p class="k">Bizum a Tuto</p>
          <p class="v">{{ bizumTuto }}</p>
          <div class="row">
            <button class="btn" type="button" @click="copy(bizumTuto)">
              Copiar
            </button>
            <a class="btn btn--ghost" :href="telHref(bizumTuto)">Llamar</a>
          </div>
        </div>

        <div class="box">
          <p class="k">Bizum a Dayana</p>
          <p class="v">{{ bizumDayana }}</p>
          <div class="row">
            <button class="btn" type="button" @click="copy(bizumDayana)">
              Copiar
            </button>
            <a class="btn btn--ghost" :href="telHref(bizumDayana)">Llamar</a>
          </div>
        </div>
      </div>

      <!-- TRANSFERENCIA -->
      <div class="box">
        <p class="k">Transferencia (IBAN)</p>
        <p class="v iban">{{ iban }}</p>
        <div class="row">
          <button class="btn" type="button" @click="copy(iban)">
            Copiar IBAN
          </button>
        </div>
        <p class="hint">
          Si haces transferencia, usa el mismo concepto recomendado.
        </p>
      </div>

      <p v-if="copied" class="toast">Copiado ✅</p>

      <div class="actions">
        <button class="btn btn--primary" type="button" @click="close">
          Listo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import type { GiftExperience } from "../../data/giftsExperiences";

const props = defineProps<{
  experience: GiftExperience;
  bizumTuto: string;
  bizumDayana: string;
  iban: string;
}>();

const emit = defineEmits<{ (e: "close"): void }>();
const copied = ref(false);

const concept = computed(() => {
  // Para free: concepto genérico; para withCost: título de la experiencia
  return props.experience.kind === "free"
    ? "Boda - Aportación libre"
    : `Boda - ${props.experience.title}`;
});

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1400);
  } catch {
    // noop
  }
};

const close = () => emit("close");

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") close();
};
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));

const telHref = (n: string) => `tel:${n.replace(/\s/g, "")}`;

const formatMoney = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    n,
  );
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;

  /* overlay suave (no negro duro) */
  background: rgba(43, 42, 45, 0.32);
  backdrop-filter: blur(6px);

  display: grid;
  place-items: center;
  padding: 18px;
  z-index: 80;
}

.modal {
  width: min(760px, 100%);
  border-radius: 22px;

  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(43, 42, 45, 0.14);

  box-shadow: 0 22px 60px rgba(43, 42, 45, 0.22);

  padding: 18px;
  color: var(--ink-900);
  max-height: calc(100dvh - 36px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.modal__header {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: start;
}

.modal__eyebrow {
  grid-column: 1 / -1;
  margin: 0 0 4px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-500);
}

.modal__title {
  margin: 0;
  color: var(--ink-900);
}

.x {
  border: 1px solid rgba(43, 42, 45, 0.14);
  background: rgba(255, 255, 255, 0.7);
  color: var(--ink-900);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.x:hover {
  background: rgba(255, 255, 255, 0.92);
}

.modal__desc {
  margin: 12px 0 14px;
  color: var(--ink-700);
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
}

.box {
  border: 1px solid rgba(43, 42, 45, 0.1);
  background: rgba(255, 255, 255, 0.72);
  border-radius: 18px;
  padding: 14px;
  margin-top: 12px;
  box-shadow: 0 10px 22px rgba(43, 42, 45, 0.08);
}

.k {
  margin: 0 0 6px;
  font-size: 12px;
  color: var(--ink-500);
}

.v {
  margin: 0 0 10px;
  font-weight: 800;
  letter-spacing: 0.02em;
  word-break: break-word;
  color: var(--ink-900);
}

.iban {
  letter-spacing: 0.03em;
  overflow-wrap: anywhere;
}

.hint {
  margin: 0;
  color: var(--ink-700);
  line-height: 1.5;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Botones (coherentes con tu tema claro) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(43, 42, 45, 0.14);
  color: var(--ink-900);

  border-radius: 14px;
  padding: 10px 12px;
  font-weight: 700;
  cursor: pointer;

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

.btn--primary {
  background: rgba(247, 135, 98, 0.16);
  border-color: rgba(247, 135, 98, 0.28);
}

.btn--primary:hover {
  background: rgba(247, 135, 98, 0.22);
  border-color: rgba(247, 135, 98, 0.34);
}

.btn--ghost {
  background: transparent;
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.7);
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

.actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
