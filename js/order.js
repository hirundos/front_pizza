// 전역 변수를 파일 최상단에 선언
let pizzaList = [];

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('jwt_token');

  if(!token) {
    window.location.href = 'index.html';
    return;
  }

  // 초기화 함수들 호출
  initializePage();
});

// 페이지 초기화 함수
function initializePage() {
  fillBranchOptions();

  // 피자 목록을 먼저 로드한 후 첫 번째 select 채우기
  loadPizzaList().then(() => {
    const firstPizzaSelect = document.getElementById("pizzaSelect");
    if (firstPizzaSelect) {
      fillPizzaOptions(firstPizzaSelect);

      // 첫 번째 피자 선택 시 이미지 표시
      firstPizzaSelect.addEventListener("change", function() {
        showPizzaImage(this);
      });
    }
  });

  // 폼 제출 이벤트 리스너
  document.getElementById("orderForm").addEventListener("submit", handleOrderSubmit);
}

// 피자 목록 로드 함수 (Promise 반환)
function loadPizzaList() {
  return axios.get("/api/menu/types/")
    .then(response => {
      pizzaList = response.data;
      console.log("Pizza list loaded:", pizzaList);
      return pizzaList;
    })
    .catch(error => {
      console.error("피자 목록을 불러오는 데 실패했습니다.", error);
      alert("피자 목록을 불러오는 데 문제가 발생했습니다.");
      return [];
    });
}

// 주문 제출 처리 함수
function handleOrderSubmit(event) {
  event.preventDefault();

  const token = localStorage.getItem('jwt_token');
  const branchId = document.getElementById("branchSelect").value;

  if (!branchId) {
    alert("지점을 선택해주세요.");
    return;
  }

  const orders = [];
  document.querySelectorAll(".order").forEach(order => {
    const pizzaName = order.querySelector("[name='pizzaName']").value;
    const size = order.querySelector("[name='size']").value;
    const quantity = order.querySelector("[name='quantity']").value;

    if (pizzaName && size && quantity > 0) {
      orders.push({ 
        name: pizzaName, 
        size: size, 
        quantity: parseInt(quantity) 
      });
    }
  });

  if (orders.length === 0) {
    alert("주문 정보를 입력해주세요.");
    return;
  }

  console.log("Sending order:", { branchId, lines: orders });

  axios.post("/api/order/", 
    {
      branchId: branchId, 
      lines: orders 
    },
    {         
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      alert("주문이 완료되었습니다!");
      window.location.href = "home.html";
    })
    .catch(error => {
      console.error("주문 실패:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`주문 실패: ${error.response.data.error || '알 수 없는 오류'}`);
      } else {
        alert("주문에 실패했습니다. 다시 시도해주세요.");
      }
    });
}

// 지점 옵션 채우기
function fillBranchOptions() {
  const branchSelect = document.getElementById("branchSelect");

  axios.get("/api/order/branch/")
    .then(response => {
      const branches = response.data;
      branches.forEach(branch => {
        const option = document.createElement("option");
        option.value = branch.bran_id;
        option.textContent = branch.bran_nm;
        branchSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("지점 목록을 불러오는 데 실패했습니다.", error);
      alert("지점 목록을 불러오는 데 문제가 발생했습니다.");
    });
}

// 피자 옵션 채우기
function fillPizzaOptions(selectElement) {
  // 기존 옵션 제거 (첫 번째 "피자 선택" 옵션 제외)
  while (selectElement.options.length > 1) {
    selectElement.remove(1);
  }

  // 피자 목록이 있으면 옵션 추가
  pizzaList.forEach(pizza => {
    const option = document.createElement("option");
    option.value = pizza.pizza_nm;
    option.textContent = pizza.pizza_nm;
    selectElement.appendChild(option);
  });
}

// 주문 추가
function addOrder() {
  const container = document.getElementById("ordersContainer");
  const newOrder = document.createElement("div");
  newOrder.className = "order";
  newOrder.innerHTML = `
    <img class="pizzaImage" src="" alt="피자 이미지" style="width:100px; height:auto; display:none; margin-left:10px; vertical-align:middle;" />
    <select name="pizzaName" class="pizzaSelect">
      <option value="">피자 선택</option>
    </select>
    <select name="size">
      <option value="">크기 선택</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
    </select>
    <input type="number" name="quantity" placeholder="수량" min="1" value="1">
    <button type="button" onclick="removeOrder(this)">삭제</button>
  `;
  container.appendChild(newOrder);

  const newPizzaSelect = newOrder.querySelector(".pizzaSelect");
  fillPizzaOptions(newPizzaSelect);

  // 이벤트 리스너 바인딩
  newPizzaSelect.addEventListener("change", function() {
    showPizzaImage(this);
  });
}

// 주문 삭제
function removeOrder(button) {
  button.parentElement.remove();
}

// 피자 이미지 표시
function showPizzaImage(selectElement) {
  const selectedValue = selectElement.value;
  const pizza = pizzaList.find(p => p.pizza_nm === selectedValue);
  const img = selectElement.parentElement.querySelector('.pizzaImage');

  if (pizza && pizza.pizza_img_url) {
    img.src = './' + pizza.pizza_img_url;
    img.style.display = 'inline-block';
  } else {
    img.src = '';
    img.style.display = 'none';
  }
}
