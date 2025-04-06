<script lang="ts">
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";
  import { BASE_URL } from "./constants";

  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";
  import SeeTonks from "./lib/SeeTonks.svelte";
  import AboutTonks from "./lib/AboutTonks.svelte";

  const routes: RouteConfig[] = [
    {
      path: `${BASE_URL}`,
      component: Home,
    },
    {
      path: `${BASE_URL}/see-tonks`,
      component: SeeTonks,
    },
    {
      path: `${BASE_URL}/about`,
      component: AboutTonks,
    },
  ];
</script>

<main>
  <div>
    <Header />
    <div class="flex text-center ml-auto mr-auto">
      <Router {routes} />
    </div>
  </div>
</main>
