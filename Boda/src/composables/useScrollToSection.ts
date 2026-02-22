
export function useScrollToSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return { scrollToSection }
}