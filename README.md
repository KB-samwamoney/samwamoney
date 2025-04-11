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
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/로그인.png" width="90%">
      </td>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_검색.png" width="90%">
      </td>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_검색_기록.png" width="90%">
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_날짜선택.png" width="90%">
      </td>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_달력.png" width="90%">
      </td>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_달력%20(1).png" width="90%">
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/KB-samwamoney/samwamoney/blob/main/와이어프레임/메인페이지_날짜선택.png" width="90%">
      </td>
      <td></td>
      <td></td>
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

| 이름       | 사진                                                                        | GitHub                                         | 역할                | 담당 영역                                                                            |
| ---------- | --------------------------------------------------------------------------- | ---------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------ |
| **임예원** | <img src="https://avatars.githubusercontent.com/u/156289574?v=4" width=100> | [@wony0321](https://github.com/wony0321)       | 팀장, 백/프론트엔드 | API/ERD 설계, 회원가입/로그인, 회원정보/탈퇴, 다크모드, 소비 성향 분석, 전체적인 CSS |
| **강경민** | <img src="https://avatars.githubusercontent.com/u/85470797?v=4" width=100>  | [@kgm7642](https://github.com/kgm7642)         | 백/프론트엔드       | 데이터 API 설계, ERD 설계 및 수정, 시각화(파이/바 차트), 사이드바 라우터 설정, CSS   |
| **강예성** | <img src="https://avatars.githubusercontent.com/u/203206097?v=4" width=100> | [@kang-yesung](https://github.com/kang-yesung) | 프론트엔드          | 피그마 설계, UI 디자인, 빠른추가, 거래 추가/상세/수정, 토스트 알림                   |
| **강지원** | <img src="https://avatars.githubusercontent.com/u/110143494?v=4" width=100> | [@jionii](https://github.com/jionii)           | 프론트엔드          | 피그마 설계, UI 디자인, 캘린더 뷰, 거래 요약 정보, 발표자료 제작, 거래 상세          |
| **정다현** | <img src="https://avatars.githubusercontent.com/u/173062369?v=4" width=100> | [@dahyyun](https://github.com/dahyyun)         | 프론트엔드          | 피그마 설계,UI 디자인, 카테고리 검색, 검색 결과, 검색 필터링                         |

---

## 개선 사항
