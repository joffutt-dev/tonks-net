<script lang="ts">
  import "./meltui-styles.css";
  import { createPopover, createSync } from "@melt-ui/svelte";
  import type { Component } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    label: string;
    popoverContent: Component;
  }

  let { label, popoverContent }: Props = $props();

  const {
    elements: { trigger, content, arrow, close },
    states,
  } = createPopover({
    forceVisible: true,
  });

  let open = $state(false);
  const ContentComponent = $derived(popoverContent);

  const sync = createSync(states);

  $effect(() => {
    sync.open(open, (value) => (open = value));
  });
</script>

<button
  type="button"
  class="ml-2"
  {...$trigger}
  use:trigger
  aria-label="More Animals"
>
  <span class="flex"
    >{label}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-4 ml-2 mt-auto mb-auto"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d={!open ? "m19.5 8.25-7.5 7.5-7.5-7.5" : "m4.5 15.75 7.5-7.5 7.5 7.5"}
      />
    </svg>
  </span>
</button>

{#if open}
  <div
    {...$content}
    use:content
    transition:fade={{ duration: 100 }}
    class="content"
  >
    <div {...$arrow} use:arrow></div>
    <ContentComponent />
  </div>
{/if}
