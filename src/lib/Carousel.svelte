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
  const pauseButtonText = $derived(isPaused ? "Resume" : "Pause");

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

<div class="mt-1">
  <div class="carousel cursor-pointer rounded-3xl">
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
  {#if showControls && imageCount > 1}
    <div class="controls">
      <button onclick={prevImage}> Previous </button>

      {#if autoScroll}
        <button onclick={togglePause}>
          {pauseButtonText}
        </button>
      {/if}

      <span>{displayIndex} / {imageCount}</span>

      <button onclick={nextImage}> Next </button>
    </div>
  {/if}
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

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
  }
</style>
