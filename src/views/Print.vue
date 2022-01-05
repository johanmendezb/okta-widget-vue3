<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const pdfUrl = ref('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
const pdfCORSUrl = ref('https://test.cors.workers.dev/?https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');

const downloadItem = async () => {
  const response = await axios.get(pdfCORSUrl.value, { responseType: 'blob' });
  console.log('response; ', response);

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'terms and conditions';
  link.click();
  URL.revokeObjectURL(link.href);
};
</script>

<template>
  <div class="print">
    <h1>Print</h1>
    <a :href="pdfUrl" target="_blank" download="terms and conditions">Native html print/download</a>
    <br />
    <a href="#" @click.prevent="downloadItem">Programatically download</a>
  </div>
</template>
