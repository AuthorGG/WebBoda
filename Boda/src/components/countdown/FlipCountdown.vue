<template>
  <div class="flip-wrap" role="timer" aria-live="polite">
    <div class="flip-grid">
      <!-- DAYS -->
      <div class="block">
        <div class="digits">
          <FlipDigit
            v-for="(d, i) in daysDigitsArr"
            :key="'d' + i"
            :value="d"
          />
        </div>
        <div class="label">Días</div>
      </div>

      <!-- HOURS -->
      <div class="block">
        <div class="digits">
          <FlipDigit
            v-for="(d, i) in hoursDigitsArr"
            :key="'h' + i"
            :value="d"
          />
        </div>
        <div class="label">Hrs</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  defineComponent,
} from "vue";

const props = defineProps<{
  deadlineISO: string; // "2026-09-25T14:00:00"
  daysDigits?: number; // default 3 (ej: 215)
}>();

const DAYS_DIGITS = computed(() => props.daysDigits ?? 3);

const now = ref(Date.now());
let t: number | undefined;

onMounted(() => {
  t = window.setInterval(() => (now.value = Date.now()), 1000);
});

onBeforeUnmount(() => {
  if (t) window.clearInterval(t);
});

const remaining = computed(() => {
  const target = new Date(props.deadlineISO).getTime();
  if (Number.isNaN(target)) return { days: 0, hours: 0, done: true };

  const diff = target - now.value;
  if (diff <= 0) return { days: 0, hours: 0, done: true };

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);

  return { days, hours, done: false };
});

const daysDigitsArr = computed(() => {
  const s = String(remaining.value.days).padStart(DAYS_DIGITS.value, "0");
  return s.split("").map((x) => Number(x));
});

const hoursDigitsArr = computed(() => {
  const s = String(remaining.value.hours).padStart(2, "0");
  return s.split("").map((x) => Number(x));
});

/** Un dígito con flip */
const FlipDigit = defineComponent({
  name: "FlipDigit",
  props: { value: { type: Number, required: true } },
  setup(p) {
    const current = computed(() => String(p.value));
    const prev = ref(current.value);
    const flipping = ref(false);

    watch(
      () => current.value,
      (next) => {
        if (next === prev.value) return;
        flipping.value = true;
        window.setTimeout(() => {
          prev.value = next;
          flipping.value = false;
        }, 480);
      },
    );

    return { current, prev, flipping };
  },
  template: `
    <div class="digit" :class="{ 'is-flip': flipping }">
      <div class="card">
        <div class="half top">
          <span class="num">{{ prev }}</span>
        </div>
        <div class="half bottom">
          <span class="num">{{ current }}</span>
        </div>
        <div class="divider"></div>
      </div>
    </div>
  `,
});
</script>

<style scoped>
/* contenedor pequeño y sin ocupar toda la pantalla */
.flip-wrap {
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
}

/* 2 bloques: Días + Horas */
.flip-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-items: start;
}

/* Bloque */
.block {
  display: grid;
  gap: 8px;
  justify-items: center;
}

/* grupo de dígitos */
.digits {
  display: flex;
  gap: 8px;
}

/* label debajo */
.label {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-500);
}

/* DIGIT */
.digit {
  width: 56px;
  height: 64px;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 14px;

  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(43, 42, 45, 0.14);
  box-shadow: 0 12px 24px rgba(43, 42, 45, 0.1);
  overflow: hidden;
}

/* halves: recortan el contenido (NO centrar) */
.half {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  overflow: hidden;
}

.top {
  top: 0;
}
.bottom {
  bottom: 0;
}

/* Número anclado al centro del reloj (línea de bisagra) */
.num {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  font-weight: 900;
  font-size: 28px;
  color: var(--ink-900);
  line-height: 1;
}

/* en la mitad superior, el centro del número cae justo en el borde inferior */
.top .num {
  top: 100%;
}

/* en la mitad inferior, el centro del número cae justo en el borde superior */
.bottom .num {
  top: 0%;
}

/* línea del medio (coral suave) */
.divider {
  position: absolute;
  left: 8px;
  right: 8px;
  top: 50%;
  height: 1px;
  transform: translateY(-50%);
  background: rgba(247, 135, 98, 0.22);
}

/* flip anim */
.is-flip .top {
  animation: flipTop 480ms ease forwards;
  transform-origin: bottom;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.is-flip .bottom {
  animation: flipBottom 480ms ease forwards;
  transform-origin: top;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

@keyframes flipTop {
  from {
    transform: perspective(600px) rotateX(0deg);
  }
  to {
    transform: perspective(600px) rotateX(-75deg);
  }
}
@keyframes flipBottom {
  from {
    transform: perspective(600px) rotateX(75deg);
  }
  to {
    transform: perspective(600px) rotateX(0deg);
  }
}

/* responsive */
@media (max-width: 520px) {
  .flip-wrap {
    max-width: 320px;
  }
  .digit {
    width: 52px;
    height: 62px;
  }
  .num {
    font-size: 26px;
  }
}
</style>
