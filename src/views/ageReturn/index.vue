<template>
    <div>
        <router-view />
    </div>

</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'

@Component({
  name: 'ageReturn'
})
export default class extends Vue{

    private handleTest(){
        this.$router.push('/')
    }
}
</script>