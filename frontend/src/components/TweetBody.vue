<template>
    <div class="card-text tweet-text" v-bind:class="{ bordered: border }">
        <span v-html="textWithLinks"></span>
        <footer class="blockquote-footer" v-if="username">
            <img :src="status.user.profile_image_url" class="profile-img"> {{status.user.name}} <a :href="'http://twitter.com/' + status.user.screen_name">@{{status.user.screen_name}}</a>
        </footer>
    </div>
</template>

<script>
export default {
  props: {
    status: Object,
    username: Boolean,
    border: Boolean
  },
  computed: {
    textWithLinks() {
      let result = this.status.text;

      for (let url of this.status.entities.urls) {
        result = result.replace(
          url.url,
          '<a href="' +
            url.expanded_url +
            '" target="_blank">' +
            url.display_url +
            "</a>"
        );
      }

      for (let mention of this.status.entities.user_mentions) {
        result = result.replace(
          "@" + mention.screen_name,
          '<a href="https://twitter.com/' +
            mention.screen_name +
            '" target="_blank">@' +
            mention.screen_name +
            "</a>"
        );
      }

      for (let hashtag of this.status.entities.hashtags) {
        result = result.replace(
          "#" + hashtag.text,
          '<a href="https://twitter.com/hashtag/' +
            hashtag.text +
            '?src=hash" target="_blank">#' +
            hashtag.text +
            "</a>"
        );
      }

      return result;
    }
  }
};
</script>

<style>
.tweet-text {
  font-size: 1rem;
}

.bordered {
  border: 1px dotted;
  padding: 0.5rem;
}
</style>

