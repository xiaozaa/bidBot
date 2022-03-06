# bidBot 
This is a tool to make offer to opensea asset

# install instructions
Make sure you have installed the node js, version 14.xx.xx

open your teminal:

\>> git clone https://github.com/xiaozaa/bidBot.git 

\>> npm install

# create your secret file
\>> cp secret_example.js secret.js

fill up all reuiqred fields

# run cmd
node bidBot.js -target_contract <your target contracts> -start <start point> -offset <how many nft you want to bid> -price <bid price>

eg. bid BAYC's 1 and 2 with price 0.1E

node bidBot.js -target_contract 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d -start 1 -offset 2 -price 0.1

eg. bit BAYC and MAYC's 3 and 4 with price 0.11E

node bidBot.js -target_contract 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d 0x60e4d786628fea6478f785a6d7e704777c86a7c6 -start 3 -offset 2 -price 0.11