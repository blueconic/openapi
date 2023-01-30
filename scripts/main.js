function getQueryStringParam(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params[key];
}

const versionSelect = document.getElementById("versionSelect");
const wrapper = document.getElementById("versionSelectWrapper");


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

if (hostname || versionSelect.options.length == 1) {
    // don't show version pulldown, it's always pointing to the actual spec
    wrapper.style.display = "none";
} else {
    // change spec on change
    versionSelect.addEventListener("change", () => {
        // change spec
        rapidoc.setAttribute("spec-url", `./definitions/${versionSelect.value}.json`);
    });
}

// add header to each request
rapidoc.addEventListener('before-try', (e) => {
    // add custom header so CORS headers are returned
    e.detail.request.headers.append('X-BlueConic-OpenApi-Request', 'true');
});