# 👜 삼와머니 - 너... 지갑 아직 살아있어?

> **콩팥이가 지켜주는 간편한 가계부, 삼와머니!**  
> 산와머\*라는 대부업체의 광고 및 캐릭터에서 모티브를 얻어, 위트 있는 디자인과 소비 경고 피드백을 담았습니다.

---

## 😀 프로젝트 목적

삼와머니는 **친근한 캐릭터와 직관적인 UI**를 통해  
복잡한 가계부 작성 과정을 간편하게 만들고,  
**소비 성향 분석**, **시각화된 데이터**, **사용자 맞춤 피드백**으로  
지출 습관 개선을 돕는 웹 기반 가계부입니다.

본 프로젝트는 **Vue.js 생태계 학습**을 기반으로 한 실전 협업 프로젝트이며,  
프론트엔드 구조 설계와 컴포넌트 기반 개발 역량을 향상시키는 것을 주요 목표로 합니다.

---

## 🛠️ 기술 스택

| 구분            | 기술 스택                                  |
| --------------- | ------------------------------------------ |
| **Frontend**    | Vue 3, Pinia, Vue Router, Chart.js         |
| **Backend**     | JSON Server, Node.js, Glitch (서버 호스팅) |
| **Design**      | Figma                                      |
| **Docs & 협업** | Notion, Git, GitHub                        |

## 📊 플로우차트

<details open>
  <summary>클릭해서 플로우차트를 확인하세요</summary>
  <p align="center">
    <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/FLOW_ERD/%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8.png" width="80%">
  </p>
</details>

---

## 🗂 ERD (Entity-Relationship Diagram)

<details open>
  <summary>클릭해서 ERD를 확인하세요</summary>
  <p align="center">
    <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/FLOW_ERD/ERD.png" width="80%">
  </p>
</details>

---

## 🖌 와이어프레임

<details open>
  <summary>클릭해서 와이어프레임을 확인하세요</summary>
<table>
  <tr>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/01%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif" width="90%"><br>회원가입
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/02%20%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8%EC%B0%BE%EA%B8%B0%20%EB%B0%8F%20%EB%A1%9C%EA%B7%B8%EC%9D%B8.gif" width="90%"><br>비밀번호찾기 및 로그인
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/03%20%ED%9A%8C%EC%9B%90%EC%A0%95%EB%B3%B4%EC%88%98%EC%A0%95.gif" width="90%"><br>회원정보 수정
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/04%20%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83.gif" width="90%"><br>로그아웃
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/05%20%ED%9A%8C%EC%9B%90%ED%83%88%ED%87%B4.gif" width="90%"><br>회원탈퇴
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/06%20%EA%B2%80%EC%83%89%20%EB%B0%8F%20%ED%95%84%ED%84%B0.gif" width="90%"><br>검색 및 필터
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/07%20%EC%9B%94%EB%B3%84%20%ED%99%95%EC%9D%B8.gif" width="90%"><br>월별 확인
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/08%20%EC%88%98%EC%9E%85%EC%A7%80%EC%B6%9C%20%EC%B6%94%EA%B0%80%20%EB%B0%8F%20%ED%99%95%EC%9D%B8.gif" width="90%"><br>수입지출 추가 및 확인
    </td>
  </tr>
  <tr>
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/09%20%EC%88%98%EC%9E%85%EC%A7%80%EC%B6%9C%20%EC%88%98%EC%A0%95%20%EB%B0%8F%20%ED%99%95%EC%9D%B8.gif" width="90%"><br>수입지출 수정 및 확인
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/08%20%EC%88%98%EC%9E%85%EC%A7%80%EC%B6%9C%20%EC%B6%94%EA%B0%80%20%EB%B0%8F%20%ED%99%95%EC%9D%B8.gif" width="90%"><br>수입지출 삭제 및 확인
  </tr>
  <tr>
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/11%20%EA%B0%84%ED%8E%B8%EC%9A%94%EC%95%BD(%EC%B0%A8%ED%8A%B8).gif" width="90%"><br>간편 요약(차트)
    </td>
    <td align="center">
      <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84/12%20%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C(%EB%82%B4%EC%9E%A5%EB%AA%A8%EB%93%9C).gif" width="90%"><br>다크모드(내장모드)
  </tr>
</table>
</details>

## ⚙ 설치 및 실행 방법

