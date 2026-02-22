<template>
  <SectionWrapper
    id="regalos"
    eyebrow="Regalos"
    title="Vuestro granito de arroz! (el que no podréis tirar!)"
    subtitle="Si deseáis hacernos un regalo, además de vuestra presencia, aquí os dejamos estas opciones."
  >
    <div class="grid">
      <GiftExperienceCard
        v-for="exp in giftsExperiences"
        :key="exp.id"
        :item="exp"
        @select="openModal"
      />
    </div>

    <p class="note">
      Al elegir una experiencia, te mostraremos el
      <strong>concepto</strong> recomendado para el Bizum y los números de
      <strong>Tuto</strong> y <strong>Dayana</strong>.
    </p>

    <GiftBizumModal
      v-if="selected"
      :experience="selected"
      :bizum-tuto="bizumTuto"
      :bizum-dayana="bizumDayana"
      :iban="iban"
      @close="closeModal"
    />
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionWrapper from "../layout/SectionWrapper.vue";

import GiftExperienceCard from "../gifts/GiftExperienceCard.vue";
import GiftBizumModal from "../gifts/GiftBizumModal.vue";

import {
  giftsExperiences,
  type GiftExperience,
} from "../../data/giftsExperiences";

defineProps<{
  bizumTuto: string;
  bizumDayana: string;
  iban: string;
}>();

const selected = ref<GiftExperience | null>(null);

const openModal = (exp: GiftExperience) => {
  selected.value = exp;
};

const closeModal = () => {
  selected.value = null;
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.note {
  margin: 16px 0 0;
  max-width: 90ch;
  color: var(--ink-700);
  font-size: 14px;
  line-height: 1.6;
}

.note strong {
  color: var(--ink-900);
  font-weight: 800;
}

@media (max-width: 980px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
