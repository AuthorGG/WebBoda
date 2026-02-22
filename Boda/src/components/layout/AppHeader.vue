<template>
  <header class="header">
    <div class="container">
      <button class="brand" @click="go('inicio')">
        <span class="brand__main">{{ coupleName }}</span>
        <span class="brand__sub">{{ dateText }}</span>
      </button>

      <nav class="nav nav--desktop" aria-label="Navegación principal">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav__link"
          @click="go(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <button class="burger" @click="toggleMenu" aria-label="Abrir menú">
        <span class="burger__line"></span>
        <span class="burger__line"></span>
        <span class="burger__line"></span>
      </button>
    </div>

    <div v-if="open" class="mobile">
      <nav class="nav nav--mobile" aria-label="Navegación móvil">
        <button
          v-for="item in navItems"
          :key="item.id"
          class="nav__link nav__link--mobile"
          @click="goFromMobile(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useScrollToSection } from "../../composables/useScrollToSection";

type NavItem = { id: string; label: string };

const props = defineProps<{
  coupleName: string;
  dateText: string;
  navItems: NavItem[];
}>();

const open = ref(false);
const { scrollToSection } = useScrollToSection();

const toggleMenu = () => (open.value = !open.value);

const go = (id: string) => {
  scrollToSection(id);
};

const goFromMobile = (id: string) => {
  open.value = false;
  // pequeño delay para que cierre el menú antes del scroll
  setTimeout(() => scrollToSection(id), 50);
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;

  /* papel translúcido */
  background: color-mix(in srgb, var(--paper-0) 82%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(43, 42, 45, 0.1);
}

.container {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* Brand */
.brand {
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  padding: 8px 0;
}
.brand__main {
  display: block;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--ink-900);
}
.brand__sub {
  display: block;
  font-size: 12px;
  color: var(--ink-500);
}

/* Nav */
.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Botones del menú en claro */
.nav__link {
  border: 1px solid rgba(43, 42, 45, 0.12);
  background: rgba(255, 255, 255, 0.65);
  color: var(--ink-900);
  padding: 10px 12px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 150ms ease,
    transform 150ms ease,
    border-color 150ms ease;
}

.nav__link:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(43, 42, 45, 0.18);
  transform: translateY(-1px);
}

/* Burger */
.burger {
  display: none;
  border: 1px solid rgba(43, 42, 45, 0.12);
  background: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 12px;
  cursor: pointer;
}
.burger:hover {
  background: rgba(255, 255, 255, 0.88);
}
.burger__line {
  display: block;
  width: 18px;
  height: 2px;

  /* tinta suave (no negro) */
  background: rgba(43, 42, 45, 0.85);
  margin: 4px 0;
  border-radius: 999px;
}

/* Mobile menu (CLARO, nada de negro) */
.mobile {
  border-top: 1px solid rgba(43, 42, 45, 0.1);
  background: color-mix(in srgb, var(--paper-50) 92%, white);
}

.nav--mobile {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 12px 0 16px;
  display: grid;
  gap: 10px;
}

.nav__link--mobile {
  width: 100%;
  text-align: left;
  border-radius: 14px;

  /* toque sakura sutil */
  background: color-mix(in srgb, var(--sakura-200) 18%, white);
  border: 1px solid
    color-mix(in srgb, var(--sakura-300) 30%, rgba(43, 42, 45, 0.1));
}

.nav__link--mobile:hover {
  background: color-mix(in srgb, var(--sakura-200) 26%, white);
}

@media (max-width: 860px) {
  .nav--desktop {
    display: none;
  }
  .burger {
    display: inline-block;
  }
}
</style>
