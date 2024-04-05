# BlueConic OpenAPI Specification
This repository contains the OpenAPI specification for the BlueConic REST API v2.
 
 # Using the latest published OpenAPI specification
 * Open https://rest.apidoc.blueconic.com
 
 # Using the OpenAPI specification of a given BlueConic tenant
 * Open https://rest.apidoc.blueconic.com/?hostname=mytenantname.blueconic.net
 * Or open https://mytenantname.blueconic.net/openapi
 
 # Running the OpenAPI specification on a local machine
 * Clone the repository and `cd` to the repository location
 * Run `npx http-server`
 * Open `http://localhost:8080?hostname=localhost`
 * CORS configuration of BlueConic needs to be adjusted to the the localhost origin (`http://localhost:8080` by default)
 
 # Specifying BC version
 The `version` querystring parameter can be used to specify a specific BlueConic version. Note that parameter is exclusive with the `hostname` parameter, which will always load the version specified by the tenant being connected to.
 
 * https://rest.apidoc.blueconic.com/?version=89 or https://rest.apidoc.blueconic.com/?version=r89 will load version 89
 * https://rest.apidoc.blueconic.com/?version=91 or https://rest.apidoc.blueconic.com/?version=r91 will load version 91
 * https://rest.apidoc.blueconic.com/?version=current will load latest version published. Behaves the same as not specifying a version at all.
 
