<template>
  <div class="container mt-5">
    <h1>Home</h1>
    <b-button @click="onLogout" type="button" :disabled="loading" variant="dark"
      >Cerrar sesión</b-button
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
    async onLogout() {
      this.loading = true;
      const success = await this.cerrarSesion();
      this.loading = false;
      if (success) this.$router.push({ name: "Login" });
    },
  },
};
</script>