```
# 1. 레포지토리 클론
git clone https://github.com/your-username/project-name.git
cd project-name

# 2. 의존성 설치
npm install

# 3. json-server 실행
npx json-server --watch db.json --port 5500

# 4. Vue 앱 실행 (예: 포트 5173)
npm run dev
```

## 📁 프로젝트 구조

<details open>
  <summary>📁 클릭해서 프로젝트 구조를 확인하세요</summary>

```bash
samwae-money/
├── public/
├── src/
│   ├── api/                  # API 통신 모듈 (axios 요청 등)
│   ├── assets/               # 이미지, 폰트 등 정적 자원
│   ├── components/           # 재사용 가능한 UI 컴포넌트 모음
│   │   ├── Common/           # 공통 컴포넌트
│   │   ├── auth/             # 로그인/회원가입 관련 컴포넌트
│   │   ├── button/           # 버튼 UI
│   │   ├── main/             # 메인 대시보드 구성
│   │   ├── payment-add/      # 수입/지출 추가
│   │   ├── payment-detail/   # 거래 상세
│   │   ├── payment-summary/  # 통계 요약 (차트 등)
│   │   ├── payment-update/   # 거래 수정
│   │   ├── sidebar/          # 사이드바 레이아웃
│   │   └── toast/            # 토스트 메시지
│   ├── router/               # Vue Router 설정
│   ├── stores/               # Pinia 상태 관리
│   ├── utils/                # 유틸 함수 (날짜 처리 등)
│   ├── views/                # 각 페이지 컴포넌트
│   │   ├── Auth.vue
│   │   ├── DailyPayment.vue
│   │   ├── GoodBye.vue
│   │   ├── MainPage.vue
│   │   ├── MyPage.vue
│   │   ├── PasswordSearch.vue
│   │   ├── PaymentAdd.vue
│   │   ├── PaymentDetail.vue
│   │   ├── PaymentSummary.vue
│   │   ├── PaymentUpdate.vue
│   │   ├── Privacy.vue
│   │   ├── ProfileEdit.vue
│   │   ├── SettingView.vue
│   │   ├── SignIn.vue
│   │   └── Terms.vue
│   ├── App.vue               # 루트 컴포넌트
│   └── main.js               # 진입 파일
├── db.json                   # JSON Server 데이터베이스
├── package.json              # 의존성 및 스크립트 설정
├── .env                      # 환경변수
├── .editorconfig             # 에디터 통일 설정
└── .gitattributes            # Git 설정
```

</details>

## 📌 주요 기능

### ✅ 인증 및 사용자 관리

- **회원가입 / 로그인 / 비밀번호 찾기**: 사용자 인증 및 보안 기능
- **회원정보 조회 및 수정**: 개인 수입 목표, 비밀번호 변경, 회원 탈퇴 가능

### ✅ 소비 내역 및 시각화

- **캘린더 기반 소비 내역 조회**: 날짜별로 거래 내역 확인 가능
- **카테고리별 소비 검색 및 분석**: 카테고리 기반 검색 및 소비 요약 제공
- **월간 소비 분석**: 차트(파이, 바 차트)를 통한 시각화된 분석

### ✅ 소비 성향 및 멘트 피드백

- **SPTI 소비 성향 분석**: 사용자의 소비 패턴을 분석해 7단계 피드백 제공
- **멘트 기능**: 지출 위험 단계별로 감정 이모지 & 텍스트 멘트 출력

### ✅ 거래 관리

- **거래 추가/수정/삭제**: 수입·지출 입력, 사진/메모/카테고리 설정 포함
- **거래 상세보기**: 상세 정보 확인 및 수정 가능
- **일별 거래 내역 요약**: 스크롤 가능한 카드 뷰로 정리

### ✅ 사용자 편의 기능

- **사이드바 네비게이션**: 라우팅 기반 빠른 이동
- **다크모드 / 라이트모드 전환**: 사용자 환경설정 반영
- **빠른 추가 버튼**: Floating Button으로 손쉬운 거래 추가

### ✅ 기타

- **푸터 정보**: 프로젝트 정보, 이용 약관, 개인정보 처리방침 안내

---

## 👥 팀원

