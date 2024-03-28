import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  types: string[]
  data: CollectionEntry<"resources">[]
};

export default function Blog({ data, tags, types }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [resources, setResources] = createSignal<
    CollectionEntry<"resources">[]
  >([])

  createEffect(() => {
    setResources(
      data.filter((entry) =>
        Array.from(filter()).every((value) => {
          const bool =
            entry.data.tags.some(
              (tag: string) => tag.toLowerCase() === String(value).toLowerCase()
            ) || entry.data.type === value
          console.log(bool)
          return bool
        })
      )
    )
  })

  function toggle(tagOrType: string) {
    setFilter((prev) => {
      const set = new Set(
        prev.has(tagOrType)
          ? [...prev].filter((t) => t !== tagOrType)
          : [...prev, tagOrType]
      )
      console.log(set)
      return set
    })
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">
            Filter by type
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={types}>
              {(type) => (
                <li>
                  <button
                    onClick={() => toggle(type)}
                    class={cn(
                      "w-full px-2 py-1 rounded",
                      "whitespace-nowrap overflow-hidden overflow-ellipsis",
                      "flex gap-2 items-center",
                      "bg-black/5 dark:bg-white/10",
                      "hover:bg-black/10 hover:dark:bg-white/15",
                      "transition-colors duration-300 ease-in-out",
                      filter().has(type) && "text-black dark:text-white"
                    )}
                  >
                    <svg
                      class={cn(
                        "size-5 fill-black/50 dark:fill-white/50",
                        "transition-colors duration-300 ease-in-out",
                        filter().has(type) && "fill-black dark:fill-white"
                      )}
                    >
                      <use
                        href={`/ui.svg#square`}
                        class={cn(!filter().has(type) ? "block" : "hidden")}
                      />
                      <use
                        href={`/ui.svg#square-check`}
                        class={cn(filter().has(type) ? "block" : "hidden")}
                      />
                    </svg>
                    {type}
                  </button>
                </li>
              )}
            </For>
          </ul>

          <div class="text-sm font-semibold uppercase my-2 text-black dark:text-white">
            Filter by tag
          </div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button
                    onClick={() => toggle(tag)}
                    class={cn(
                      "w-full px-2 py-1 rounded",
                      "whitespace-nowrap overflow-hidden overflow-ellipsis",
                      "flex gap-2 items-center",
                      "bg-black/5 dark:bg-white/10",
                      "hover:bg-black/10 hover:dark:bg-white/15",
                      "transition-colors duration-300 ease-in-out",
                      filter().has(tag) && "text-black dark:text-white"
                    )}
                  >
                    <svg
                      class={cn(
                        "size-5 fill-black/50 dark:fill-white/50",
                        "transition-colors duration-300 ease-in-out",
                        filter().has(tag) && "fill-black dark:fill-white"
                      )}
                    >
                      <use
                        href={`/ui.svg#square`}
                        class={cn(!filter().has(tag) ? "block" : "hidden")}
                      />
                      <use
                        href={`/ui.svg#square-check`}
                        class={cn(filter().has(tag) ? "block" : "hidden")}
                      />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>

      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {resources().length} OF {data.length} RESOURCES
          </div>
          <ul class="flex flex-col gap-3">
            {resources().map((record) => (
              <li>
                <ArrowCard entry={record} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
