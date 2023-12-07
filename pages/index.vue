<template>
  <main>
    <header
      class="header"
      :style="{ backgroundImage: `url(${response.details.ext_1.url})` }"
    >
      <div class="header__text">
        <h1>{{ response.details.ext_2 }}</h1>
        <p>{{ response.details.ext_3 }}</p>
      </div>
    </header>

    <section>
      <h2>WORKS</h2>
      <ul>
        <li
          v-for="n in response.details.ext_4"
          :key="n.slag"
          class="works__item"
        >
          <img :src="n.ext_4.url" />
          <div class="works__item__text">
            <h3>{{ n.ext_5 }}</h3>
            <p>{{ n.ext_6 }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="about">
      <h2>ABOUT</h2>
      <p v-html="response.details.ext_7"></p>
    </section>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return { response: await $axios.$get('/rcms-api/3/service/3') };
  },
};
</script>


<style>
body {
  margin: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

section {
  max-width: 1200px;
  margin: 3em auto;
  padding: 0 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  color: #2c3e50;
}

h1 {
  margin: 0.5em 0;
  font-size: 2em;
}

h2 {
  margin: 2em auto;
  font-size: 1.8em;
  text-align: center;
}

h3 {
  margin: 1em auto;
  font-size: 1.4em;
}

p {
  margin: 1em 0;
  font-size: 1em;
}

.header {
  position: relative;
  width: 100%;
  height: 300px;
  background-position: center center;
  background-size: cover;
}

.header__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 8px;
}

.works__item {
  margin-top: 2em;
  display: flex;
  align-items: center;
}

.works__item img {
  margin-right: 2em;
}

.about {
  text-align: center;
}

@media screen and (max-width: 767px) {
  .header {
    height: 200px;
  }

  .works__item {
    flex-direction: column;
    align-items: start;
  }

  .works__item img {
    margin: 0 0 1em 0;
  }
}
</style>

