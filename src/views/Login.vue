<template>
  <div class="container mt-5">
    <h1>Iniciar sesión</h1>
    <b-form @submit="onSubmit">
      <b-form-group id="input-group-1" label="Correo" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="example@mail.com"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          type="password"
          id="input-2"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" :disabled="loading" variant="primary"
        >Iniciar sesión</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions(["autenticarUsuario"]),
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      const success = await this.autenticarUsuario({
        email: this.form.email,
        password: this.form.password,
      });
      this.loading = false;
      if (success) {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style>
.form-group {
  margin-bottom: 1rem;
}
</style>