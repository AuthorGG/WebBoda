<template>
  <button class="card" type="button" @click="$emit('select', item)">
    <div class="card__top">
      <h3 class="card__title">{{ item.title }}</h3>
      <p v-if="item.subtitle" class="card__subtitle">{{ item.subtitle }}</p>
    </div>

    <p class="card__desc">{{ item.description }}</p>

    <div class="meta">
      <!-- SI TIENE COSTE -->
      <template v-if="item.kind === 'withCost'">
        <p class="meta__cost">
          Coste: <strong>{{ formatMoney(item.totalCost) }}</strong>
        </p>

        <div class="progress">
          <div class="progress__row">
            <span class="progress__label">Completado</span>
            <span class="progress__pct">{{ safePct(item.progressPct) }}%</span>
          </div>

          <div
            class="progress__bar"
            role="progressbar"
            :aria-valuenow="safePct(item.progressPct)"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress__fill"
              :style="{ width: safePct(item.progressPct) + '%' }"
            ></div>
          </div>
        </div>
      </template>

      <!-- SI ES APORTACIÓN LIBRE -->
      <template v-else>
        <div class="free">
          <p class="free__title">Aportación libre</p>
          <p class="free__text">
            Puedes aportar lo que quieras, sin coste ni objetivo.
          </p>
        </div>
      </template>

      <div v-if="item.tags?.length" class="tags">
        <span v-for="t in item.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { GiftExperience } from "../../data/giftsExperiences";

defineProps<{ item: GiftExperience }>();
defineEmits<{ (e: "select", item: GiftExperience): void }>();

const formatMoney = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    n,
  );

const safePct = (pct: number) => {
  const n = Number(pct);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
};
</script>

<style scoped>
.card {
  text-align: left;
  width: 100%;
  cursor: pointer;

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

.card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(43, 42, 45, 0.18);

  box-shadow:
    0 18px 40px rgba(43, 42, 45, 0.14),
    0 1px 0 rgba(255, 255, 255, 0.78) inset;
}

.card__title {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 800;
  color: var(--ink-900);
}

.card__subtitle {
  margin: 0;
  font-size: 13px;
  color: var(--ink-500);
}

.card__desc {
  margin: 10px 0 14px;
  font-size: 14px;
  color: var(--ink-700);
  line-height: 1.6;
}

.meta {
  display: grid;
  gap: 12px;
}

.meta__cost {
  margin: 0;
  color: var(--ink-700);
  font-size: 13px;
}

.meta__cost strong {
  color: var(--ink-900);
}

/* Progress */
.progress__row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--ink-500);
  margin-bottom: 6px;
}

.progress__bar {
  height: 10px;
  border-radius: 999px;
  background: rgba(43, 42, 45, 0.08);
  overflow: hidden;
  border: 1px solid rgba(43, 42, 45, 0.1);
}

.progress__fill {
  height: 100%;
  border-radius: 999px;

  /* coral suave */
  background: rgba(247, 135, 98, 0.55);
}

/* Free */
.free {
  border: 1px dashed rgba(43, 42, 45, 0.2);
  border-radius: 16px;
  padding: 12px;

  background: rgba(249, 194, 187, 0.14);
}

.free__title {
  margin: 0 0 6px;
  font-weight: 800;
  color: var(--ink-900);
}

.free__text {
  margin: 0;
  color: var(--ink-700);
  font-size: 13px;
  line-height: 1.55;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;

  border: 1px solid rgba(43, 42, 45, 0.12);
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink-700);
}
</style>
