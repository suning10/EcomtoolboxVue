<template>
    <table id="table1" data-page-length='25' class = "display">
        <thead>
            <tr>
			<th>SLoc</th>
              <th>Absolute Gap Cost</th>
              <th>Net Gap Cost</th>
              <th>Absolute Gap</th>
              <th>Net Gap</th>
              <th>% SKUs with Error</th>
              <th># SKUs with Error</th>
              <th>NERP Overage</th>
              <th>Synapse Overage</th>
            </tr>
        </thead>
        <tbody>
				<tr>
					<td>1</td>
					<td>2></td>
					<td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
				</tr>
        </tbody>
    </table>
</template>
  
  <script lang="ts">
  import { Vue,Component } from 'vue-property-decorator';

  
      @Component({
          'name': 'scrResearch'
      })
  
  export default class extends Vue{

          mounted() {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js')
            document.head.appendChild(recaptchaScript)
          }

        }