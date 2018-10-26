<template>
    <div>
        <strong><a :href="'http://twitter.com/' + screenName" target="_blank">@{{screenName}}</a></strong>
        &nbsp;
        <b-button size="sm" :disabled="loading" @click="refresh()">
            <fa-icon icon="sync" :spin="loading"></fa-icon>
        </b-button>&nbsp;
        <b-form-checkbox :disabled="loading" v-if="false">Auto-refresh</b-form-checkbox>
        <hr>
        <b-alert variant="danger" :show="error != null">
          <strong>Error: </strong>{{error}}
        </b-alert>
        <tweet v-for="tweet in tweets" :key="tweet.id" :data="tweet"></tweet>
    </div>
</template>

<script>
export default {
  props: {
    screenName: {
      type: String
    },
    count: {
      type: Number,
      default: 30
    }
  },
  watch: {
    screenName(newValue) {
      this.refresh();
    },
    count(newValue) {
      if (this.changeTimer != null) {
        clearTimeout(this.changeTimer);
      }

      this.changeTimer = setTimeout(() => {
        this.refresh();
      }, 1000);
    }
  },
  data() {
    return {
      tweets: [],
      loading: false,
      error: null,
      changeTimer: null
    };
  },
  methods: {
    async refresh() {
      this.loading = true;
      try {
        let result = await (await fetch(
          "http://localhost:7890/1.1/statuses/user_timeline.json?count=" +
            this.count +
            "&screen_name=" +
            this.screenName
        )).json();

        this.loading = false;
        this.tweets = result;
      } catch (err) {
        this.loading = false;
        this.error = err.message;
      }
    }
  },
  created() {
    this.refresh();
  }
};
</script>
