
## Generate API  app key
Generate key must be 256 bits (32 characters) in hex format.<br>
Steps for generating valid app key:

```bash
# build project
$ npm run build

# add execute permissions
$ chmod +x dist/src/cli.js

# generate app key
$ npx mceu generate-app-key
```

