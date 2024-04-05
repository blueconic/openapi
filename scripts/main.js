function getQueryStringParam(key) {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return params[key];
}

const versionSelect = document.getElementById("versionSelect");
const wrapper = document.getElementById("versionSelectWrapper");


let hostname = getQueryStringParam("hostname");
let version = getQueryStringParam("version");

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
    if (version && version !== "current") {
        // use specific version passed in querystring
        if (!version.startsWith("r")) {
            version = `r${version}`;
        }
        rapidoc.setAttribute("spec-url", `./definitions/${version}/openapi.json`);

        // set selected version in dropdown
        versionSelect.value = `${version}/openapi`;
    } else {
        // use version as specified in the version dropdown
        let selectedVersion = versionSelect.value;
        if (selectedVersion === "openapi_latest"){
            rapidoc.setAttribute("spec-url", `./definitions/openapi_latest.json`);
        } else {
            rapidoc.setAttribute("spec-url", `./definitions/${selectedVersion}.json`);
        }
    }
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