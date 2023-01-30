function getQueryStringParam(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params[key];
}

let hostname = getQueryStringParam("hostname");
const rapidoc = document.getElementById("doc");
if (hostname) {
    if (!hostname.startsWith("http")) {
        hostname = `https://${hostname}`;
    }
    if (hostname.includes("http://")) {
        hostname = hostname.replace("http://", "https://");
    }
    // load actual OpenAPI spec from hostname
    rapidoc.setAttribute("spec-url", `${hostname}/rest/v2/openapi.json`);
} else {
    // load local OpenAPI spec
    rapidoc.setAttribute("spec-url", "./definitions/openapi_latest.json");
}