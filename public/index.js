const eventLog = document.getElementById("event_log");
const submitBtn = document.getElementById("submit_query_btn");
const queryInput = document.getElementById("query_input");

let token;

submitBtn.addEventListener("click", function() {
  const value = queryInput.value;

  const requestOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      query: value
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
