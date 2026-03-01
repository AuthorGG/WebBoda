<template>
  <SectionWrapper
    id="playlist"
    eyebrow="Música"
    title="Playlist de la boda"
    subtitle="Queremos que la celebración suene a todos nosotros."
  >
    <article class="card">
      <h3 class="card__title">Añade tus canciones 🤍</h3>

      <p class="card__text">
        Queremos que todos agreguéis música para la celebración: temas que os
        pongan de buen humor, que os hagan cantar, bailar o que os recuerden a
        nosotros.
      </p>

      <p class="card__text">
        Entra a la playlist y añade las que te apetezcan. Así la fiesta la
        construimos entre todos 🎶
      </p>

      <div class="actions">
        <a
          class="btn btn--primary"
          :href="playlistUrl"
          target="_blank"
          rel="noreferrer"
        >
          Ir a la playlist en Spotify
        </a>
      </div>
      <iframe
        data-testid="embed-iframe"
        style="border-radius: 12px"
        src="https://open.spotify.com/embed/playlist/5pML87bPKq5z6IpTnLn9rV?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allowfullscreen=""
        allow="
          autoplay;
          clipboard-write;
          encrypted-media;
          fullscreen;
          picture-in-picture;
        "
        loading="lazy"
      ></iframe>
      <p class="hint">
        Consejo: añade 2–5 canciones para que haya variedad (y que no falte
        temazo).
      </p>
    </article>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SectionWrapper from "../layout/SectionWrapper.vue";

const playlistUrl =
  "https://open.spotify.com/playlist/5pML87bPKq5z6IpTnLn9rV?si=cadd99bd8b8d4f8d&pt=010125efb9c2605e4af7db719b165d2e";

const copied = ref(false);

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(playlistUrl);
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

  text-align: center;
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
  font-size: 14px;
  line-height: 1.65;
  max-width: 70ch;
  margin-left: auto;
  margin-right: auto;
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

  margin-left: auto;
  margin-right: auto;
}

.hint {
  margin: 4px 0 0;
  color: var(--ink-500);
  font-size: 13px;
  line-height: 1.5;
  max-width: 70ch;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 520px) {
  .btn {
    width: 100%;
  }
}
</style>
