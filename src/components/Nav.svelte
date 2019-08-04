<script>
  import { session, TYPE_INACTIVE } from "./Session/store";
  import { teams } from "./Teams/store";

  export let segment;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <button
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </button>
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">
      {#if $session.activeType !== TYPE_INACTIVE}
        <a
          class={segment === 'session' ? 'is-active navbar-item' : 'navbar-item'}
          href="session">
          Session
        </a>
      {:else}
        <a
          class={segment === undefined ? 'is-active navbar-item' : 'navbar-item'}
          href=".">
          Mobbing
        </a>
        {#if $teams.length > 0}
          <a
            class={segment === 'teams' ? 'is-active navbar-item' : 'navbar-item'}
            href="teams">
            Teams
          </a>
        {/if}
      {/if}
    </div>
  </div>
</nav>
