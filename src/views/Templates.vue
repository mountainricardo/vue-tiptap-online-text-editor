<template>
  <v-container
    tag="div"
    class="px-0"
    flex
    fluid
  >
    <templates-list
      :title="$t('template.templates')"
      :templates="templates"
      @templateClick="saveTemplateAsFile"
    ></templates-list>
    <dialog-document-from-template
      :dialog="this.$store.state.dialogs.documentFromTemplateDialog"
      @alert="showSuccessAlert"
    ></dialog-document-from-template>
    <u-success
      :value="alertValue"
      :text="alertText"
    ></u-success>
  </v-container>
</template>

<script lang="js">
import TemplatesList from '@/components/templates-list.vue'
import DialogDocumentFromTemplate from '@/components/dialogs/dialog-document-from-template.vue'
import USuccess from '@/components/elements/u-success.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Templates',
  components: {
    TemplatesList,
		DialogDocumentFromTemplate,
		USuccess
  },
  props: [],
  data () {
    return {
      alertText: '',
      alertValue: false
    }
  },
  computed: {
    user: {
      get: function () {
        return this.$store.state.account.user
      }
    },
    templates: {
      get: function () {
        return this.$store.state.templates.templates
      }
    }

  },
  mounted () {
  },
  methods: {
		...mapActions('editor', ['updateDocumentContent', 'getTemplateContent']),
		saveTemplateAsFile() {
			// Open dialog to create new document after choosing a directory to create it
			// when notified from TemplatesList
			this.$store.commit("documentFromTemplateDialog", true)
		},
    showSuccessAlert (event) {
      this.alertText = event
      this.alertValue = true
      setTimeout(() => {
        this.alertText = ''
        this.alertValue = false
      }, process.env.VUE_APP_SUCCESS_ALERT_TIMEOUT)
    }
  },
}

</script>

<style scoped lang="scss">
.templates {
}
</style>
