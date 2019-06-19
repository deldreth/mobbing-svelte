<script>
  import { session, TYPE_INACTIVE } from "./Session/store";

  export let segment;
</script>

<style>
  .navbar {
    border-bottom: 4px solid black;
  }
</style>

<nav class="navbar navbar-expand navbar-light bg-light sticky-top">
  <ul class="navbar-nav">
    {#if $session.activeType !== TYPE_INACTIVE}
      <li>
        <a
          class={segment === 'session' ? 'active nav-link' : 'nav-link'}
          href="session">
          Session
        </a>
      </li>
    {:else}
      <li class="nav-item">
        <a
          class={segment === undefined ? 'active nav-link' : 'nav-link'}
          href=".">
          Mobbing
        </a>
      </li>
      <li class="nav-item">
        <a
          class={segment === 'teams' ? 'active nav-link' : 'nav-link'}
          href="teams">
          Teams
        </a>
      </li>
    {/if}
  </ul>
</nav>
