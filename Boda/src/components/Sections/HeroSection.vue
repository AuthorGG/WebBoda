<template>
  <section id="inicio" class="hero">
    <div class="container">
      <div class="hero__card">
        <p class="hero__eyebrow">Nos casamos</p>
        <h1 class="hero__title">{{ coupleName }}</h1>
        <p class="hero__date">{{ dateText }}</p>

        <p class="hero__text">
          Si habéis llegado hasta aquí es que sois muy importantes para
          nosotros.<br /><br />
          Este poema habla de algo sencillo y, a la vez, extraordinario: de cómo
          el amor se puede volver hogar, de cómo el tiempo compartido se vuelve
          infinito y de cómo, cuando estamos con quienes queremos, nada más hace
          falta.<br /><br />
          Hoy estamos aquí por eso. <br />
          Una compañía con la que reír, con la que vivir, con la que “gastar” la
          vida en lo verdaderamente importante. Y también estamos aquí porque
          esa riqueza no es solo nuestra sino que crece al compartirla con todos
          vosotros: familia, amigos, personas que forman parte de su
          historia.<br /><br />

          <strong
            >Gracias por acompañarnos, por ser parte de este día y por ayudar a
            que, hoy más que nunca, todo nos sobre.</strong
          >
        </p>
      </div>
      <div class="hero__info">
        <div class="pill">
          <span class="pill__k">Cuenta atrás</span>

          <div class="countdown-wrap">
            <vue3-flip-countdown
              :deadline-date="deadlineDate"
              :show-days="true"
              :show-hours="true"
              :show-minutes="false"
              :show-seconds="false"
              :show-labels="true"
              countdown-size="2.2rem"
              label-size="0.8rem"
              :labels="{ days: 'Días', hours: 'Hrs' }"
              main-color="rgba(247, 135, 98, 0.65)"
              second-flip-color="rgba(249, 194, 187, 0.75)"
              main-flip-background-color="rgba(255, 255, 255, 0.92)"
              second-flip-background-color="rgba(255, 255, 255, 0.78)"
              label-color="rgba(74, 72, 80, 0.85)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollToSection } from "../../composables/useScrollToSection";

const props = defineProps<{
  coupleName: string;
  dateText: string;
  city: string;
  deadlineDate: Date;
}>();

const { scrollToSection } = useScrollToSection();
const go = (id: string) => scrollToSection(id);
</script>

<style scoped>
.hero {
  padding: 20px 0;
  justify-items: center;
}
.container {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
}
.hero__card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 28px;
  background: rgba(255, 255, 255, 0.04);
}
.hero__eyebrow {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.75;
}
.hero__title {
  margin: 0 0 6px;
  font-size: 48px;
  line-height: 1.05;
}
.hero__date {
  margin: 0 0 18px;
  opacity: 0.85;
}
.hero__text {
  margin: 0 0 22px;
  max-width: 70ch;
  opacity: 0.9;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.btn {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: inherit;
  padding: 12px 14px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
}
.btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.btn--primary {
  background: rgba(255, 255, 255, 0.15);
}
.hero__info {
  margin-top: 18px;
  display: flex;
  justify-content: flex-start;
}

@media (max-width: 700px) {
  .hero__info {
    justify-content: center;
  }
}
.pill {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 12px;
  border-radius: 14px;
}

.pill__v {
  display: block;
  font-weight: 700;
}

.countdown-wrap {
  width: 100%;
  max-width: 460px; /* ajusta a tu gusto */
  margin: 0 auto;
}

/* La pill en claro (tu pill sigue con valores oscuros en ese Hero) */
.pill {
  border: 1px solid rgba(43, 42, 45, 0.12);
  background: rgba(255, 255, 255, 0.72);
  padding: 12px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(43, 42, 45, 0.1);
}

.pill__k {
  display: block;
  margin-bottom: 8px;
  font-size: 27px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-500);
}
@media (max-width: 520px) {
  .hero__title {
    font-size: 38px;
  }
}
</style>
