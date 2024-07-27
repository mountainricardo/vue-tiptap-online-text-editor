<template>
  <section>
    <v-card
      cols="12"
      flat
      hover
      class="templates-list-item d-flex flex-no-wrap justify-space-between"
    >
      <v-card-title
        class="py-0 d-flex editor-link"
        @click="openTemplate()"
      >
        <v-img
          src="@/assets/img/document_template_icon.svg"
          width="40px"
          max-width="40px"
          class="mr-4"
        ></v-img>
        <div class="d-flex flex-column">
          <span class="body-1 font-weight-bold">{{ template.name }}</span>
          <span class="body-1 text--secondary">
            {{
              $t('template.created') + ': '
            }}
            {{
              template.created | moment("from", "now")
            }}
          </span>
          <!-- <span class="subtitle-1">{{ template.created | moment(process.env.VUE_APP_MOMENT_FORMAT) }}</span> -->
        </div>
          
        <v-card-subtitle>
        </v-card-subtitle>
      </v-card-title>
      <template-item-menu :template="template"></template-item-menu>
    </v-card>
  </section>
</template>

<script>
import { api } from "@/config"
import { mapActions } from 'vuex'
import TemplateItemMenu from '@/components/menus/template-item-menu.vue'

// import router from '../router/index.js'
export default  {
  name: 'TemplatesListItem',
  components: {
    TemplateItemMenu
  },
  props: {
    template: Object
  },
  data () {
    return {

    }
  },
  computed: {
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    },
  },
  created () {
    this.api = api
  },
  mounted () {

  },
  methods: {
    ...mapActions('editor', ['getTemplateContent', 'resetEditor']),
    openTemplate: async function () {
      // Reset editor state from former editions
      await this.resetEditor()
      // Get template content and set Editor state
      const {user, template} = this
      await this.getTemplateContent ({user, template})
			// Notify TemplatesList component within Templates view
			this.$emit('templateClick')
    }
  }
}


</script>

<style scoped lang="scss">
  .templates-list-item {
    .editor-link {
      cursor: pointer;
      text-decoration: none;
      &:hover {
        // background-color: #e8eaf6;
        text-decoration:none;
      }
    }
  }
</style>
