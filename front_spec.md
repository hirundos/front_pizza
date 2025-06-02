# 🍕 Pizza Store Front 기능 정리

- 작성일: 2025-06-02  
- 버전: 1.0.0  

---

## 🖥️ 화면 구성 요약

| 화면 이름   | 경로(URL)   | 주요 기능                       | 사용 API             |
|------------|--------------|------------------------------|---------------------|
| 홈         | `/`         | 로그인 폼                      |  `POST /api/login`       |
| 로그인     | `/home`     | 메뉴, 내 주문, 로그아웃, 주문 버튼 |  `GET /api/menu`         |
| 회원가입   | `/signup`    | 회원가입 폼                     | `POST /api/signup`       |
| 주문 내역  | `/myorder`   | 본인 주문 리스트 조회            | `GET /api/myorder`       |
| 주문      | `/order`     | 피자 주문                       | `POST /api/order`        |
| 피자소개   | `/pizza`     | 피자 종류 상세 설명 페이지        | `GET /api/pizza`         |
| 로그아웃   | 버튼 클릭 시 | 세션 종료 및 홈 이동               | `GET /api/logout`        |

---

## 🧩 참고 사항

- 기본 UI 프레임워크: Vanilla HTML/CSS 

---

