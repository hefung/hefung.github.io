// .vitepress/sponsors.data.ts
interface SponsorItem {
  name: string
  amount: number
  message: string
  date: string
}

export default {
  async load(): Promise<{ sponsors: SponsorItem[] }> {
    const url = 'https://down.mxw.xx.kg/https://raw.githubusercontent.com/hefung/hefung/refs/heads/main/sponsors-random.json'
    const res = await fetch(url)
    const sponsors = await res.json() as SponsorItem[]
    return { sponsors }
  }
}
