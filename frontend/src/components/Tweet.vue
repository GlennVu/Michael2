<template>
    <b-card no-body class="card" header-tag="header" footer-tag="footer">
        <div slot="header">
            <a :title="fullDate" class="date">{{displayDate}}</a>
        </div>
        <b-card-body>
            <div v-if="data.retweeted_status">
                <em><fa-icon icon="retweet"></fa-icon>&nbsp;<strong>{{data.user.name}}</strong> retweeted:</em>
                <tweet-body :status="data.retweeted_status" username></tweet-body>
            </div>

            <div v-else>
                <tweet-body :status="data"></tweet-body>

                <div v-if="data.quoted_status">
                    <em><fa-icon icon="reply"></fa-icon>&nbsp;<strong>{{data.user.name}}</strong> replied to:</em>
                    <tweet-body :status="data.quoted_status" username border></tweet-body>
                </div>
            </div>
        </b-card-body>

        <div slot="footer">
            <a :href="'https://twitter.com/' + data.user.screen_name + '/status/' + data.id_str" target="_blank"
            class="card-link">Link</a>
        </div>
    </b-card>
</template>

<script>
import moment from "moment";

export default {
  props: ["data"],
  data() {
    return {
      fullDate: "",
      displayDate: ""
    };
  },
  methods: {
    refreshDate() {
      this.fullDate = moment(this.data.created_at).format("LLLL");
      this.displayDate = moment(this.data.created_at).fromNow();
    }
  },
  created() {
    this.refreshDate();
    setInterval(() => {
      this.refreshDate();
    }, 5000);
  }
};
</script>

<style>
.card {
  margin-bottom: 1rem;
}

.profile-img {
  height: 30px;
}

.date {
  border-bottom: 1px dashed;
  cursor: pointer;
}
</style>

