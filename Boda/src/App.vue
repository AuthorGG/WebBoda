<template>
  <IntroOverlay v-if="showIntro" @done="showIntro = false" />
  <div v-else class="app">
    <AppHeader
      :couple-name="coupleName"
      :date-text="dateText"
      :nav-items="navItems"
    />

    <main>
      <HeroSection
        :couple-name="coupleName"
        :date-text="dateText"
        :city="city"
        :deadline-date="deadlineDate"
      />

      <LocationSection
        :ceremony="ceremony"
        :banquet="banquet"
        :notes="locationNotes"
      />
      <WhatsappGroupSection />

      <GiftsSection
        :bizum-tuto="whatsappTuto"
        :bizum-dayana="whatsappDayana"
        :iban="iban"
      />
      <PlaylistSection />
    </main>

    <AppFooter
      :couple-name="coupleName"
      :date-text="dateText"
      :whatsapp-dayana="whatsappDayana"
      :whatsapp-tuto="whatsappTuto"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IntroOverlay from "./components/intro/IntroOverlay.vue";
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";
import PlaylistSection from "./components/Sections/PlaylistSection.vue";
import HeroSection from "./components/Sections/HeroSection.vue";

import LocationSection from "./components/Sections/LocationSection.vue";
import GiftsSection from "./components/Sections/GiftsSection.vue";
import WhatsappGroupSection from "./components/Sections/RsvpSection.vue";
const coupleName = "Tuto & Dayana";
const dateText = "Viernes, 25 de Septiembre de 2026";
const city = "Alicante";
const showIntro = ref(true);
const weddingDateISO = "2026-09-25T14:00:00+02:00"; // España en septiembre = CEST
const deadlineDate = new Date(weddingDateISO);

const navItems = [
  { id: "inicio", label: "Inicio" },
  { id: "lugar", label: "Lugar" },
  { id: "rsvp", label: "Asistencia" },
  { id: "regalos", label: "Regalos" },
  { id: "contacto", label: "Contacto" },
];

const whatsappTuto = "651032944";
const whatsappDayana = "625221491";

const ceremony = {
  time: "18:00",
  place: "Iglesia / Ayuntamiento (por definir)",
  address: "Calle Ejemplo 123, 03000 Alicante",
  mapsUrl: "https://maps.google.com",
};

const banquet = {
  time: "20:00",
  place: "Finca / Restaurante (por definir)",
  address: "Avenida Ejemplo 45, 03000 Alicante",
  mapsUrl: "https://maps.google.com",
};

const locationNotes =
  "Recomendación: llegar 15 minutos antes. Si vienes en coche, hay parking cerca (lo confirmamos con el lugar).";

const iban = "ES93 2100 7435 8402 0005 4525";
const ibanHint = "Concepto sugerido: Boda + tu nombre";
const giftListUrl = "https://example.com/lista";

const whatsappNumber = "34600111222";
const whatsappText = "¡Hola! Tengo una duda sobre la boda 😊";
const email = "tuboda@email.com";
</script>

<style>
:root {
  --sakura-300: 255 182 193;
  --sky-300: 135 206 235;
  --paper-50: 255 255 255;
  --ink-900: 20 20 20;

  --border: 1px solid rgba(255, 255, 255, 0.12);
  --radius-lg: 18px;
}
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}
body {
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    "Apple Color Emoji",
    "Segoe UI Emoji";
  background:
    radial-gradient(
      900px 600px at 20% 0%,
      color-mix(in srgb, var(--sakura-300) 18%, transparent),
      transparent 60%
    ),
    radial-gradient(
      900px 600px at 85% 10%,
      color-mix(in srgb, var(--sky-300) 18%, transparent),
      transparent 60%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--paper-50) 14%, var(--ink-900)),
      var(--ink-900)
    );
  color: color-mix(in srgb, white 92%, transparent);
}
.app {
  min-height: 100vh;
}
main {
  display: block;
}
</style>
