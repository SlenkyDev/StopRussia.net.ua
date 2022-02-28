# Russia HTML DoS

The public news that is presented in the Russian federation is all fake and we believe that it's better to shut it down! If you want to help take the fake news down and join the digital protest, please open this site on your devices in the background and just let it idle. This site works by making a lot of requests to the sites specified below in the stats section, thus overloading them and posing a huge load on their infrastructure. May god help us all.

## Self-Hosting

You can self host this tool under your own domain if you wish, but please, keep the link to the source repository in the footer.

## Contributing

Most pull-requests that add something of value are accepted, but please, if possible, build the site in advance before submiting the pull request.

In order to build the site, launch your terminal inside the cloned repository and run
```
npm i
```
then run
```
npm run build
```
If no errors were made, the built files are going to be located within the /dist folder.
Push the entire root directory, not just the /dist folder.

Please make sure to make your original changes within the root index.html file.

If you wish, you can also run this tool locally after issuing the `npm i` command using
```
npm run dev
```
A localhost dev server will be created, you can access that and attack locally.
