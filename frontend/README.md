# Frontend
The frontend server is created by ReactJS. The basic commands are the same as the ones in React:
```
yarn start
yarn test
yarn build
yarn eject
```
## Prepare for your own dataset
1. Please go to `backend/` to organize the setting for the backend server first.
2. Modify `frontend/src/config.json`. You can modify the backend url with port and **TIME LIMIT** for each task in the config. The **TASK OPTIONS** should be the same as the ones you specify in `backend/data/hashed_quality_challenges.json`.
```json
{
    "SERVER_URL": "http://10.1.0.41:9090/",
    "FIDELITY_TASK_TIME_LIMIT": 10,
    "QUALITY_TASK_TIME_LIMIT": 30,
    "QUALITY_TASK_OPTIONS": ["A", "B", "C"]
}
```
3. If the number of options for quality tasks are over 3, please modify `frontend/src/containers/QualityTask.js`. Please add more blocks of `<div className="flex-container-col">...</div>` in the `<div className="flex-container">...</div>`.
```js
<div className="flex-container">
    <div className="flex-container-col">
        <ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[0]]}/>
        A
    </div>
    <div className="flex-container-col">
        <ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[1]]}/>
        B
    </div>
    <div className="flex-container-col">
        <ImageWrapper url={rootImageURL+challenges[currIdx][availableChoices[2]]}/>
        C
    </div>
</div>
```
4. Build the static code. `yarn build`
5. Copy `frontend/build/*` to `/var/www/html/` or somewhere you specify in `nginx` config.