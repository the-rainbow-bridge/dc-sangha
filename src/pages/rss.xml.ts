import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

type Context = {
  site: string
}

export async function GET(context: Context) {
	const resources = await getCollection("resources")

  const items = [...resources]

  items.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.pubDate,
      link: `/resources/${item.slug}/`
    })),
  })
}
