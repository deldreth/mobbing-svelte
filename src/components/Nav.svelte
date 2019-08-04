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
      <a
        class={segment === undefined ? 'is-active navbar-item' : 'navbar-item'}
        href=".">
        Mobbing
      </a>

      <a
        class={segment === 'teams' ? 'is-active navbar-item' : 'navbar-item'}
        href="teams">
        Teams
      </a>

      <a
        class={segment === 'session' ? 'is-active navbar-item' : 'navbar-item'}
        href="session">
        Session
      </a>
    </div>
  </div>
</nav>
