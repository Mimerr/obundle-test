# oBundle Test

This repo is code done for the oBundle application test.

## Sign up for trial store.

Needed to get started. 15 days valid. [Log In - BigCommerce](https://store-ip24uxj41m.mybigcommerce.com/manage/dashboard)

## Install Stencil CLI and setup Cornerstone Theme

```
# Download and install nvm if you don't have it.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

# Reload .bashrc so nvm command works
source ~/.bashrc

# Explicitly install and use supported node version
nvm install 12
nvm use 12

# Install stencil
npm install -g @bigcommerce/stencil-cli

# Install theme
git clone https://github.com/bigcommerce/cornerstone.git
cd cornerstone
npm install

# Create an account and set up an API user. Should give a command to init stencil.
stencil init --url https://obundle-test10.mybigcommerce.com --token my-api-token

# Start the web app, will run on given port above, defaults to 3000.
stencil start

```
## Tasks

1. Create a product called **Special Item** with two images. I did this through the Bigcommerce app dashboard.
2. Create a category called **Special Items** of which the product above is the only item in the category. Also did this through the Bigcommerce app dashboard.
3. Create a feature that will show the product's second image when it is hovered. This was the first real dev task. It was accomplished by adding css for a separation of two images to be hidden/shown on hover using the card.html/css.
4. Add a button to the top of the category page labeled **Add All To Cart** that will add the category's products to the cart. Notify the user that the product has been added to the cart. Should be accomplished with the storefront API. I have this more or less set up, it works sometimes and doesn't most of the time. I keep getting some cross site cookie errors in the log. If I get more time in the near future I'll try to figure out why.
5. Add another button to **Remove All Items** from the cart. Notify the user. Should only be shown if the cart has an item in it. This is in the same state as the add button. Seemed to work at least once but can't seem to be consistent.
6. If a customer is logged in at the top of the category page show a banner with customer details using handlebars and the customer object. Not sure if I did this exactly as desired but it is there, using handlebars, showing a few customer details.

## Preview Code
1f559d117d - https://obundle-test10.mybigcommerce.com

## License

(The MIT License)
Copyright (C) 2015-present BigCommerce Inc.
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
