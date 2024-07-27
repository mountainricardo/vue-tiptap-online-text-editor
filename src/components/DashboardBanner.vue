<template>
  <v-container class="dashboard-banner d-flex indigo lighten-5 blue-grey--text text--darken-4  align-baseline rounded-xl">
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <h1>{{ $t('banner.title') }}</h1>
        <p>{{ $t('banner.desc') }}</p>
        <v-btn
          rounded
          x-large
          elevation="0"
          color="primary"
          class="text-none"
        >
          {{ $t('banner.start') }}
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-img
          src="@/assets/img/banner-pic.png"
          content-class="banner-img"
          aspect-ratio="1.7"
          max-height="224px"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">

export default {
  name: 'DashboardBanner',
  props: [],
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
  .dashboard-banner {
    justify-content: space-between;
    flex-flow: row nowrap;
    // border-radius: 1.5rem;
    // min-height: 17em;
    max-height: 18em;
    padding: 2em 4em;
    color: ivory;
    margin-top: 2.5rem;
    font-size: 1.0625rem;
    h1 {
      font-family: proxima-nova;
      font-size: 2.5rem;
    }
  }
  // {
    
  //   position: relative;
  //   padding: 64px 64px 76px;
  //   border-radius: 24px;
  //   background: #eef0fd;
  //   overflow: hidden;
  //   /* margin-top: -10px;
  // }
</style>
