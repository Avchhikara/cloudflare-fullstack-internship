addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const urls_res = await fetch(
    "https://cfw-takehome.developers.workers.dev/api/variants"
  );
  const { variants } = await urls_res.json();
  const sendVariant = getSendVariant(request, "prev_variant");
  let finalResponse = await fetch(variants[sendVariant]);
  let response = new Response(finalResponse.body);
  response.headers.set(
    "Set-Cookie",
    `prev_variant=${sendVariant === 0 ? "first" : "second"}`
  );
  return response;
}

function getSendVariant(request, name) {
  const cookieString = request.headers.get("Cookie");
  let result = "second";
  if (cookieString) {
    let cookies = cookieString.split(";");
    cookies.forEach((cookie) => {
      let cookieName = cookie.split("=")[0].trim();
      if (cookieName === name) {
        let cookieVal = cookie.split("=")[1];
        result = cookieVal;
      }
    });
  }
  return result === "second" ? 0 : 1;
}
