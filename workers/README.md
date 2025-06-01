# Cloudflare Workers 설정 가이드

## Worker 생성

1. Cloudflare 로그인 후 메인 대시보드로 이동합니다. (영문 페이지 기준)
2. 좌측 메뉴 "Compute" 섹션 아래의 "Workers & Pages"로 이동합니다. 
3. 화면 상단 중앙의 "Create" 버튼을 클릭합니다.
4. "Workers" 탭에서 "Start with Hello World!"를 선택합니다.
5. "Deploy"를 하여 초기 스크립트를 배포하고,\
   화면이 바뀌면 "Continue to project"를 클릭합니다.
6. "Settings" 탭으로 이동합니다. 
7. 화면 중앙 상단에 "Domains & Routes" 섹션에서 "workers.dev" 타입의 값을 기억합니다. (값은 이 워커의 기본 url 입니다.)
8. 화면 중앙 "Variables and Secrets" 섹션에서 "Add"를 클릭합니다.
9. "Type"은 `Text`이고\
   "Variable name"에 `CLOUDFLARE_WORKERS_HOSTNAME`을 입력하고\
   "Value"에 앞서 기억한 `workers.dev` 값을 입력하고\
   ""Deploy" 버튼 옆 아래 화살표를 클릭하고 "Save version"을 클릭합니다. 
10. 화면 우상단에 `</>`(Edit code) 버튼을 클릭하고\
   `workers/index.js` 내용으로 변경 후\
   화면 우상단의 "Deploy"를 클릭합니다.

### 추가 자료

- Cloudflare Workers에 대한 자세한 정보는 [공식 문서](https://developers.cloudflare.com/workers/)를 참조하세요.
- 문제 해결을 위해 Worker 대시보드의 "Logs" 탭을 확인하세요.

## API 토큰 생성

1. Cloudflare 로그인 후 메인 대시보드로 이동합니다. (영문 페이지 기준)
2. 서버에 연결할 도메인을 클릭합니다. (해당 도메인의 메인 대시보드로 이동됩니다.)
3. 화면 우하단에 "API" 섹션을 찾습니다.
   1. "Zone ID" 값은 `/.env` 파일의 `CLOUDFLARE_ZONE_ID` 환경변수 값으로 사용됩니다.
   2. "Get your API token" 링크를 클릭합니다.
      1. "Create Token" 버튼을 클릭합니다.
      2. "API token templates" 섹션에서 "Edit zone DNS"를 선택합니다.
         - "Permissions": `Zone | DNS | Edit`
         - "Zone Resources": `Include | Specific zone | [해당 도메인]`
         - "Client IP Address Filtering": 설정 없음
         - "TTL": 설정 없음
      3. "Continue to summary"를 클릭합니다.
      4. "Create Token"을 클릭합니다.
      5. 토큰 값을 기억합니다. (주의: 다시는 토큰 값을 볼 수 없습니다.)

