<template>
    <div>
        <router-view />
    </div>

</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'NPSSearch',
})
export default class extends Vue{

    private handleTest(){
        this.$router.push('/')
    }
}
</script>