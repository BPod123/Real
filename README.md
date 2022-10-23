# Real?
A news headline truthiness detector using NLP

> Authors: Ben Podrazhansky, Faris Durrani, Lucas Zhang, Shriya Edukulla <br/>
> Implemented: Oct 21-23, 2022 <br/>
> For: HackGT 2022 ([Devpost](https://devpost.com/software/real-o8jes7))

## How to Run
Full functionality requires both the React frontend and Python backend to run, in addition to disabling CORS ([example extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en))

To run the frontend:
```
cd frontend
npm install
npm start
```

To run the backend (after installing all pip requirements):
```
python -m Flask_App.flask_main
```

# License

*Real?* is MIT licensed, as found in the [LICENSE](./LICENSE) file.

*Real?* documentation is Creative Commons licensed, as found in the [LICENSE-docs](./.github/LICENSE-docs) file.
