<script lang="ts">
  // import { state, props, derived, effect, cleanup } from 'svelte';

  interface CarouselProps {
    images: string[];
    startIndex?: number;
    height?: string;
    width?: string;
    showControls?: boolean;
    autoScroll?: boolean;
    scrollInterval?: number;
  }

  const {
    images = [],
    startIndex = 0,
    showControls = true,
    autoScroll = true,
    scrollInterval = 3000, // milliseconds between auto-scrolls
  }: CarouselProps = $props();

  const CAROUSEL_ID = "carousel-container";

  // Local state using Svelte 5 $state
  let currentIndex = $state(startIndex);
  let isPaused = $state(false);
  let intervalId: number | null = null;

  function scrollIntoView(imageIndex: number) {
    const el = document.getElementById(`image ${imageIndex}`);
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }

  // Navigation functions
  function nextImage(): void {
    if (images.length <= 1) return;
    currentIndex = (currentIndex + 1) % images.length;
    scrollIntoView(currentIndex);
  }

  function prevImage(): void {
    if (images.length <= 1) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    scrollIntoView(currentIndex);
  }

  // Toggle auto-scroll pause state
  function togglePause(): void {
    isPaused = !isPaused;

    if (isPaused) {
      clearAutoScrollInterval();
    } else {
      setupAutoScrollInterval();
    }
  }

  // Setup auto-scroll interval
  function setupAutoScrollInterval(): void {
    if (!autoScroll || images.length <= 1 || isPaused) return;

    clearAutoScrollInterval(); // Clear any existing interval
    intervalId = window.setInterval(nextImage, scrollInterval);
  }

  // Clear the interval
  function clearAutoScrollInterval(): void {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
  }

  const imageCount = $derived(images.length);
  const hasImages = $derived(imageCount > 0);
  const displayIndex = $derived(currentIndex + 1);

  // Effects
  $effect(() => {
    // Reset currentIndex when startIndex prop changes
    currentIndex = startIndex;
  });

  $effect(() => {
    // Setup auto-scroll when component mounts or when autoScroll/scrollInterval changes
    setupAutoScrollInterval();

    // Cleanup when component is destroyed
    return () => {
      clearAutoScrollInterval();
    };
  });
</script>

<div class="mt-1 relative carousel-container">
  <button
    aria-label="previous"
    class="top-0 left-0 absolute h-full w-1/5 opacity-0 hover:opacity-50 hover:bg-gray-700"
    onclick={prevImage}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="size-20 fill-white ml-auto mr-auto"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
      />
    </svg>
  </button>
  <button
    aria-label="next"
    class="top-0 right-0 absolute h-full w-1/5 opacity-0 hover:opacity-50 hover:bg-gray-700"
    onclick={nextImage}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="size-20 fill-white ml-auto mr-auto"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
  <button class="pause" onclick={togglePause}>
    {#if !isPaused}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="size-12 fill-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 5.25v13.5m-7.5-13.5v13.5"
        />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="size-12 fill-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
        />
      </svg>
    {/if}
  </button>
  <div class="carousel rounded-3xl">
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="carousel-item" id={CAROUSEL_ID}>
      {#if hasImages}
        {#each images as image, i}
          <img
            id={`image ${i}`}
            src={image}
            alt={`Image ${displayIndex} of ${imageCount}`}
            class="display-image"
          />
        {/each}
      {:else}
        <div class="no-images">No images available</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .display-image {
    max-width: 100%;
    max-height: calc(100vh - 100px);
    aspect-ratio: auto;
    /* object-fit: contain; */
    transition: opacity 0.3s ease;
  }

  .no-images {
    color: #666;
    font-style: italic;
  }
</style>
