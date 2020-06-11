const eventLog = document.getElementById("event-log");
const submitBtn = document.getElementById("submit-query-btn");
const queryInput = document.getElementById("query-input");

let token;

submitBtn.addEventListener("click", function(e) {
  e.preventDefault()
  const value = queryInput.value
  const queries = queryInput.value
    .replace(/\n/ig, '')
    .split(/(?<=;)/)

  const requestOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      queryBatch: queries
    })
  }

  fetch("/api/events", requestOpts);
})

const eventSource = new EventSource("/api/events");

eventSource.addEventListener("message", function(e) {
  eventLog.innerText += JSON.stringify(JSON.parse(e.data), null, 4) + "\n";
});

eventSource.addEventListener("error", function(e) {
  eventLog.innerText += JSON.stringify(JSON.parse(e.data), null, 4) + "\n";
})

eventSource.addEventListener("open", function(e) {
  if (e.data) {
    const parsed = JSON.parse(e.data)
    token = parsed.token
  }
});
