<template>
<div>
    <h1>
        nps import here
    </h1>
    <el-button @click="handleTest">
        Click Here
    </el-button>



</div>


</template>

<script lang="ts">
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'NPSImport',
})
export default class extends Vue{

    private handleTest(){
        this.$router.push('/employee')
    }
}
</script>