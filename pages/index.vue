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
    margin: 6;
    font-size: 1em;
    line-height: 1.5;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  img {
    max-width: 100%;
  }
  section {
    max-width: 1200px;
    margin: 3em auto;
    padding: 0 20px;
  }
  h1 {
    margin: 0.5em 0;
    font-size: 1.8em;
  }
  h2 {
    margin: 2em auto;
    font-size: 1.5em;
    text-align: center;
  }
  h3 {
    margin: 1em auto;
    font-size: 1.2em;
  }
  p {
    margin: 1em 0;
    font-size: 0.75em;
  }
  .header {
    position: relative;
    width: 100%;
    height: 300px;
    background-position: center center;
    background-size: cover;
  }
  .header__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 20px;
  }
  .works__item:not(:first-child) {
    margin-top: 3em;
  }
  @media screen and (max-width: 767px) {
    .header::before {
      width: 100%;
      height: 300px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1;
      content: '';
    }
    .header__text {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      z-index: 10;
    }
  }
  @media screen and (min-width: 768px) {
    body {
      font-size: 2em;
    }
    .header {
      height: 600px;
    }
    .header__text {
      width: 1200px;
      align-items: flex-end;
      margin: auto;
    }
    .header__text p {
      width: 600px;
    }
    .works__item {
      display: flex;
    }
    .works__item img {
      width: 400px;
      margin-right: 2em;
    }
    .about {
      text-align: center;
    }
  }
  </style>