<template>
  <footer class="footer" id="contacto">
    <div class="container">
      <p class="title">¿Tienes alguna duda?</p>
      <p class="subtitle">
        Escríbenos por WhatsApp y te respondemos en cuanto podamos 🤍
      </p>

      <div class="grid">
        <a
          class="box"
          :href="waUrl(whatsappTuto, defaultText)"
          target="_blank"
          rel="noreferrer"
        >
          <p class="box__k">WhatsApp</p>
          <p class="box__name">Tuto</p>
          <p class="box__v">{{ formatPhone(whatsappTuto) }}</p>
          <span class="box__btn">Abrir WhatsApp</span>
        </a>

        <a
          class="box"
          :href="waUrl(whatsappDayana, defaultText)"
          target="_blank"
          rel="noreferrer"
        >
          <p class="box__k">WhatsApp</p>
          <p class="box__name">Dayana</p>
          <p class="box__v">{{ formatPhone(whatsappDayana) }}</p>
          <span class="box__btn">Abrir WhatsApp</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps<{
  whatsappTuto: string; // ej: "34600111222" (sin +, con prefijo país)
  whatsappDayana: string;
  whatsappText?: string;
}>();

const defaultText =
  props.whatsappText ?? "¡Hola! Tengo una duda sobre la boda!";

const waUrl = (phone: string, text: string) => {
  const clean = String(phone ?? "").replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
};

const formatPhone = (phone: string) => {
  const clean = String(phone ?? "").replace(/[^\d]/g, "");
  // formato rápido: +34 XXX XXX XXX (si empieza por 34 y tiene 11 dígitos)
  if (clean.startsWith("34") && clean.length === 11) {
    const local = clean.slice(2);
    return `+34 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6, 9)}`;
  }
  return `+${clean}`;
};
</script>

<style scoped>
.footer {
  padding: 42px 0 56px;
  border-top: 1px solid rgba(43, 42, 45, 0.1);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.35)
  );
}

.container {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
}

.title {
  margin: 0 0 6px;
  font-weight: 900;
  font-size: 18px;
  color: var(--ink-900);
}

.subtitle {
  margin: 0 0 16px;
  color: var(--ink-700);
  line-height: 1.6;
  max-width: 70ch;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.box {
  text-decoration: none;
  color: inherit;

  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(43, 42, 45, 0.12);
  border-radius: 18px;
  padding: 16px;

  box-shadow:
    0 12px 28px rgba(43, 42, 45, 0.1),
    0 1px 0 rgba(255, 255, 255, 0.75) inset;

  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    border-color 160ms ease,
    background 160ms ease;
}

.box:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(43, 42, 45, 0.18);
  box-shadow:
    0 18px 40px rgba(43, 42, 45, 0.14),
    0 1px 0 rgba(255, 255, 255, 0.78) inset;
}

/* barrita sakura */
.box::before {
  content: "";
  display: block;
  height: 7px;
  border-radius: 999px;
  margin-bottom: 12px;
  background: linear-gradient(
    90deg,
    rgba(249, 194, 187, 0.7),
    rgba(214, 226, 234, 0.7),
    rgba(247, 135, 98, 0.6)
  );
  opacity: 0.55;
}

.box__k {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-500);
}

.box__name {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 900;
  color: var(--ink-900);
}

.box__v {
  margin: 0 0 12px;
  color: var(--ink-700);
  font-weight: 700;
}

.box__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 10px 12px;
  border-radius: 14px;

  background: rgba(247, 135, 98, 0.16);
  border: 1px solid rgba(247, 135, 98, 0.28);
  color: var(--ink-900);

  font-weight: 800;
  font-size: 13px;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
