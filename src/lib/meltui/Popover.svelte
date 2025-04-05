<script lang="ts">
  import "./meltui-styles.css";
  import { createPopover, createSync, melt } from "@melt-ui/svelte";
  import { fade } from "svelte/transition";

  export let open = false;

  const {
    elements: { trigger, content, arrow, close },
    states,
  } = createPopover({
    forceVisible: true,
  });

  const sync = createSync(states);
  $: sync.open(open, (v) => (open = v));
</script>

<button
  type="button"
  class="trigger"
  use:melt={$trigger}
  aria-label="Update dimensions"
>
  <!-- <Settings2 class="size-4" /> -->
  <span class="sr-only">Open Popover</span>
</button>

{#if open}
  <div use:melt={$content} transition:fade={{ duration: 100 }} class=" content">
    <div use:melt={$arrow}></div>
    <div class="flex flex-col gap-2.5">
      <p class="mb-2 font-medium text-neutral-900">Dimensions</p>
      <fieldset class="flex items-center gap-5">
        <label class="w-[75px] text-sm text-neutral-700" for="width"
          >Width</label
        >
        <input type="number" id="width" class="input" placeholder="Width" />
      </fieldset>
      <fieldset class="flex items-center gap-5">
        >
        <label class="w-[75px] text-sm text-neutral-700" for="height"
          >Height</label
        >
        <input type="number" id="height" class="input" placeholder="Height" />
      </fieldset>
      <fieldset class="flex items-center gap-5">
        >
        <label class="w-[75px] text-sm text-neutral-700" for="depth"
          >Depth</label
        >
        <input type="number" id="depth" class="input" placeholder="Depth" />
      </fieldset>
      <fieldset class="flex items-center gap-5">
        >
        <label class="w-[75px] text-sm text-neutral-700" for="weight"
          >Weight</label
        >
        <input type="number" id="weight" class="input" placeholder="Weight" />
      </fieldset>
    </div>
    <button class="close" use:melt={$close}>
      <!-- <X class="size-4" /> -->
    </button>
  </div>
{/if}
