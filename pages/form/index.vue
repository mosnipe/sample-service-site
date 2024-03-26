<template>
  <div>
    <h1>FORMページ</h1>

    <form v-if="!submitted" ref="form">
      <div v-if="error" class="error">
        <p v-for="(err, idx) in error" :key="idx">
          {{ err }}
        </p>
      </div>

      <div class="row--status">
        <h2>フォーム名</h2>
        <div>{{ name }}</div>
      </div>

      <div class="row--status">
        <h2>説明</h2>
        <div>
          <p v-for="(line, idx) in textLines2texts(info)" :key="idx">
            {{ line }}
          </p>
        </div>
      </div>

      <div class="row--status">
        <h2>サンクス文言</h2>
        <div>
          <p v-for="(line, idx) in textLines2texts(thanksText)" :key="idx">
            {{ line }}
          </p>
        </div>
      </div>

      <div class="row--status">
        <h2>フォーム項目</h2>
        <div class="row--internal">
          <div v-for="col in cols" :key="col.key">
            <p>[{{ col.title }}]</p>
            <pre>{{ col }}</pre>
          </div>
        </div>
      </div>

      <div v-for="col in cols" :key="col.objKey" class="row--form">
        <h2>[{{ col.title }}]</h2>
                <input
          v-if="col.title === 'file'"
         :name="col.objKey"
          type="file"
          @change="uploadFile"
        />
       <input v-else :name="col.objKey" type="text" />
      </div>

      <div class="row--bottom-next">
        <button @click="handleOnSubmit">submit</button>
      </div>
    </form>

    <form v-else>
      <div class="row--status">
        <h2>問い合わせID</h2>
        <div>
          {{ submittedId }}
        </div>
      </div>

      <div class="row--status">
        <h2>サンクス文言</h2>
        <div>
          <p v-for="(line, idx) in textLines2texts(thanksText)" :key="idx">
            {{ line }}
          </p>
        </div>
      </div>

      <div class="row--bottom-back">
        <button @click="handleOnBack">back</button>
      </div>
    </form>
  </div>
</template>

<script>
const FORM_ID = 5; // 作成したフォーム定義のID

export default {
  async asyncData({ $axios }) {
    const response = await $axios.$get(`https://mosnipe.g.kuroco-front.app/rcms-api/8/form/${FORM_ID}`);
    return {
      name: response.details.inquiry_name,
      info: response.details.inquiry_info,
      thanksText: response.details.thanks_text,
      cols: Object.entries(response.details.cols).map(([k, v]) => ({
        objKey: k,
        ...v,
      })),
    };
  },
  data: () => {
    return {
      submitted: false,
      submittedId: null,
      error: null,
      file_id: null,
    };
  },
  methods: {
    async uploadFile(e) {
      const fm = new FormData();
      fm.append('file', e.target.files[0]);

      const { file_id } = await this.$axios.$post(`/rcms-api/8/file`, fm, {
        headers: {
          'Content-Type': 'multipart/form-data', // required to post file as a binary
        },
      });
      this.file_id = file_id;
    },
    textLines2texts(textLines = '') {
      return textLines.split('\r\n');
    },
    async handleOnSubmit(e) {
      e.preventDefault();

      // collect input elements
      const formInputElements = Array.from(this.$refs.form.elements).filter(
        (elm) => elm.tagName.toLowerCase() === 'input'
      );

      // transform key:value inputs to an object
      const body = formInputElements
        .map((elm) => ({ [elm.name]: elm.value }))
        .filter((inputObj) => Object.values(inputObj).every((v) => v !== ''))
        .reduce((prev, cur) => ({ ...prev, ...cur }), {});

              // apply file_id instead of the actual file input value
      if (body.ext_03) {
        body.ext_03 = {
          file_id: this.file_id,
        };
      }


      try {
        // post data
        const { id } = await this.$axios.$post(
          `/rcms-api/8/form?id=${FORM_ID}`,
          body
        );
        this.error = null;
        this.submittedId = id;
        this.submitted = true;
      } catch (e) {
        this.error = [`${e}`, ...e.response.data.errors];
      }
    },
    handleOnBack(e) {
      e.preventDefault();
      this.submitted = false;
    },
  },
};
</script>

<style>
body,
h2 {
  margin: 0;
}

input {
  width: 100%;
  border: none;
}

.error {
  color: red;
}
.error > *:first-child {
  font-weight: bold;
}

.row--status {
  display: flex;
  border-top: 1px solid black;
}
.row--status > *:first-child {
  background-color: yellow;
  min-width: 15rem;
  max-width: 15rem;
  border-right: 1px solid black;
}

.row--form {
  display: flex;
  border-top: 1px solid black;
}
.row--form > *:first-child {
  background-color: aquamarine;
  min-width: 15rem;
  max-width: 15rem;
  border-right: 1px solid black;
}

.row--bottom-next {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
}
.row--bottom-back {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-start;
}

.row--internal {
  display: flex;
}

form > *:nth-last-child(2) {
  border-bottom: 1px solid black;
}
</style>
