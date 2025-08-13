<template>
  <header>
    <button class="hamburger" @click="toggleMenu" aria-label="Menu" :class="{ 'is-active': menuOpen }">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
    <nav class="nav-links" :class="{ 'is-active': menuOpen }">
      <router-link to="/" @click="closeMenu">Home</router-link>
      <router-link to="/about" @click="closeMenu">About</router-link>
      <router-link to="/making-string" @click="closeMenu">生産サイクル計算式１</router-link>
      <router-link to="/making-string-2" @click="closeMenu">生産サイクル計算式２</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e7e7e7;
  position: relative; /* For positioning nav menu */
}

.hamburger {
  display: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  z-index: 100; /* Ensure it's above other content */
}

.hamburger .bar {
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: #333;
  transition: all 0.3s ease-in-out;
}

/* Animation for hamburger to 'X' */
.hamburger.is-active .bar:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.is-active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active .bar:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.nav-links {
  display: flex;
  align-items: center; /* Vertically center the links */
}

.nav-links a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 1rem 15px; /* Adjust padding to ensure consistent height */
  display: flex;
  align-items: center;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
}

.nav-links {
  display: flex;
}

.nav-links a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 0 15px;
}

.nav-links a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 768px) {
  header {
    justify-content: flex-end; /* Push hamburger to the right */
  }

  .nav-links {
    position: absolute;
    top: 100%; /* Position below the header */
    left: 0;
    width: 100%;
    background-color: #f8f9fa;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid #e7e7e7;
    
    /* For animation */
    max-height: 0;
    overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
    transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
  }

  .nav-links.is-active {
    max-height: 300px; /* Set a height to show the menu */
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .nav-links a {
    padding: 1rem 0;
    width: 100%;
    text-align: center;
    justify-content: center; /* Add this to center text within the flex container */
  }

  .hamburger {
    display: block;
  }
}
</style>
