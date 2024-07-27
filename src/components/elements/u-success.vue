<template lang="html">
  <section class="u-success">
    <v-alert
      rounded="pill"
      color="grey"
      width="40%"
      dismissible
      close-icon="icon-delete"
      class="editor-alert"
      elevation="3"
      outlined
      :value="value"
    >
      <template v-slot:prepend>
        <v-icon
          color="green"
          class="mr-3"
          v-text="'icon-ok-2'"
        ></v-icon>
      </template>
      {{ text }}
    </v-alert>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'USuccess',
    props: ['value', 'text'],
    data () {
      return {

      }
    },
    computed: {

    },
    mounted () {

    },
    methods: {
  }
}


</script>

<style scoped lang="scss">
  .u-success {

  }
.editor-alert {
  position: absolute;
  bottom: 56px;
  left: 30%;
}
</style>
