const eventLog = document.getElementById("event_log");
const submitBtn = document.getElementById("submit_query_btn");
const queryInput = document.getElementById("query_input");

let connectionId;

submitBtn.addEventListener("click", function() {
  const value = queryInput.value;

  fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Connection": connectionId
    },
    body: JSON.stringify({
      query: value
    })
  });
})

const eventSource = new EventSource("/api/events");

eventSource.addEventListener("message", function(e) {
  eventLog.innerText += e.data + "\n";
});

eventSource.addEventListener("open", function(e) {
  if (e.data) {
    connectionId = e.data
  }
});