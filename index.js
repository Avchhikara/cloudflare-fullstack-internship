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
  const sendVariant = Math.floor((Math.random() * 100) % 2);
  let finalResponse = await fetch(variants[sendVariant]);

  return finalResponse;
}
