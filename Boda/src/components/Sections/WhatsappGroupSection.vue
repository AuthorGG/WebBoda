<template>
  <SectionWrapper
    id="grupo-whatsapp"
    eyebrow="Importante"
    title="Únete al grupo de WhatsApp"
    subtitle="Ahí iremos compartiendo toda la información clave para que no se te escape nada."
  >
    <article class="card">
      <h3 class="card__title">Necesitamos que estés dentro 🤍</h3>

      <p class="card__text">
        Utilizaremos el grupo de WhatsApp para ir dejando
        <strong>los detalles más importantes</strong> de la boda: horarios
        actualizados,la elección del menú para la comida de ese día!,
        recordatorios, ubicación, recomendaciones y cualquier aviso de última
        hora.
      </p>

      <p class="card__text">
        Por eso, es <strong>imprescindible</strong> que te unas al grupo. Así te
        aseguras de enterarte de todo sin depender de terceros.
      </p>

      <div class="actions">
        <a
          class="btn btn--primary"
          :href="groupUrl"
          target="_blank"
          rel="noreferrer"
        >
          Unirme al grupo de WhatsApp
        </a>
      </div>

      <p v-if="copied" class="toast">Enlace copiado ✅</p>

      <p class="hint">
        Consejo: guarda el grupo en favoritos para tenerlo a mano.
      </p>
    </article>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionWrapper from "../layout/SectionWrapper.vue";

const groupUrl = "https://chat.whatsapp.com/LfsTxKws2LDBErkxVpnPDt?mode=gi_t";

const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(groupUrl);
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
  font-size: 18px;
  line-height: 1.65;
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
}

.hint {
  margin: 4px 0 0;
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.5;
}

.card__text,
.hint {
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
