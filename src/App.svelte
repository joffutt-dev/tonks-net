<script lang="ts">
  import Header from "./lib/Header.svelte";
</script>

<main>
  <div>
    <Header />
    <div class="flex text-center ml-auto mr-auto">
      <!-- className="bg-white dark:bg-slate-800 m-2 p-4 rounded-2xl shadow-xl text-center" -->
      <div class="m-auto">
        <h1>
          <!-- className="text-slate-900 dark:text-white"> -->
          Welcome to Tonks Net
        </h1>
        <p class="mt-2">
          <!-- className="text-slate-500 dark:text-slate-400 mt-2 text-sm mb-2" -->
          A website engineered to show off a pretty cute cat
        </p>
      </div>
      <!-- <img src={sullytoy} alt="sully coot" /> -->
    </div>
  </div>
</main>

<!-- <style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->
