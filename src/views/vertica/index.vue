<template>
    <div>
        <router-view />
    </div>

</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'Vertica',
})
export default class extends Vue{
}
</script>