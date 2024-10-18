



## TMDB API
api에서 바뀌는 부분은 movie/ ${} ? language=ko....이다.
### 영화
- 상영작
https://api.themoviedb.org/3/movie/now_playing?language=ko&region=kr&page=1&sort_by=release_date.desc&api_key=[API_KEY]

- Discover
https://api.themoviedb.org/3/discover/movie?language=ko&region=kr&page=1&sort_by=release_date.desc&api_key=[API_KEY]

- 인기작
https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=[API_KEY]

- 장르
https://api.themoviedb.org/3/genre/movie/list?language=ko&region=kr&api_key=[API_KEY]

- 영화상세
https://api.themoviedb.org/3/movie/496243/credits?&region=kr&language=ko&api_key=[API_KEY]

- 검색
https://api.themoviedb.org/3/search/movie?language=ko&region=kr&query=기생충&api_key=[API_KEY]
- 이미지
https://image.tmdb.org/t/p/w200/jjHccoFjbqlfr4VGLVLT7yek0Xn.jpg
<br><br><br><br>

### TV

-현재 방영작:
https://api.themoviedb.org/3/tv/on_the_air?api_key=250604987b9bcb91e2f812b87db35ebf

-Discover (발견):
https://api.themoviedb.org/3/discover/tv?api_key=250604987b9bcb91e2f812b87db35ebf

-인기작:
https://api.themoviedb.org/3/tv/popular?api_key=250604987b9bcb91e2f812b87db35ebf

-장르 목록 및 id:
https://api.themoviedb.org/3/genre/tv/list?api_key=250604987b9bcb91e2f812b87db35ebf

#### 장르 목록 및 id
-Action & Adventure 10759
-애니메이션 16
-코미디 35
-범죄80,
-다큐멘터리99
-드라마18
-가족10751
-Kids 10762
-미스터리9648
-Sci-Fi & Fantasy10765
-Talk 10767
-War & Politics 10768
-예시 url : https://api.themoviedb.org/3/discover/tv?&with_genres=10766&page=1&language=ko&region=kr&sort_by=vote_count.desc&api_key=f76021076e8162ea929bd2cea62c6646

-TV 상세:
https://api.themoviedb.org/3/tv/{tv_id}?api_key=250604987b9bcb91e2f812b87db35ebf
(여기서 {tv_id}는 TV 프로그램의 ID로 대체해야 합니다.)

-검색:
https://api.themoviedb.org/3/search/tv?api_key=250604987b9bcb91e2f812b87db35ebf

-이미지:
https://api.themoviedb.org/3/tv/{tv_id}/images?api_key=250604987b9bcb91e2f812b87db35ebf
(여기서 {tv_id}는 TV 프로그램의 ID로 대체해야 합니다.)

 - UI 라이브러리 설치
        ```
            $ npm i --save @toolpad/core @mui/material @mui/icons-material @emotion/react @emotion/styled
        ```

### TV 쇼 및 영화 정렬 기준
- popularity.asc: 인기 순으로 오름차순 정렬.
- popularity.desc: 인기 순으로 내림차순 정렬.
- release_date.asc: 개봉일 순으로 오름차순 정렬.
- release_date.desc: 개봉일 순으로 내림차순 정렬.
- vote_average.asc: 평점 순으로 오름차순 정렬.
- vote_average.desc: 평점 순으로 내림차순 정렬.
- vote_count.asc: 투표 수 순으로 오름차순 정렬.
- vote_count.desc: 투표 수 순으로 내림차순 정렬.
- original_title.asc: 원제 순으로 오름차순 정렬.
- original_title.desc: 원제 순으로 내림차순 정렬.

<br><br><br><br>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
