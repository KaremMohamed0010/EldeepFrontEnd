export default function (context) {
  if (context.app.$cookies.get("token")) {
    context.$axios.onRequest((config) => {
      config.headers.common.Accept = "application/json";
      config.headers.common.Authorization =
        "Bearer " + context.app.$cookies.get("token");
    });
  }
}
