## Instruction
### Note
The original image path will be hashed in backend to confuse the users. Thus, users cannot distinguish them by inspecting the request url.
### Example data
Five example images are provided in `./images/` as examples. You should revise `./data/data.txt` for the absolute path and run the following command:
```
python3 hashing_filenames.py ./data/data.txt ./data/hashing_table.json
```
Then, you can build up `./data/hashed_fidelity_challenges.json` and `./data/hashed_quality_challenges.json` by modified the hashing values. Please choose them from `./data/hashing_table.json`.
### Prepare your own dataset
1. Please enumerate your images with **absolute path** in `./data/data.txt`.
2. Run `python3 hashing_filenames.py ./data/data.txt ./data/hashing_table.json` to generate hashing table.
3. Design your challenges following the format.
* For the quality challenge
    * If you want to extend the number of options. You should revise `frontend/src/container/QualityTask.js`, too. Please see the `README.md` in `frontend/`. Additionally, the `key` names should be the same as those in `frontend/src/config.json`.
```json
{
	"0001": {
		"origin": $hashvalue,
		"reference": $hashvalue,
		"optA": $hashvalue,
		"optB": $hashvalue,
		"optC": $hashvalue
	},
    "0002":{
        ...
    },
    ...
}
```
* For the fidelity challenge
```json
{
	"0000": {
		"REAL": $hashvalue,
		"FAKE": $hashvalue
	},
	"0002":{
        ...
    },
    ...
}
```
### To start the server
```
python3 server.py
```
### Analyze
The `evaluation.db` will be created in `./`. Please use `sqlite3` API to operate it.