document.addEventListener("DOMContentLoaded", () => {
  let firstPizzaSelect = document.getElementById("pizzaSelect");
  populatePizzaOptions(firstPizzaSelect);

  document.getElementById("orderForm").addEventListener("submit", function(event) {
      event.preventDefault();

      const orders = [];
      document.querySelectorAll(".order").forEach(order => {
        const pizzaName = order.querySelector("[name='pizzaName']").value;
        const size = order.querySelector("[name='size']").value;
        const quantity = order.querySelector("[name='quantity']").value;

        if (pizzaName && size && quantity > 0) {
          orders.push({ name: pizzaName, size, quantity: parseInt(quantity) });
        }
      });

      if (orders.length === 0) {
        alert("주문 정보를 입력해주세요.");
        return;
      }

      axios.post("http://localhost:3000/api/order", 
        { lines: orders },
        { withCredentials: true })
        .then(response => {
          alert("주문이 완료되었습니다!");
          window.location.href = "home.html";  // 홈으로 이동
        })
        .catch(error => {
          console.error("주문 실패:", error);
          alert("주문에 실패했습니다. 다시 시도해주세요.");
        });
    });

});

let pizzaList = [];
  function populatePizzaOptions(selectElement) {

    if (pizzaList.length > 0) {
      // 이미 피자 목록이 있으면 옵션만 추가
      pizzaList.forEach(pizza => {
        const option = document.createElement("option");
        option.value = pizza.name;
        option.textContent = pizza.name;
        selectElement.appendChild(option);
      });
    } else {
      // 처음에만 서버에서 피자 목록 받아오기
      axios.get("http://localhost:3000/api/pizza",
        { withCredentials: true })
        .then(response => {
          pizzaList = response.data;
          pizzaList.forEach(pizza => {
            const option = document.createElement("option");
            option.value = pizza.name;
            option.textContent = pizza.name;
            selectElement.appendChild(option);
          });
        })
        .catch(error => {
          console.error("피자 목록을 불러오는 데 실패했습니다.", error);
        });
    }
  }

  function addOrder() {
    const container = document.getElementById("ordersContainer");
    const newOrder = document.createElement("div");
    newOrder.className = "order";
    newOrder.innerHTML = `
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
      `;
    container.appendChild(newOrder);
  
  const newPizzaSelect = newOrder.querySelector(".pizzaSelect");
  populatePizzaOptions(newPizzaSelect);
  }