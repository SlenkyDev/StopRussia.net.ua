# Contributing

Make sure you have NodeJS.

We use ESlint, so please follow the rules that are set.

For PR we have actions that will automatically check the code and throw errata if necessary.  
To avoid this, you can use `npm run lint:fix` which will fix some errors, and others you have to fix manually.    
ESlint will always throw you a line, and the filename where the error is located.  

## Setup
1. Fork & clone the repository, and make sure you're on the **main** branch
2. `npm ci`
3. Update your code.
4. Run `npm run lint` for check.
5. Open PR 🎉 (please check [angular commit formatting](https://gist.github.com/brianclements/841ea7bffdb01346392c))