| 이름       | 사진                                                                        | GitHub                                         | 역할                | 담당 영역                                                                               |
| ---------- | --------------------------------------------------------------------------- | ---------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------- |
| **임예원** | <img src="https://avatars.githubusercontent.com/u/156289574?v=4" width=100> | [@wony0321](https://github.com/wony0321)       | 팀장, 백/프론트엔드 | API/ERD 설계, 회원가입/로그인, 회원정보/탈퇴, 다크모드, 소비 성향 분석, 전체적인 CSS 등 |
| **강경민** | <img src="https://avatars.githubusercontent.com/u/85470797?v=4" width=100>  | [@kgm7642](https://github.com/kgm7642)         | 백/프론트엔드       | 데이터 API 설계, ERD 설계 및 수정, 시각화(파이/바 차트), 사이드바 라우터 설정, CSS      |
| **강예성** | <img src="https://avatars.githubusercontent.com/u/203206097?v=4" width=100> | [@kang-yesung](https://github.com/kang-yesung) | 프론트엔드          | 피그마 설계, UI 디자인, 빠른추가, 거래 추가/상세/수정, 토스트 알림                      |
| **강지원** | <img src="https://avatars.githubusercontent.com/u/110143494?v=4" width=100> | [@jionii](https://github.com/jionii)           | 프론트엔드          | 피그마 설계, UI 디자인, 캘린더 뷰, 거래 요약 정보, 발표자료 제작, 거래 상세             |
| **정다현** | <img src="https://avatars.githubusercontent.com/u/173062369?v=4" width=100> | [@dahyyun](https://github.com/dahyyun)         | 프론트엔드          | 피그마 설계,UI 디자인, 카테고리 검색, 검색 결과, 검색 필터링                            |

---

## 👥 개선 사항 및 후기

### 👩‍💼 임예원

#### 📝 프로젝트 후기

> 사실 저는 처음은 아닙니다. 벌써 5번째 프로젝트인데요! 그동안의 협업 경험을 바탕으로 이번에는 팀을 더 잘 이끌 수 있었습니다.  
> 특히 짧은 시간 안에 프로젝트를 완성해야 하는 상황이었기 때문에, 시간 관리가 핵심이었습니다.  
> 저의 빡빡한 일정을 따라와준 팀원들에게 감사하다는 말 꼭 하고 싶습니다!!! 덕분에 완성할 수 있었어요 ㅎㅎ  
> Notion을 활용한 **WBS(Work Breakdown Structure)**와 요구사항 명세를 통해 역할을 분담하고, 각 팀원의 진행상황을 한눈에 파악할 수 있도록 구성했습니다.  
> 또, GitHub 협업이 처음인 팀원들에게 git 사용법을 알려주면서 그동안의 노력이 헛되지 않았음을 느낄 수 있었습니다 ㅎㅎ

#### 🔄 다음 프로젝트에서 내가 더 잘하려면?

- 더 침착하게 계획을 관리하고 소통할 것! (이번엔 시간이 급박해서 조금 조급했어요 😅)
- 백엔드 역량을 강화하여 Docker와 SQL을 활용한 배포 및 DB 설계에도 도전하고 싶어요.

#### 🐞 이슈 트래킹 기록

##### 1. 📦 json-server Glitch 배포

**문제**  
Glitch로 json-server를 배포하는 과정에서 반복적으로 오류 발생

**구성 파일 예시**

```js
// server.js
server.use('/api', router); // '/api' 경로 설정 주의
```

```json
// db.json
{
  "Auth": [],
  "Balance": [],
  "Category": [],
  "Ment": [],
  "Setting": []
}
```

**트러블 슈팅 요약**

> `/api` 경로를 명시했기 때문에, 프론트에서 요청 시 URL에 반드시 `/api`를 포함해야 동작함  
> `.env` 파일을 설정하여 환경변수 관리  
> Glitch 배포 시 로그인/로그아웃 반복 후에 배포가 정상 작동되는 경우도 있음 (실제 경험 기반 팁!)

---

##### 2. 🗓️ 캘린더 월 변경 시 화면 미변경 문제

**문제**  
상위 store의 `viewDate` 상태는 변경되었지만, 컴포넌트 내부에서 이를 감지하지 못해 화면이 갱신되지 않음

**해결**  
`watch()`와 `computed()`를 함께 활용하여 반응형으로 상태를 추적  
변경된 `summaryItems`를 깊은 감시(`deep watch`)로 감지하여 적절히 리렌더링

```js
watch(
  summaryItems,
  (val) => {
    console.log('✅ summaryItems 변경됨');
  },
  { deep: true, immediate: true }
);

const currentMonth = computed(() => viewDate.value.getMonth() + 1);
const currentYear = computed(() => viewDate.value.getFullYear());
```

> 📌 `deep: true`는 객체 내부의 속성까지 감지하게 해주며, `immediate: true`는 컴포넌트가 mount될 때도 즉시 실행되도록 해줍니다.

---

##### 3. 📅 캘린더 날짜 하루 밀림 현상

**문제**  
달력에서 선택한 날짜가 하루 밀려서 표시되는 현상

**원인**  
날짜 객체의 시간 정보가 포함되어 있기 때문에, 타임존이나 렌더링 시점에서의 00:00:00이 아닌 시간이 함께 전송되어 의도치 않은 날짜가 표시됨

**해결**

```js
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // 🕒 시간 초기화
  return d.toISOString().split('T')[0];
};
```

> 📌 `setHours(0, 0, 0, 0)`는 시간 정보를 완전히 초기화하여, 날짜만 정확하게 유지되도록 합니다.  
> 이렇게 하면 **시간대(TimeZone)**에 따른 날짜 밀림 현상을 방지할 수 있습니다.

---

### 👩‍💻 강경민

#### 📝 프로젝트 후기

Vue를 약 2주간 학습한 상태에서 프로젝트를 시작하게 되어 걱정이 많았지만,  
팀장님과 팀원분들의 많은 도움 덕분에 무사히 마무리할 수 있었습니다.  
주변에서 "직접 써봐야 진짜 실력이 는다"는 말처럼,  
이번 프로젝트를 통해 실제로 Vue의 기능들을 적용해보며 많은 것을 배울 수 있었습니다.  
특히 `Vue Router`와 `Pinia`를 왜 사용하는지, 어떻게 사용하는지에 대한 감을 잡을 수 있었던 것이 큰 수확이었습니다.  
앞으로도 이번 경험을 바탕으로 더 성장해 나가고 싶습니다.

#### 👍 좋았던 점

- 혼자 공부할 때는 경험하기 어려운 Git 협업을 팀 프로젝트를 통해 직접 해볼 수 있어서 좋았습니다.
- 브랜치 전략, 충돌 해결, PR 리뷰 등 협업의 실전 경험을 하며 Git 흐름을 이해할 수 있었습니다.
- 팀원들과 역할을 나누고 소통하면서 다양한 시각과 코딩 스타일을 배울 수 있었습니다.

#### 🙁 아쉬웠던 점

- 구현하고 싶은 아이디어가 많았지만, 제한된 시간으로 인해 일부 기능은 완성하지 못해 아쉬웠습니다.
- 기능을 급하게 마무리하면서 코드 퀄리티와 UI 디테일을 충분히 다듬지 못한 점이 아쉬웠습니다.

#### 🐞 이슈 트래킹 기록

##### 🔧 `PieChart.vue`: 수입/지출 파이차트 렌더링

**문제**  
화면에 차트가 렌더링되지 않음

**원인**  
`chart.js` + `vue-chartjs`에서는 `labels`와 `data` 배열의 길이가 다를 경우 오류 발생

- `labels`: 항상 10개의 고정된 카테고리명
- `data`: 합계가 0인 항목은 제외되면서 길이가 가변적 → 불일치

**해결 방법**

- 모든 카테고리에 대해 **합계가 0이라도** `data` 배열에 `0`을 명시적으로 포함
- `labels`, `backgroundColor`, `data` 배열의 **길이를 항상 동일하게 유지**

```js
const chartData = computed(() => ({
  labels: filteredCategories.value.map((cat) => cat.name),
  datasets: [
    {
      backgroundColor: filteredCategories.value.map((cat) => cat.color),
      data: categoryAmounts.value, // 항상 10개로 맞춰진 배열
    },
  ],
}));
```

---

### 👩‍💻 강예성

#### 📝 프로젝트 후기

> 처음 개발을 하면서 어려운 점도 많았지만, 모를 때마다 팀원들이 도와준 덕분에 무사히 프로젝트를 마칠 수 있었습니다.  
> 항상 Git 머지를 할 때가 가장 두려운 순간이었고, 코드를 작성하면서 오류가 날 때마다 짜증이 나기도 했지만 😅  
> 정말 오랜만에 하나에 몰두할 수 있어서 즐거웠습니다.  
> 앞으로 남은 수업을 더 열심히 들어서 최종 프로젝트에서는 더욱 완성도 있는 결과물을 만들고 싶습니다.  
> 끝으로 열심히 팀을 이끌어준 팀장님과, 부족한 저를 항상 도와준 팀원들께 진심으로 감사드립니다. 모두 고생 많으셨어요! 🙇‍♂️

#### 🐞 이슈 트래킹 기록

##### 📸 `PaymentUpdate.vue` – 이미지 수정 시 출력 오류

**문제**  
저장된 이미지가 화면에 정상 출력되지 않음

**원인**  
`imgUrl`에 파일 객체를 직접 할당하고 곧바로 출력하려 했기 때문에 이미지 URL이 반영되지 않음

**해결**

```js
// ⚠️ 오류 코드
const handleChangeImg = async (event) => {
  const file = event.target.files[0];
  if (file) {
    imgUrl.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
  if (imgUrl.value) {
    baseImg.value = await fileToBase64(imgUrl.value);
  }
};

// ✅ 수정 코드
const handleChangeImg = async (event) => {
  const file = event.target.files[0];
  if (file) {
    imgUrl.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
  if (imgUrl.value) {
    baseImg.value = await fileToBase64(imgUrl.value);
  }
  imgUrl.value = baseImg.value; // 변환된 이미지 문자열로 재할당
};
```

---

##### 🔎 `PaymentDetail.vue` – 저장된 값 출력 오류

**문제**  
상세 조회 시 데이터가 불러와지지 않음

**원인**  
`route.params.id`가 문자열(string) 타입으로 넘어오며, `Number` 타입으로 저장된 DB 값과 일치하지 않음

**해결**

```js
// ⚠️ 오류 코드
const route = useRoute()
const paymentId = ref(route.params.id)

<PaymentDetailList :id="paymentId" />

// ✅ 수정 코드
const paymentId = ref(Number(route.params.id))
<PaymentDetailList :id="paymentId" />
```

---

### 👩‍💼 정다현

#### 📝 프로젝트 후기

> 개발도 협업도 모두 처음이라 어려운 점이 많았지만, 작은 것부터 하나하나 물어보며 진행한 덕분에 개발 흐름을 익히고 팀 프로젝트가 어떻게 흘러가는지 경험할 수 있었습니다.  
> 질문이 많았던 저를 친절하게 도와주신 팀장님과 팀원분들께 정말 감사드리고,  
> 제 코드로 인해 혹시라도 충돌이 발생해 다른 분들의 작업에 영향을 줄까 봐 Git 머지가 가장 두려웠던 순간이기도 했습니다.  
> 이번 프로젝트는 단순히 개발만 배운 게 아니라, 혼자서는 만들 수 없는 결과를 함께 만드는 **협업의 힘**을 느낄 수 있었던 소중한 경험이었습니다.

#### 🔄 다음 프로젝트에서 내가 더 잘하려면?

- 더 능동적으로 팀과 소통하고, 맡은 역할의 의미를 이해하며 움직이기
- Git 커밋 컨벤션 및 PR 작성법을 사전에 학습하여 **명확한 커뮤니케이션** 시도하기

#### 🐞 이슈 트래킹 기록

- `SearchBar.vue`: 검색 타입/키워드/카테고리 입력 처리
- `SearchResult.vue`, `MainPage.vue`: 필터링된 결과 리스트 렌더링

**이슈**  
검색 후 카테고리 필터링이 기존 키워드 검색 조건을 덮어써버리는 문제

**원인**  
`SearchBar.vue`에서 `emit()` 시 `searchType`, `searchKeyword` 누락

**해결 방법**  
`emit()`에 항상 `{ type, keyword, categories }`를 함께 전달하도록 수정

```js
// 수정 전
emit('search', {
  type: 'search_category',
  keyword: categories.value.map((cat) => cat.name),
  categories: categories.value.map((cat) => cat.name),
});

// 수정 후
emit('search', {
  type: searchType.value,
  keyword: searchKeyword.value,
  categories: categories.value.map((cat) => cat.name),
});
```

---

### 👩‍💼 강지원

_(강지원 팀원 내용은 이 형식을 참고하여 자유롭게 채워주세요)_

#### 📝 프로젝트 후기

> (자유롭게 서술)

#### 🔄 다음 프로젝트에서 내가 더 잘하려면?

- 예: 더 꼼꼼하게 이슈를 관리하고 코드 퀄리티 향상시키기
- 예: 디자인 시스템에 대한 이해도 높이기

#### 🐞 이슈 트래킹 기록

- 이슈 1: (제목 및 요약)
- 이슈 2: (제목 및 요약)
