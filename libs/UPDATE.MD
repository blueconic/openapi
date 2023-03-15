A custom built Rapidoc is used to customize styling that's not exposed by the Rapidoc API (schema styling mostly).
When updating rapidoc, please follow these steps:

1. Sync https://github.com/blueconic/RapiDoc with the source project
2. Make the required changes
3. Rebuild (`npx webpack --mode=production`)
4. Push resulting changes to the BlueConic RapiDoc repository
5. Copy the resulting rapidoc.min.js to this directory and push the changes.