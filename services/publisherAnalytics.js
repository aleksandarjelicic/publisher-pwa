const analytics_endpoint = process.env.NEXT_PUBLIC_PUBLISHER_ANALYTICS_ENDPOINT;

export const sendPageView = (articleId) => {
  if (analytics_endpoint) {
    const xhr = new XMLHttpRequest();
    const read_date = new Date();
    const request_randomizer = "&" + read_date.getTime() + Math.random();
    xhr.open('GET', analytics_endpoint + '?articleId=' + articleId + request_randomizer + '&ref=' + document.referrer);
    xhr.send();
  }
};

