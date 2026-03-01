<template>
  <div class="intro" :class="{ 'is-leaving': leaving }" aria-hidden="true">
    <div class="petals">
      <span
        v-for="p in petals"
        :key="p.id"
        class="petal"
        :style="{
          left: p.left + '%',
          animationDelay: p.delay + 's',
          animationDuration: p.duration + 's',
          transform: `rotate(${p.rotate}deg)`,
          opacity: p.opacity,
          filter: `blur(${p.blur}px)`,
        }"
      />
    </div>

    <div class="content" role="dialog" aria-modal="true">
      <div class="avatar">
        <img :src="introAvatar" alt="Tuto y Dayana" />
      </div>

      <p class="kicker">Algo sobre la riqueza.</p>

      <p class="quote">
        “Estando juntos despilfarramos los besos y la ternura;<br />
        nos gastamos las risas y las horas.<br />
        El tiempo y el lugar no nos importan.<br /><br />
        Estando juntos somos ricos:<br />
        Todo nos sobra.”
      </p>

      <div class="actions">
        <button class="btn btn--primary" type="button" @click="enter">
          Bienvenidos a nuestro día
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import introAvatar from "../../assets/intro-avatar.png";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  opacity: number;
  blur: number;
};

const emit = defineEmits<{ (e: "done"): void }>();

const petals = ref<Petal[]>([]);
const leaving = ref(false);

const FADE_OUT = 800;

onMounted(() => {
  petals.value = Array.from({ length: 26 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: +(Math.random() * 1.2).toFixed(2),
    duration: +(5.2 + Math.random() * 3.0).toFixed(2),
    rotate: Math.floor(Math.random() * 360),
    opacity: +(0.55 + Math.random() * 0.35).toFixed(2),
    blur: +(Math.random() * 0.6).toFixed(2),
  }));
});

const enter = () => {
  leaving.value = true;
  window.setTimeout(() => emit("done"), FADE_OUT);
};
</script>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 999;

  background:
    radial-gradient(
      900px 600px at 15% 0%,
      rgba(249, 194, 187, 0.55),
      transparent 55%
    ),
    radial-gradient(
      900px 600px at 85% 10%,
      rgba(214, 226, 234, 0.6),
      transparent 55%
    ),
    linear-gradient(180deg, var(--paper-0), var(--paper-50));

  display: grid;
  place-items: center;
  padding: 18px;

  opacity: 1;
  transition: opacity 800ms ease;
}

.intro.is-leaving {
  opacity: 0;
  pointer-events: none;
}

/* Pétalos */
.petals {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.petal {
  position: absolute;
  top: -12%;
  width: 14px;
  height: 10px;
  border-radius: 12px 12px 12px 0;

  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.95),
    rgba(249, 194, 187, 0.85)
  );
  border: 1px solid rgba(249, 194, 187, 0.35);

  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  100% {
    transform: translateY(120vh) translateX(12vw) rotate(260deg);
  }
}

/* Card de contenido */
.content {
  position: relative;
  width: min(720px, calc(100% - 24px));
  text-align: center;

  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(43, 42, 45, 0.12);
  border-radius: 22px;
  box-shadow: 0 18px 44px rgba(43, 42, 45, 0.14);

  padding: 22px 18px;

  animation: textIn 600ms ease both;
}

@keyframes textIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Avatar circular y responsive */
.avatar {
  width: clamp(84px, 18vw, 120px);
  aspect-ratio: 1 / 1;
  margin: 0 auto 14px;

  border-radius: 999px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(43, 42, 45, 0.12);
  box-shadow: 0 16px 34px rgba(43, 42, 45, 0.14);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.kicker {
  margin: 0 0 10px;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-500);
}

.quote {
  margin: 0;
  color: var(--ink-900);
  font-weight: 700;
  line-height: 1.7;
  font-size: 16px;
}

.author {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--ink-500);
}

.actions {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

/* Botón */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;
  padding: 12px 14px;

  font-weight: 900;
  font-size: 13px;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(43, 42, 45, 0.14);
  color: var(--ink-900);

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
  background: rgba(247, 135, 98, 0.18);
  border-color: rgba(247, 135, 98, 0.28);
}

.btn--primary:hover {
  background: rgba(247, 135, 98, 0.24);
  border-color: rgba(247, 135, 98, 0.34);
}

@media (max-width: 520px) {
  .content {
    padding: 18px 14px;
    border-radius: 18px;
  }
  .quote {
    font-size: 14px;
    line-height: 1.65;
  }
  .btn {
    width: 100%;
  }
}
</style>
