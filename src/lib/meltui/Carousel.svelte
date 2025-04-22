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
  // Define component props using $props()
  const {
    images = [],
    startIndex = 0,
    height = "400px",
    width = "100%",
    showControls = true,
    autoScroll = true,
    scrollInterval = 3000, // milliseconds between auto-scrolls
  }: CarouselProps = $props();

  // Local state using Svelte 5 $state
  let currentIndex = $state(startIndex);
  let isPaused = $state(false);
  let intervalId: number | null = null;

  // Navigation functions
  function nextImage(): void {
    if (images.length <= 1) return;
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevImage(): void {
    if (images.length <= 1) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
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

  // Derived values
  const currentImage = $derived(images[currentIndex] || "");
  const activeSecondImage = $derived(
    images[(currentIndex + 1) % images.length] || ""
  );
  const activeThirdImage = $derived(
    images[(currentIndex + 2) % images.length] || ""
  );
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

<div class="image-toggle-container">
  <div class="image-container">
    {#if hasImages}
      <img
        src={currentImage}
        alt={`Image ${displayIndex} of ${imageCount}`}
        class="display-image"
      />
      <img
        src={activeSecondImage}
        alt={`Image ${displayIndex + 1} of ${imageCount}`}
        class="display-image"
      />
      <img
        src={activeThirdImage}
        alt={`Image ${displayIndex + 1} of ${imageCount}`}
        class="display-image"
      />
    {:else}
      <div class="no-images">No images available</div>
    {/if}
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
  .image-toggle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100vw;
    height: calc(100vh - 100px);
  }

  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* width: 100vw; */
    overflow: hidden;
    position: relative;
    border-radius: 4px;
  }

  .display-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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
